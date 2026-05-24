const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const status = document.getElementById("searchStatus");
const grid = document.getElementById("resultGrid");

async function doSearch() {
  const q = input.value.trim();
  if (!q) {
    status.textContent = "請輸入關鍵字！";
    grid.innerHTML = "";
    return;
  }

  status.textContent = "搜尋中...";
  grid.innerHTML = "";

  try {
    const results = await fetchSearch(encodeURIComponent(q));
    if (results.length === 0) {
      status.textContent = `找不到「${q}」的相關文章。`;
      return;
    }
    status.textContent = `找到 ${results.length} 篇關於「${q}」的文章：`;
    grid.innerHTML = results.map(a => `
      <div class="card">
        <div class="card-tag">${a.tag}</div>
        <h3>${a.title}</h3>
        <p class="card-part">📍 ${a.part}</p>
        <p>${a.desc}</p>
        <a href="../detail/detail.html?id=${a.id}" class="card-link">了解更多 →</a>
      </div>
    `).join("");
  } catch (e) {
    status.textContent = "⚠️ 無法連接後端，請確認 FastAPI 是否啟動。";
  }
}

// 點按鈕搜尋
btn.addEventListener("click", doSearch);

// 按 Enter 也能搜尋
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch();
});

// 如果網址帶有 ?q= 參數，直接搜尋（從首頁跳過來用）
const params = new URLSearchParams(window.location.search);
const q = params.get("q");
if (q) {
  input.value = q;
  doSearch();
}