async function renderCards(params = "") {
  const grid = document.getElementById("cardGrid");
  grid.innerHTML = "<p style='color:#999; text-align:center;'>載入中...</p>";

  try {
    const articles = await fetchArticles(params);
    if (articles.length === 0) {
      grid.innerHTML = "<p style='color:#999; text-align:center;'>沒有找到相關文章。</p>";
      return;
    }
    grid.innerHTML = articles.map(a => `
      <div class="card">
        <div class="card-tag">${a.tag}</div>
        <h3>${a.title}</h3>
        <p class="card-part">📍 ${a.part}</p>
        <p>${a.desc}</p>
        <a href="../detail/detail.html?id=${a.id}" class="card-link">了解更多 →</a>
      </div>
    `).join("");
  } catch (e) {
    grid.innerHTML = "<p style='color:red; text-align:center;'>⚠️ 無法連接後端，請確認 FastAPI 是否啟動。</p>";
  }
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const tag = btn.dataset.tag;
    const params = tag === "全部" ? "" : `?tag=${encodeURIComponent(tag)}`;
    renderCards(params);
  });
});

renderCards();

// 如果網址帶有 ?tag= 參數，自動篩選
const urlParams = new URLSearchParams(window.location.search);
const urlTag = urlParams.get("tag");
if (urlTag) {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.tag === urlTag) btn.classList.add("active");
  });
  renderCards(`?tag=${encodeURIComponent(urlTag)}`);
}