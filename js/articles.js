const API = "https://wang-health.onrender.com";

async function fetchArticles(params = "") {
  const res = await fetch(`${API}/articles${params}`);
  return await res.json();
}

async function fetchArticleById(id) {
  const res = await fetch(`${API}/articles/${id}`);
  return await res.json();
}

async function fetchSearch(q) {
  const res = await fetch(`${API}/search?q=${q}`);
  return await res.json();
}

async function fetchAnnouncements() {
  const res = await fetch(`${API}/announcements`);
  return await res.json();
}