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
    const { username, email } = userDetails;
    document.getElementById("username").innerText = username;
    document.getElementById("email").innerText = email;
   
    const userPostsResponse = await fetch(`http://localhost:3000/posts/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const userPosts = await userPostsResponse.json();
    const postsList  = document.getElementById("user-posts");
    if (userPosts.length > 1){
        userPosts.forEach((post) => {
            const card = document.createElement("div");
            card.classList.add("card");
            const cardTitle = document.createElement("h3");
            cardTitle.innerText = post.title;
            const cardContent = document.createElement("p");
            cardContent.innerText = post.content;
            const cardCategory = document.createElement("p");
            cardCategory.innerText = `Category: ${post.category}`;
            card.appendChild(cardTitle);
            card.appendChild(cardContent);
            card.appendChild(cardCategory);
            postsList.appendChild(card);
        });
    } else {
        const listItem = document.createElement("li");
        listItem.innerText = "No posts available";
        postsList.appendChild(listItem);
      }
  } catch (error) {
    
  }
}

getUserInfo();