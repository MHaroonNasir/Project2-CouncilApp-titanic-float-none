async function getUserInfo() {
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
        console.log(userId)
        const userDetailsResponse = await fetch(`http://localhost:3000/account/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const userDetails = await userDetailsResponse.json();
    const { username, email, posts } = userDetails;
    document.getElementById("username").innerText = username;
    document.getElementById("email").innerText = email;
    const postsList = document.getElementById("posts");
    posts.forEach((post) => {
      const listItem = document.createElement("li");
      postLink.innerText = post.title;
      postsList.appendChild(listItem);
    });
  } catch (error) {
    
  }
}
getUserInfo();