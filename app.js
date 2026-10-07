const anime = [
  {
    id: "slime",
    title: "That Time I Got Reincarnated as a Slime",
    age: 13,
    audio: "Sub & Dub",
    type: "TV",
    year: 2024,
    genres: ["Fantasy", "Action", "Adventure"],
    status: "Finished",
    score: 8.5,
    popularity: 980,
    episodes: 72,
    season: "Fall",
    description: "A salaryman is reincarnated in another world as a slime and builds a powerful new life.",
    color: "purple",
    crunchylink: "https://www.crunchyroll.com/series/GYZJ7Q8Y6/that-time-i-got-reincarnated-as-a-slime"
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    age: 16,
    audio: "Sub & Dub",
    type: "TV",
    year: 2025,
    genres: ["Action", "Fantasy"],
    status: "Finished",
    score: 8.8,
    popularity: 1200,
    episodes: 25,
    season: "Winter",
    description: "The weakest hunter gains a mysterious power that lets him level up beyond normal limits.",
    color: "orange",
    crunchylink: "https://www.crunchyroll.com/series/GDKHZEJ0K/solo-leveling"
  },
  {
    id: "frieren",
    title: "Frieren: Beyond Journey's End",
    age: 13,
    audio: "Sub & Dub",
    type: "TV",
    year: 2023,
    genres: ["Fantasy", "Adventure", "Drama"],
    status: "Finished",
    score: 9.2,
    popularity: 1150,
    episodes: 28,
    season: "Fall",
    description: "An elven mage reflects on a completed adventure while beginning a new journey of her own.",
    color: "green",
    crunchylink: "https://www.crunchyroll.com/series/GG5H5XQ6Q/frieren-beyond-journeys-end"
  },
  {
    id: "apothecary",
    title: "The Apothecary Diaries",
    age: 13,
    audio: "Sub & Dub",
    type: "TV",
    year: 2025,
    genres: ["Drama", "Mystery", "Romance"],
    status: "Currently Airing",
    score: 8.6,
    popularity: 1080,
    episodes: 48,
    season: "Winter",
    description: "A clever young pharmacist uses her knowledge to solve mysteries inside the imperial palace.",
    color: "pink",
    crunchylink: "https://www.crunchyroll.com/series/G3KHEVDNZ/the-apothecary-diaries"
  },
  {
    id: "kaiju",
    title: "Kaiju No. 8",
    age: 16,
    audio: "Sub & Dub",
    type: "TV",
    year: 2025,
    genres: ["Action", "Sci-Fi"],
    status: "Currently Airing",
    score: 8.3,
    popularity: 1040,
    episodes: 23,
    season: "Spring",
    description: "A cleanup worker gains kaiju powers and joins the defense force he always dreamed about.",
    color: "blue",
    crunchylink: "https://www.crunchyroll.com/series/GJ0H7Q5V5/kaiju-no-8"
  },
  {
    id: "one-piece",
    title: "One Piece",
    age: 13,
    audio: "Sub & Dub",
    type: "TV",
    year: 2026,
    genres: ["Adventure", "Action", "Comedy", "Fantasy"],
    status: "Currently Airing",
    score: 9.0,
    popularity: 1500,
    episodes: 1180,
    season: "Ongoing",
    description: "Monkey D. Luffy and his crew sail across the Grand Line searching for the legendary One Piece.",
    color: "red",
    crunchylink: "https://www.crunchyroll.com/series/GRMG8ZQZR/one-piece"
  },
  {
    id: "spy-family",
    title: "SPY x FAMILY",
    age: 13,
    audio: "Sub & Dub",
    type: "TV",
    year: 2025,
    genres: ["Action", "Comedy", "Romance"],
    status: "Finished",
    score: 8.4,
    popularity: 960,
    episodes: 50,
    season: "Fall",
    description: "A spy, an assassin, and a telepath create a fake family that becomes unexpectedly real.",
    color: "rose",
    crunchylink: "https://www.crunchyroll.com/series/G4PH0WXVJ/spy-x-family"
  },
  {
    id: "mha",
    title: "My Hero Academia",
    age: 13,
    audio: "Sub & Dub",
    type: "TV",
    year: 2025,
    genres: ["Action", "Fantasy", "Drama"],
    status: "Finished",
    score: 8.2,
    popularity: 1010,
    episodes: 170,
    season: "Fall",
    description: "Izuku Midoriya enters a hero academy and works toward becoming the hero he has always admired.",
    color: "teal",
    crunchylink: "https://www.crunchyroll.com/series/G6NQ5DWZ6/my-hero-academia"
  },
  {
    id: "dress-up-darling",
    title: "My Dress-Up Darling",
    age: 16,
    audio: "Sub & Dub",
    type: "TV",
    year: 2025,
    genres: ["Romance", "Comedy"],
    status: "Finished",
    score: 8.1,
    popularity: 870,
    episodes: 24,
    season: "Winter",
    description: "A doll-making student discovers a shared passion for cosplay with a popular classmate.",
    color: "pink",
    crunchylink: "https://www.crunchyroll.com/series/GQWH0M9N8/my-dress-up-darling"
  },
  {
    id: "dandadan",
    title: "DAN DA DAN",
    age: 16,
    audio: "Sub & Dub",
    type: "TV",
    year: 2025,
    genres: ["Action", "Comedy", "Sci-Fi", "Romance"],
    status: "Currently Airing",
    score: 8.7,
    popularity: 1120,
    episodes: 24,
    season: "Fall",
    description: "Two teenagers test each other's supernatural beliefs and stumble into bizarre powers.",
    color: "violet",
    crunchylink: "https://www.crunchyroll.com/series/G1XH7T9J6/dandadan"
  },
  {
    id: "vinland-saga",
    title: "VINLAND SAGA",
    age: 16,
    audio: "Sub & Dub",
    type: "TV",
    year: 2023,
    genres: ["Action", "Adventure", "Drama"],
    status: "Finished",
    score: 8.9,
    popularity: 910,
    episodes: 48,
    season: "Spring",
    description: "A young Viking grows up amid war and revenge before searching for a more peaceful future.",
    color: "slate",
    crunchylink: "https://www.crunchyroll.com/series/GEXH3WKK7/vinland-saga"
  },
  {
    id: "re-zero",
    title: "Re:ZERO -Starting Life in Another World-",
    age: 16,
    audio: "Sub & Dub",
    type: "TV",
    year: 2025,
    genres: ["Fantasy", "Drama", "Romance"],
    status: "Currently Airing",
    score: 8.6,
    popularity: 1090,
    episodes: 66,
    season: "Winter",
    description: "A teenager transported to another world discovers a terrifying ability tied to his own death.",
    color: "cyan",
    crunchylink: "https://www.crunchyroll.com/series/GRGG9798R/rezero--starting-life-in-another-world-"
  }
];

