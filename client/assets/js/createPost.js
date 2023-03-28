
const form = document.querySelector('#createPost-form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); 


  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;
  const category = document.querySelector('#category').value;


  fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("token")
    },
    body: JSON.stringify({
      title: title,
      content: content,
      category: category
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Redirect the user to the new post page
    window.location.href = `index.html`;
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
