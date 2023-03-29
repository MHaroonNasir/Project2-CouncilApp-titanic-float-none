import { getUserIdByToken } from "./userProfile.js";

const postCardTemplate = document.querySelector("[data-post-template]");
const postCardContainer = document.querySelector("[data-post-cards-container]");
const searchInput = document.querySelector("[data-search]");

let posts = [];
let userId;

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
  await fetch(`http://127.0.0.1:3000/account/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      dataHolder = data;
    });
  return dataHolder;
}

async function volunteer(e) {
  const postId = e.target.classList[1];

  const data = await getUserId();

  await fetch(`http://127.0.0.1:3000/volunteer/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: parseInt(e.target.classList[1]),
      user_id: parseInt(data["user_id"]),
    }),
    })
    .then((response) => {
      if (!response) {
        throw new Error("No valid network response!");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
     window.location.href = 'userProfile.html'
}

const applyToVolunteer = () => {
  const applyToPost = Array.from(document.getElementsByClassName("btn-apply"));
  applyToPost.forEach((button) => {
    button.addEventListener("click", async (e) => {
      if ((await isLogin()) == true) {
        volunteer(e);
        // window.location.href = 'userProfile.html'
      } else {
        window.location.href = "login.html";
      }
    });
  });
};

const logoutBtn = document.getElementById("logout");
const createPostBtn = document.getElementById("createPost");

async function isLogin() {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Im in");
    userId = await getUserIdByToken();
    return true;
  } else {
    console.log("Im not in");
    return false;
  }
}

const logIn = isLogin();

if (!logIn) {
  logoutBtn.innerText = "Log In";
}

if (!logIn) {
  createPostBtn.addEventListener("click", (e) => {
    window.location.href = "login.html";
  });
} else {
  createPostBtn.addEventListener("click", (e) => {
    window.location.href = "createPost.html";
  });
}

async function getAllPosts() {
  await fetch(`http://localhost:3000/posts`)
    .then((response) => response.json())
    .then((data) => {
      posts = data.map((post) => {
        const card = postCardTemplate.content.cloneNode(true).children[0];
        const title = card.querySelector("[data-title]");
        const content = card.querySelector("[data-content]");
        const category = card.querySelector("[data-category]");
        const buttonClass = card.querySelector("[btn-apply]");
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

const userNamePage = document.getElementsByClassName("user-link");
if (logIn) {
  async function getUserIdByToken() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/token/${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      const userId = data.userToken.user_id;
      return userId;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function getUserName() {
    try {
      const userId = await getUserIdByToken();
      if (!userId) {
        throw new Error("User ID not found.");
      }
      const token = localStorage.getItem("token");
      const userDetailsResponse = await fetch(
        `http://localhost:3000/account/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const userDetails = await userDetailsResponse.json();
      console.log(userDetails);
      const userName = userDetails.username;
      userNamePage[0].innerText = userName.toUpperCase();
      userNamePage[0].addEventListener("click", (e) => {
        console.log(e);
        window.location.href = "userProfile.html";
      });
    } catch (error) {}
  }
  getUserName();
} else {
  userNamePage[0].addEventListener("click", (e) => {
    console.log(e);
    window.location.href = "login.html";
  });
}

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '1b966221f6mshe27357ce1912d04p1dc00ajsn49c84317578b',
    'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
  }
};

 function fetchQuote() {
    fetch('https://quotes15.p.rapidapi.com/quotes/random/', options)
    .then(response => response.json())
    .then(data => {
      const quote = data.content;
      const author = data.originator.name;

      if (quote.length < 100) {
        document.getElementById("quote").innerHTML = quote;
        document.getElementById("author").innerHTML = author;
      } else {
        console.log("quote too long ")
        fetchQuote();
      }
    })
    .catch(err => console.error(err));
}

fetchQuote();






getAllPosts();
getUserIdByToken();
