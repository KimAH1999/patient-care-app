const signupFormHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');
  const lastNameEl = document.querySelector('#doctor-last-name');
  const firstNameEl = document.querySelector('#doctor-first-name');

  const response = await fetch('/api/doctor', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
      first_name: firstNameEl.value,
      last_name: lastNameEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to sign up');
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
