// 載入公告
fetchAnnouncements().then(announcements => {
  const bar = document.getElementById("announcementBar");
  let index = 0;
  bar.textContent = "📢 " + announcements[0].title + "：" + announcements[0].content;

  setInterval(() => {
    index = (index + 1) % announcements.length;
    bar.textContent = "📢 " + announcements[index].title + "：" + announcements[index].content;
  }, 3000);
});

// 狗狗互動圖
const spots = [
  {
    id: "head", title: "頭部",
    desc: "狗狗的眼睛、耳朵、口腔都需要定期檢查，注意分泌物與異味。",
    tag: "皮膚外觀", top: "23.09%", left: "18.63%"
  },
  {
    id: "neck", title: "頸部",
    desc: "頸部是淋巴結聚集處，若有腫脹請儘快就醫。",
    tag: "內部健康", top: "30.03%", left: "37.13%"
  },
  {
    id: "back", title: "背部",
    desc: "定期觸摸背脊，檢查有無異常突起或疼痛反應。",
    tag: "骨骼關節", top: "35.47%", left: "56.75%"
  },
  {
    id: "hip", title: "臀部",
    desc: "臀部與尾根要保持清潔，注意有無寄生蟲。",
    tag: "骨骼關節", top: "41.47%", left: "76.50%"
  },
  {
    id: "chest", title: "胸部",
    desc: "心肺位於胸腔，若狗狗呼吸急促或咳嗽需留意。",
    tag: "緊急照護", top: "58.34%", left: "31.87%"
  },
  {
    id: "leg", title: "後腿",
    desc: "後腿是關節問題好發處，大型犬尤其要注意髖關節。",
    tag: "骨骼關節", top: "78.22%", left: "80.75%"
  }
];

const container = document.querySelector(".hotspot-container");

spots.forEach(spot => {
  const dot = document.createElement("div");
  dot.style.cssText = `
    position: absolute;
    top: ${spot.top};
    left: ${spot.left};
    width: 28px;
    height: 28px;
    background: #f5c518;
    border: 3px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
    z-index: 5;
    transition: transform 0.2s;
  `;

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
    <h3>${spot.title}</h3>
    <p>${spot.desc}</p>
    <a href="category/category.html?tag=${encodeURIComponent(spot.tag)}" class="popup-link">查看相關文章 →</a>
  `;
  popup.style.top = spot.top;
  popup.style.left = spot.left;

  dot.addEventListener("click", (e) => {
    e.stopPropagation();
    const isShowing = popup.classList.contains("show");
    document.querySelectorAll(".popup").forEach(p => p.classList.remove("show"));
    if (!isShowing) popup.classList.add("show");
  });

  container.appendChild(dot);
  container.appendChild(popup);
});

document.addEventListener("click", () => {
  document.querySelectorAll(".popup").forEach(p => p.classList.remove("show"));
});