const $ = (id) => document.getElementById(id);
const favorites = new Set(JSON.parse(localStorage.getItem("animefinder-favorites") || "[]"));

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
}[char]));

function matchesQuery(item, query) {
  if (!query) return true;
  const haystack = [
    item.title,
    item.description,
    item.season,
    item.type,
    item.audio,
    item.status,
    ...item.genres
  ].join(" ").toLowerCase();
  return haystack.includes(query);
}

function renderCard(item) {
  const favorite = favorites.has(item.id);
  const genreText = item.genres.slice(0, 2).join(" • ");
  return `
    <article class="card">
      <a class="poster poster-${item.color}" href="details.html?anime=${encodeURIComponent(item.id)}" aria-label="Open details for ${escapeHtml(item.title)}">
        <span>${escapeHtml(item.title.slice(0, 2).toUpperCase())}</span>
      </a>
      <div class="card-body">
        <div class="card-title-row">
          <h3><a href="details.html?anime=${encodeURIComponent(item.id)}">${escapeHtml(item.title)}</a></h3>
          <button class="favorite-btn ${favorite ? "is-favorite" : ""}" data-favorite="${item.id}" aria-label="${favorite ? "Remove from" : "Add to"} favorites" title="${favorite ? "Remove favorite" : "Add favorite"}">${favorite ? "★" : "☆"}</button>
        </div>
        <p class="card-description">${escapeHtml(item.description)}</p>
        <div class="meta">
          <span class="rating">★ ${item.score.toFixed(1)}</span>
          <span>${item.age}+</span>
          <span>${item.type}</span>
          <span>${escapeHtml(item.audio)}</span>
        </div>
        <div class="card-submeta">${escapeHtml(genreText)} · ${item.year} · ${item.episodes} eps</div>
        <a class="watch-link" href="${item.crunchylink}" target="_blank" rel="noopener noreferrer">Watch on Crunchyroll ↗</a>
      </div>
    </article>
  `;
}

function render() {
  const query = $("search").value.trim().toLowerCase();
  const age = Number($("age").value) || 0;
  const audio = $("audio").value;
  const type = $("type").value;
  const year = Number($("year").value) || 0;
  const genre = $("genre").value;
  const status = $("status").value;
  const score = Number($("score").value);
  const favoriteOnly = $("favorites").checked;
  const sort = $("sort").value;

  let out = anime.filter((item) => {
    const genreOk = !genre || item.genres.includes(genre);
    return matchesQuery(item, query)
      && item.age >= age
      && (!audio || item.audio === audio)
      && (!type || item.type === type)
      && (!year || item.year === year)
      && genreOk
      && (!status || item.status === status)
      && item.score >= score
      && (!favoriteOnly || favorites.has(item.id));
  });

  if (sort === "Highest rated") out.sort((a, b) => b.score - a.score);
  if (sort === "Newest") out.sort((a, b) => b.year - a.year || b.score - a.score);
  if (sort === "Alphabetical") out.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "Most popular") out.sort((a, b) => b.popularity - a.popularity);

  $("count").textContent = `${out.length} title${out.length === 1 ? "" : "s"}`;
  $("resultTitle").textContent = favoriteOnly ? "Your favorites" : query ? `Results for “${escapeHtml($("search").value.trim())}”` : "Popular right now";

  $("cards").innerHTML = out.length
    ? out.map(renderCard).join("")
    : '<div class="empty-state"><strong>No anime match those filters.</strong><span>Try removing a filter or searching for another title.</span></div>';

  document.querySelectorAll("[data-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.favorite;
      if (favorites.has(id)) favorites.delete(id);
      else favorites.add(id);
      localStorage.setItem("animefinder-favorites", JSON.stringify([...favorites]));
      render();
    });
  });
}

function resetFilters() {
  ["search", "age", "audio", "type", "year", "genre", "status"].forEach((id) => $(id).value = "");
  $("score").value = 0;
  $("scoreValue").textContent = "0";
  $("sort").value = "Most popular";
  $("favorites").checked = false;
  render();
}

["search", "age", "audio", "type", "year", "genre", "status", "score", "sort", "favorites"].forEach((id) => {
  const element = $(id);
  if (element) element.addEventListener(element.type === "range" || element.tagName === "SELECT" || element.type === "checkbox" ? "input" : "input", render);
});

$("score").addEventListener("input", () => $("scoreValue").textContent = $("score").value);
$("searchButton").addEventListener("click", render);
$("clear").addEventListener("click", resetFilters);

render();
