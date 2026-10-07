import json
import time
from pathlib import Path
import requests

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "catalog.json"
API = "https://graphql.anilist.co"

QUERY = """
query ($page: Int!, $perPage: Int!) {
  Page(page: $page, perPage: $perPage) {
    pageInfo { hasNextPage }
    media(type: ANIME, sort: ID) {
      id
      title { romaji english native }
      description(asHtml: false)
      episodes
      season
      seasonYear
      format
      status
      genres
      averageScore
      popularity
      isAdult
      countryOfOrigin
      coverImage { large extraLarge }
      externalLinks { site url }
      startDate { year month day }
      streamingEpisodes { site title url }
    }
  }
}
"""

def rating(item):
    if item.get("isAdult"):
        return 18
    # AniList does not provide Crunchyroll's exact maturity rating.
    # Keep unknown rather than inventing a rating.
    return 0

def audio_from_links(item):
    # AniList does not reliably expose Crunchyroll's current audio availability.
    # Leave it unknown instead of guessing.
    return "Unknown"

def crunch_link(item):
    for link in item.get("externalLinks") or []:
        if str(link.get("site", "")).lower() == "crunchyroll" and link.get("url"):
            return link["url"]
    for ep in item.get("streamingEpisodes") or []:
        if str(ep.get("site", "")).lower() == "crunchyroll" and ep.get("url"):
            return ep["url"]
    return ""

def main():
    session = requests.Session()
    session.headers.update({"User-Agent": "AnimeFinder/1.0 (GitHub Pages catalog sync)"})

    catalog = []
    page = 1
    per_page = 50

    while True:
        response = session.post(
            API,
            json={"query": QUERY, "variables": {"page": page, "perPage": per_page}},
            timeout=30,
        )
        response.raise_for_status()
        payload = response.json()
        if payload.get("errors"):
            raise RuntimeError(payload["errors"])

        info = payload["data"]["Page"]["pageInfo"]
        for item in payload["data"]["Page"]["media"]:
            link = crunch_link(item)
            # Only include titles that AniList currently associates with Crunchyroll.
            if not link:
                continue

            title = item["title"].get("english") or item["title"].get("romaji") or item["title"].get("native") or "Unknown"
            catalog.append({
                "id": str(item["id"]),
                "title": title,
                "age": rating(item),
                "audio": audio_from_links(item),
                "type": {"TV": "TV", "MOVIE": "Movie", "OVA": "OVA", "ONA": "Special", "SPECIAL": "Special"}.get(item.get("format"), "TV"),
                "year": item.get("seasonYear") or item.get("startDate", {}).get("year") or 0,
                "genres": item.get("genres") or [],
                "status": "Currently Airing" if item.get("status") in ("RELEASING", "NOT_YET_RELEASED") else "Finished" if item.get("status") == "FINISHED" else "Unknown",
                "score": (item.get("averageScore") or 0) / 10,
                "popularity": item.get("popularity") or 0,
                "episodes": item.get("episodes") or 0,
                "season": item.get("season") or "",
                "description": item.get("description") or "No description available.",
                "image": (item.get("coverImage") or {}).get("extraLarge") or (item.get("coverImage") or {}).get("large") or "",
                "crunchylink": link,
            })

        print(f"Fetched AniList page {page}; catalog matches so far: {len(catalog)}", flush=True)
        if not info["hasNextPage"]:
            break
        page += 1
        time.sleep(0.8)

    catalog.sort(key=lambda x: x["title"].lower())
    OUTPUT.write_text(json.dumps(catalog, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Wrote {len(catalog)} Crunchyroll-linked anime to {OUTPUT}")

if __name__ == "__main__":
    main()
