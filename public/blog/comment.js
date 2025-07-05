// NGワードリスト（AdSense対策）
const NG_WORDS = ['死ね', '殺す', 'バカ', 'アホ', '差別', '中傷'];

// 投稿ボタンから呼ばれる（各日付ごと）
function postComment(date) {
  const name = document.getElementById(`name-${date}`).value || "匿名";
  const text = document.getElementById(`text-${date}`).value.trim();
  if (!text) return;

  // NGワードチェック
  if (NG_WORDS.some(word => text.includes(word))) {
    alert("不適切な言葉が含まれています。投稿できません。");
    return;
  }

  const comment = {
    name,
    text,
    time: new Date().toLocaleString()
  };
  const key = `comment-post-01-${date}`;
  const comments = JSON.parse(localStorage.getItem(key) || "[]");
  comments.push(comment);
  localStorage.setItem(key, JSON.stringify(comments));
  document.getElementById(`text-${date}`).value = "";
  loadComments(date);
}

// 日付単位でコメント読み込み
function loadComments(date) {
  const key = `comment-post-01-${date}`;
  const comments = JSON.parse(localStorage.getItem(key) || "[]");
  const list = document.getElementById(`comments-${date}`);
  if (!list) return;
  list.innerHTML = "";
  comments.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${escapeHTML(c.name)}</strong>：${escapeHTML(c.text)} <small>(${c.time})</small>`;
    list.appendChild(li);
  });
}

// XSS・タグ対策（HTML無効化）
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[m];
  });
}
