let anime = [];
const $ = (id) => document.getElementById(id);
const favorites = new Set(JSON.parse(localStorage.getItem("animefinder-favorites") || "[]"));

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
}[char]));

function normalize(item) {
  return {
    id: item.id,
    title: item.title || "Unknown title",
    age: Number(item.age) || 0,
    audio: item.audio || "Unknown",
    type: item.type || "TV",
    year: Number(item.year) || 0,
    genres: Array.isArray(item.genres) ? item.genres : [],
    status: item.status || "Unknown",
    score: Number(item.score) || 0,
    popularity: Number(item.popularity) || 0,
    episodes: Number(item.episodes) || 0,
    season: item.season || "",
    description: item.description || "No description available.",
    image: item.image || "",
    crunchylink: item.crunchylink || `https://www.crunchyroll.com/series/${encodeURIComponent(item.id)}`
  };
}

function matchesQuery(item, query) {
  if (!query) return true;
  return [
    item.title, item.description, item.season, item.type, item.audio,
    item.status, ...item.genres
  ].join(" ").toLowerCase().includes(query);
}

function renderCard(item) {
  const favorite = favorites.has(item.id);
  return `
    <article class="card">
      <a class="poster" href="details.html?anime=${encodeURIComponent(item.id)}" aria-label="Open details for ${escapeHtml(item.title)}">
        ${item.image ? `<img src="${escapeHtml(item.image)}" alt="" loading="lazy">` : `<span>${escapeHtml(item.title.slice(0, 2).toUpperCase())}</span>`}
      </a>
      <div class="card-body">
        <div class="card-title-row">
          <h3><a href="details.html?anime=${encodeURIComponent(item.id)}">${escapeHtml(item.title)}</a></h3>
          <button class="favorite-btn ${favorite ? "is-favorite" : ""}" data-favorite="${escapeHtml(item.id)}" aria-label="${favorite ? "Remove from" : "Add to"} favorites">${favorite ? "★" : "☆"}</button>
        </div>
        <p class="card-description">${escapeHtml(item.description)}</p>
        <div class="meta">
          ${item.score ? `<span class="rating">★ ${item.score.toFixed(1)}</span>` : ""}
          ${item.age ? `<span>${item.age}+</span>` : ""}
          <span>${escapeHtml(item.type)}</span>
          <span>${escapeHtml(item.audio)}</span>
        </div>
        <div class="card-submeta">
          ${escapeHtml(item.genres.slice(0, 3).join(" • ") || "Anime")}
          ${item.year ? ` · ${item.year}` : ""}
          ${item.episodes ? ` · ${item.episodes} eps` : ""}
        </div>
        <a class="watch-link" href="${escapeHtml(item.crunchylink)}" target="_blank" rel="noopener noreferrer">Watch on Crunchyroll ↗</a>
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

  let out = anime.filter((item) =>
    matchesQuery(item, query) &&
    (!age || item.age >= age || !item.age) &&
    (!audio || item.audio === audio) &&
    (!type || item.type === type) &&
    (!year || item.year === year) &&
    (!genre || item.genres.includes(genre)) &&
    (!status || item.status === status) &&
    item.score >= score &&
    (!favoriteOnly || favorites.has(item.id))
  );

  if (sort === "Highest rated") out.sort((a, b) => b.score - a.score);
  if (sort === "Newest") out.sort((a, b) => b.year - a.year || b.score - a.score);
  if (sort === "Alphabetical") out.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "Most popular") out.sort((a, b) => b.popularity - a.popularity);

  $("count").textContent = `${out.length.toLocaleString()} title${out.length === 1 ? "" : "s"}`;
  $("resultTitle").textContent = favoriteOnly
    ? "Your favorites"
    : query
      ? `Results for “${escapeHtml($("search").value.trim())}”`
      : "Crunchyroll catalog";

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

async function loadCatalog() {
  $("resultTitle").textContent = "Loading Crunchyroll catalog…";
  $("count").textContent = "";
  try {
    const response = await fetch("catalog.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Catalog HTTP ${response.status}`);
    const data = await response.json();
    anime = Array.isArray(data) ? data.map(normalize) : [];
    render();
  } catch (error) {
    console.error(error);
    $("resultTitle").textContent = "Catalog unavailable";
    $("count").textContent = "";
    $("cards").innerHTML = '<div class="empty-state"><strong>Could not load the Crunchyroll catalog.</strong><span>The catalog refresh may be running. Refresh this page in a little while.</span></div>';
  }
}

["search", "age", "audio", "type", "year", "genre", "status", "score", "sort", "favorites"].forEach((id) => {
  const element = $(id);
  if (element) element.addEventListener("input", render);
});
$("score").addEventListener("input", () => $("scoreValue").textContent = $("score").value);
$("searchButton").addEventListener("click", render);
$("clear").addEventListener("click", resetFilters);
loadCatalog();
