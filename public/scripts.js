// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
});

// Hide the menu if clicked outside of it
document.addEventListener("click", (event) => {
  if (window.innerWidth <= 768) {
    if (
      navMenu.style.display === "flex" &&
      !navMenu.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      navMenu.style.display = "none";
    }
  }
});

// Handle resizing of the screen
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.style.display = "flex";
  } else {
    navMenu.style.display = "none";
  }
});

// Select login form and logout button elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const logoutButton = document.getElementById('logoutButton');

// Check if user is logged in (JWT present)
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (token) {
    if (loginForm) loginForm.style.display = 'none';
    if (logoutButton) logoutButton.style.display = 'block';
  }
});

// Handle login form submission
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Store token in localStorage
          localStorage.setItem('token', data.token);
          // Redirect to homepage
          window.location.href = 'index.html';
        } else {
          // Display error message
          const errorMessage = document.getElementById('error-message');
          if (errorMessage) errorMessage.style.display = 'block';
        }
      })
      .catch(error => console.error('Error during login:', error));
  });
}

// Handle registration form submission
if (registerForm) {
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'User registered successfully') {
          window.location.href = 'login.html';
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error during registration:', error));
  });
}

// Logout Button Functionality
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    // Remove JWT token from localStorage
    localStorage.removeItem('token');
    window.location.href = 'login.html'; // Redirect to login page
  });
}
