// 1. 데이터 입력
const ajax = new XMLHttpRequest();
const container = document.getElementById("root");
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json"; // @id 마킹

// 중복코드 개선
function getData(url) {
  ajax.open("GET", url, false); // false: 동기, true: 비동기
  ajax.send();

  return JSON.parse(ajax.response);
}

// hashchange event -> 본 기능인 북마크 기능을 사용하지 않고 페이지 전환을 할 수 있도록 콜백함수 전달
window.addEventListener("hashchange", function () {
  const id = location.hash.substr(1);
  const newsContent = getData(CONTENT_URL.replace("@id", id));
  const title = document.createElement("h1");

  title.innerHTML = newsContent.title;

  content.appendChild(title);
});

// 2. 입력 데이터 처리
const newsFeed = getData(NEWS_URL);

// 3. 데이터 출력
const ul = document.createElement("ul");
for (let i = 0; i < newsFeed.length; i++) {
  const div = document.createElement("div"); // li, a를 담아줄 임시 부모 요소

  // 링크에 해쉬+id 값 등록 -> hashchange 이벤트 트리거
  div.innerHTML = `
    <li>
      <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title}(${newsFeed[i].comments_count})
      </a>
    </li>
  `;

  // ul.appendChild(div.children[0]); // 자식 요소들은 배열로 담겨있음
  ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
container.appendChild(content);
