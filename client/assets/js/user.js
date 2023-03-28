async function getUser() {
  await fetch(`http://localhost:3000/account`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

// let urlParams = new URLSearchParams(window.location.search);
// let id = urlParams.get("id");
// console.log(id);

getUser();
