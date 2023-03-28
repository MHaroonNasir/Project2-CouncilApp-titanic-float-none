const postCardTemplate = document.querySelector("[data-post-template]");
const postCardContainer = document.querySelector("[data-post-cards-container]");
const searchInput = document.querySelector("[data-search]");

let posts = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  posts.forEach((post) => {
    const itExists =
      post.title.toLowerCase().includes(value) ||
      post.category.toLowerCase().includes(value);
    post.element.classList.toggle("hide", !itExists);
  });
});

async function getAllPosts() {
  await fetch(`http://localhost:3000/posts`)
    .then((response) => response.json())
    .then((data) => {
      posts = data.map((post) => {
        const card = postCardTemplate.content.cloneNode(true).children[0];
        const title = card.querySelector("[data-title]");
        const content = card.querySelector("[data-content]");
        const category = card.querySelector("[data-category]");
        title.textContent = post.title;
        content.textContent = post.content;
        category.textContent = `Category: ${post.category}`;
        postCardContainer.appendChild(card);
        return {
          title: post.title,
          content: post.content,
          category: post.category,
          element: card,
        };
      });
    });
}
getAllPosts();
