async function getAllPosts() {
  document.getElementById("btn-search").addEventListener("click", async () => {
    const response = await fetch(`http://localhost:3000/posts/${category}`);
    const data = await response.json();
    console.log(data);
  });
}
