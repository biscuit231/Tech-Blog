// Show the modal
function showModal() {
  document.querySelector('.modal-overlay').style.display = 'block';
}

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      // If not successful, display the response in the modal
      const data = await response.json();
      document.querySelector('#response-message').innerHTML = JSON.stringify(data);
      showModal();
    } else {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    }
  }
};

// Hide the modal
function closeModal() {
  document.querySelector('.modal-overlay').style.display = 'none';
}

document
.querySelector('.login-form')
.addEventListener('submit', loginFormHandler);

document.querySelector('.close-button').addEventListener('click', closeModal);
