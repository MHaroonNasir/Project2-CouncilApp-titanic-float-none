function createPostElement(data) {
  const post = document.createElement("div");
  post.className = "post";

  const header = document.createElement("h2");
  header.textContent = data["title"];
  post.appendChild(header);

  const content = document.createElement("p");
  content.textContent = data["content"];
  post.appendChild(content);

  const category = document.createElement("p");
  category.textContent = data["category"];
  post.appendChild(category);

  return post;
}

async function getAllPosts() {
  const options = {
    headers: {
      'Authorization' : localStorage.getItem("token")
    }
  }
  const response = await fetch(`http://localhost:3000/posts`, options);
  const data = await response.json();
  const container = document.getElementById("posts");
  data.forEach((post) => {
    const elem = createPostElement(post);
    container.appendChild(elem);
  });
}

getAllPosts();
