const signupForm = document.querySelector('.signup-form');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('#response-message');
const closeModalButton = document.querySelector('.close-modal');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Collect values from the form
  const user_name = document.querySelector('#userName').value.trim();
  const first_name = document.querySelector('#firstName').value.trim();
  const last_name = document.querySelector('#lastName').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  // Validate form values
  if (!user_name || !first_name || !last_name || !email || !password) {
    modalContent.textContent = 'All fields are required';
    modal.style.display = 'block';
    return;
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    modalContent.textContent = 'Invalid email';
    modal.style.display = 'block';
    return;
  }
  if (password.length < 6) {
    modalContent.textContent = 'Password must be at least 6 characters long';
    modal.style.display = 'block';
    return;
  }

  // Send a POST request to the API endpoint
  const response = await fetch('/api/users/signup', {
    method: 'POST',
    body: JSON.stringify({ user_name, first_name, last_name, email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If successful, redirect the browser to the profile page
    document.location.replace('/');
  } else {
    const responseJson = await response.json();
    modalContent.textContent = responseJson.error;
    modal.style.display = 'block';
  }
});

closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';

});
