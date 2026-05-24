from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 從 JSON 文件讀取資料
def load_data(filename):
    path = os.path.join(os.path.dirname(__file__), "data", filename)
    with open(path, encoding="utf-8") as f:
        return json.load(f)

@app.get("/articles")
def get_articles(part: str = "", tag: str = ""):
    articles = load_data("articles.json")
    if part:
        articles = [a for a in articles if a["part"] == part]
    if tag:
        articles = [a for a in articles if a["tag"] == tag]
    return articles

@app.get("/articles/{id}")
def get_article(id: int):
    articles = load_data("articles.json")
    article = next((a for a in articles if a["id"] == id), None)
    if not article:
        return {"error": "找不到文章"}
    return article

@app.get("/search")
def search(q: str = ""):
    articles = load_data("articles.json")
    if not q:
        return articles
    result = []
    for a in articles:
        score = 0
        if q in a["title"]: score += 3
        if q in a["part"]: score += 2
        if q in a["desc"]: score += 1
        if score > 0:
            result.append({**a, "score": score})
    return sorted(result, key=lambda x: x["score"], reverse=True)

@app.get("/announcements")
def get_announcements():
    return load_data("announcements.json")