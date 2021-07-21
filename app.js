const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json"; // @id 마킹
const container = document.getElementById("root");

// 1. 데이터 입력: 중복코드 개선
function getData(url) {
  ajax.open("GET", url, false); // false: 동기, true: 비동기
  ajax.send();

  return JSON.parse(ajax.response);
}

// 함수 분리: 목록 불러오기
function newsFeed() {
  // 2. 입력 데이터 처리
  const newsFeed = getData(NEWS_URL);

  // 3. 데이터 출력
  const newsList = [];
  newsList.push("<ul>");

  for (let i = 0; i < newsFeed.length; i++) {
    newsList.push(`
    <li>
      <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title}(${newsFeed[i].comments_count})
      </a>
    </li>
  `);
  }

  newsList.push("</ul>");

  container.innerHTML = newsList.join("");
}

// 함수 분리: 상세 내용 불러오기
function newsDetail() {
  const id = location.hash.substr(1);
  const newsContent = getData(CONTENT_URL.replace("@id", id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>
    <div>
      <a href="#">목록으로</a>
    </div>
  `;
}

function router() {
  const routePath = location.hash;

  // #만 전달된 경우 location.hash에는 빈 문자열이 담김
  if (routePath === "") {
    newsFeed();
  } else {
    newsDetail();
  }
}

// hashchange event -> 본 기능인 북마크 기능을 사용하지 않고 페이지 전환을 할 수 있도록 콜백함수 전달
window.addEventListener("hashchange", router);

router();
