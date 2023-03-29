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

async function getUserId() {
  let dataHolder;
  await fetch(`http://127.0.0.1:3000/account/5`)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data)
      dataHolder = data
    })
    return dataHolder;
}

async function volunteer (e) {
  console.log("called", e.target.classList[1])
  const cardId = e.target.classList[1];

  const data = await getUserId();
  console.log(data["user_id"]);

  await fetch(`http://127.0.0.1:3000/volunteer/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      post_id: parseInt(e.target.classList[1]),
      user_id: parseInt(data["user_id"])
    })
  })
  .then(response => {
    if (!response) {
      throw new Error("No valid network response!");
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error:', error);
  });
  console.log("done");
};

const applyToVolunteer = () => {
  const applyToPost = Array.from(document.getElementsByClassName("btn-apply"));
  //console.log(applyToPost)
  applyToPost.forEach(button => {
    button.addEventListener("click", volunteer)
  });
};

async function getAllPosts() {
  await fetch(`http://localhost:3000/posts`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      posts = data.map((post) => {
        const card = postCardTemplate.content.cloneNode(true).children[0];
        const title = card.querySelector("[data-title]");
        const content = card.querySelector("[data-content]");
        const category = card.querySelector("[data-category]");

        //const buttonClass = card.querySelector("[button-class]")
        const buttonClass = card.querySelector("[btn-apply]")
        console.log("post", buttonClass, post.post_id)
        buttonClass.classList.add(post.post_id);

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
  
  applyToVolunteer();
}
getAllPosts();
