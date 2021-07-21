// 1. 데이터 입력
const ajax = new XMLHttpRequest();
const container = document.getElementById("root");
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json"; // @id 마킹

// false: 동기, true: 비동기
ajax.open("GET", NEWS_URL, false);
ajax.send();

// 2. 입력 데이터 처리
const newsFeed = JSON.parse(ajax.response);

// hashchange event -> 본 기능인 북마크 기능을 사용하지 않고 페이지 전환을 할 수 있도록 콜백함수 전달
window.addEventListener("hashchange", function () {
  const id = location.hash.substr(1);

  ajax.open("GET", CONTENT_URL.replace("@id", id), false);
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement("h1");

  title.innerHTML = newsContent.title;

  content.appendChild(title);
});

// 3. 데이터 출력
const ul = document.createElement("ul");
for (let i = 0; i < newsFeed.length; i++) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  // 제목 클릭 -> 이벤트 감지 -> 내용 확인
  a.href = `#${newsFeed[i].id}`; // 링크에 해쉬+id 값 등록 -> hashchange 이벤트 트리거
  a.innerHTML = `${newsFeed[i].title}(${newsFeed[i].comments_count})`;

  li.appendChild(a);
  ul.appendChild(li);
}

container.appendChild(ul);
container.appendChild(content);
