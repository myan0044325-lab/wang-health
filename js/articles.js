// 從 FastAPI 後端取得文章資料
async function fetchArticles(params = "") {
  const res = await fetch(`http://127.0.0.1:8000/articles${params}`);
  return await res.json();
}

async function fetchArticleById(id) {
  const res = await fetch(`http://127.0.0.1:8000/articles/${id}`);
  return await res.json();
}

async function fetchSearch(q) {
  const res = await fetch(`http://127.0.0.1:8000/search?q=${q}`);
  return await res.json();
}

async function fetchAnnouncements() {
  const res = await fetch(`http://127.0.0.1:8000/announcements`);
  return await res.json();
}