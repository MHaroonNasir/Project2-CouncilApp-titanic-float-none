const createPostBtn = document.getElementById('createPost');

// Get the form element
const form = document.querySelector('#createPost-form');

// Add an event listener for the form submit event
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the default form submission behavior

  // Get the input values from the form
  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;
  const category = document.querySelector('#category').value;

  // Get the authentication token from local storage
  const token = localStorage.getItem('token');
  const options = {
      headers: {
          'Authorization' : localStorage.getItem("token")
        }
    }
    console.log(token.headers);

  // Make a POST request to the backend to create a new post
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
