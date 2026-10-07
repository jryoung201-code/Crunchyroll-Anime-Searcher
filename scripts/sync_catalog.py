import json
import re
from pathlib import Path

from crunchyroll_api import CrunchyrollClient

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "catalog.json"

def first_number(value):
    if value is None:
        return 0
    match = re.search(r"(\\d{4})", str(value))
    return int(match.group(1)) if match else 0

def age_from_rating(value):
    if not value:
        return 0
    text = str(value).lower()
    if "18" in text:
        return 18
    if "16" in text:
        return 16
    if "13" in text or "14" in text or "15" in text:
        return 13
    if "7" in text or "12" in text:
        return 7
    return 0

def raw_values(raw, keys):
    values = []
    if isinstance(raw, dict):
        for key in keys:
            value = raw.get(key)
            if isinstance(value, list):
                values.extend(value)
            elif value:
                values.append(value)
    return values

def genres_for(series):
    raw = series.raw or {}
    candidates = raw_values(raw, ["genres", "genre", "categories", "category", "tags"])
    out = []
    for value in candidates:
        if isinstance(value, dict):
            value = value.get("name") or value.get("title") or value.get("slug")
        if value:
            text = str(value).replace("_", " ").strip()
            if text and text.lower() not in {x.lower() for x in out}:
                out.append(text)
    return out[:12]

def extract_year(series):
    raw = series.raw or {}
    meta = raw.get("series_metadata") or raw.get("metadata") or {}
    for source in (raw, meta):
        for key in ("release_year", "year", "first_air_date", "original_release_date", "release_date"):
            year = first_number(source.get(key)) if isinstance(source, dict) else 0
            if year:
                return year
    return 0

def extract_popularity(series):
    raw = series.raw or {}
    meta = raw.get("series_metadata") or raw.get("metadata") or {}
    for source in (raw, meta):
        for key in ("popularity", "popularity_rank", "rank"):
            value = source.get(key) if isinstance(source, dict) else 0
            try:
                return float(value or 0)
            except (TypeError, ValueError):
                pass
    return 0

def main():
    client = CrunchyrollClient(locale="en-US")
    client.login_anonymous()
    series_list = client.get_all_series(sort_by="alphabetical", page_size=100)

    catalog = []
    for series in series_list:
        age = age_from_rating(series.content_rating)
        audio = "Sub & Dub" if series.is_subbed and series.is_dubbed else "Dub" if series.is_dubbed else "Sub" if series.is_subbed else "Unknown"
        image = series.images.poster_tall or series.images.thumbnail or ""
        slug = series.slug or ""
        link = f"https://www.crunchyroll.com/series/{series.id}/{slug}" if slug else f"https://www.crunchyroll.com/series/{series.id}"

        catalog.append({
            "id": series.id,
            "title": series.title,
            "age": age,
            "audio": audio,
            "type": "TV",
            "year": extract_year(series),
            "genres": genres_for(series),
            "status": "Unknown",
            "score": 0,
            "popularity": extract_popularity(series),
            "episodes": series.episode_count or 0,
            "season": "",
            "description": series.description or "No description available.",
            "image": image,
            "crunchylink": link,
        })

    catalog.sort(key=lambda item: item["title"].lower())
    OUTPUT.write_text(json.dumps(catalog, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Wrote {len(catalog)} Crunchyroll series to {OUTPUT}")

if __name__ == "__main__":
    main()
