// Login Signup Pg
const form = document.getElementById('form');
const firstnameInput = document.getElementById('firstname-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const repeatPasswordInput = document.getElementById('repeat-password-input');
const errorMessage = document.getElementById('error-message');


form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission

  let errors = [];

  if (firstnameInput) {
    // Signup form validation
    errors = getSignupFormErrors(firstnameInput.value, emailInput.value, passwordInput.value, repeatPasswordInput.value);
  } else {
    // Login form validation
    errors = getLoginFormErrors(emailInput.value, passwordInput.value);
  }

  if (errors.length > 0) {
    errorMessage.innerText = errors.join(". ");
  } else {
    // If no errors, you can proceed with form submission or other actions
    // For example, you might want to redirect the user or send data to a server
    // window.location.href = "success.html"; // Replace with your success page
    console.log("Form submitted successfully!"); // Or any other action
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (firstname === '' || firstname == null) {
    errors.push('Firstname is required');
    firstnameInput.parentElement.classList.add('incorrect');
  }
  if (email === '' || email == null) {
    errors.push('Email is required');
    emailInput.parentElement.classList.add('incorrect');
  }
  if (password === '' || password == null) {
    errors.push('Password is required');
    passwordInput.parentElement.classList.add('incorrect');
  }
  if (password.length < 8) {
    errors.push('Password must have at least 8 characters');
    passwordInput.parentElement.classList.add('incorrect');
  }
  if (password !== repeatPassword) {
    errors.push('Password does not match repeated password');
    passwordInput.parentElement.classList.add('incorrect');
    repeatPasswordInput.parentElement.classList.add('incorrect');
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === '' || email == null) {
    errors.push('Email is required');
    emailInput.parentElement.classList.add('incorrect');
  }
  if (password === '' || password == null) {
    errors.push('Password is required');
    passwordInput.parentElement.classList.add('incorrect');
  }

  return errors;
}

// Event listener for input changes to clear errors
const allInputs = [firstnameInput, emailInput, passwordInput, repeatPasswordInput].filter(input => input != null);
allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      errorMessage.innerText = '';
    }
  });
});