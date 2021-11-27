const body = document.body;
const navLink = document.querySelectorAll(".page-link");
const page = new URLSearchParams(window.location.search).get("page") || 1;
let ITEMS = [];
let idItem = null;
function createItem(text, title, id) {
  const artContent = document.querySelector(".article__content");

  const artItem = document.createElement("div");
  const artItemText = document.createElement("div");
  const artitemTitle = document.createElement("div");

  artItem.classList.add("article__item");
  artItemText.classList.add("item__text");
  artitemTitle.classList.add("item__title");

  artItemText.textContent = text;
  artitemTitle.textContent = title;
  artItem.setAttribute("data-id", id);

  artItem.append(artitemTitle);
  artItem.append(artItemText);

  artItem.addEventListener("click", () => {
    window.location.href = `file:///C:/Users/vampi/Desktop/%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5/code/web/js/article/article.html?id=${id}}`;
  });

  artContent.append(artItem);
}

async function getDataItem() {
  const response = await fetch(
    `https://gorest.co.in/public-api/posts?page=${page}`
  );
  const itemData = await response.json();
  ITEMS = itemData.data;
}

async function creatContent() {
  await getDataItem();
  const itemsFiltered = ITEMS.filter((item) => item.body.length > 40);
  itemsFiltered.forEach((itemElement) => {
    createItem(itemElement.body, itemElement.title, itemElement.id);
  });
  navPage();
}

function navPage() {
  const linkUl = document.querySelector(".pagination");
  for (i = 1; i < 11; i++) {
    const linkLi = document.createElement("li");
    const link = document.createElement("a");

    link.textContent = i;

    linkLi.classList.add("page-item");
    link.classList.add("page-link");
    link.classList.add("page-link");

    link.addEventListener("click", (e) => {
      e.preventDefault();
      nav = e.target.textContent;
      window.location.href = `file:///C:/Users/vampi/Desktop/Программирование/code/web/js/article/inbox.html?page=${nav}`;
    });

    linkLi.append(link);
    linkUl.append(linkLi);
  }
}

if (
  window.location.pathname ===
  "/C:/Users/vampi/Desktop/%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5/code/web/js/article/inbox.html"
) {
  creatContent();
}

//article

let COMMENTS = [];
let CONTENT = [];
const itemId = new URLSearchParams(window.location.search).get("id");

async function getDataItemComment() {
  const respons = await fetch(
    `https://gorest.co.in/public-api/comments?post_id=${itemId}`
  );
  const comment = await respons.json();
  COMMENTS = comment.data;
}

function crecateItemComment() {
  const comments = document.querySelector(".comment");
  COMMENTS.forEach((element) => {
    let commentItem = document.createElement("div");
    commentItem.classList.add("comment__item");
    commentItem.innerHTML = `
    <img class="avatar__img" src="./avatar.jpeg" alt="#" />
  <div class="avatar__info">
    <div class="comment__name">${element.name} <span class="avatar__span">пишет:</span> </div>
    <div class="comment__email">${element.email}</div>
  </div>
  <div class="comment__text">${element.body}</div>`;
    comments.append(commentItem);
  });
}

async function getDataItemContent() {
  const respons = await fetch(
    `https://gorest.co.in/public-api/posts/${itemId}`
  );
  const itemContent = await respons.json();
  CONTENT = itemContent.data;
}

function createContentItem() {
  const contentItemContent = document.querySelector(".content");
  const contentTitle = document.createElement("div");
  const contentText = document.createElement("div");

  contentTitle.classList.add("item__title");
  contentTitle.classList.add("item__title--full");
  contentText.classList.add("item__text");
  contentText.classList.add("item__text--full");

  contentTitle.textContent = CONTENT.title;
  contentText.textContent = CONTENT.body;

  contentItemContent.append(contentTitle);
  contentItemContent.append(contentText);
}

async function createComments() {
  await getDataItemComment();
  crecateItemComment();
}

async function creatContentAtricle() {
  await getDataItemContent();
  createContentItem();
}

if (
  window.location.pathname ===
  "/C:/Users/vampi/Desktop/%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5/code/web/js/article/article.html"
) {
  creatContentAtricle();
  createComments();
}
