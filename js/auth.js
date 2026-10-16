const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authStatus = document.createElement('p');

if (loginForm && registerForm) {
  authStatus.className = 'auth-status';
  authStatus.setAttribute('role', 'status');
  document.querySelector('.auth-forms')?.appendChild(authStatus);
}

function showLogin() {
  if (!loginTab || !registerTab || !loginForm || !registerForm) return;

  loginTab.classList.add('active');
  registerTab.classList.remove('active');

  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
}

function showRegister() {
  if (!loginTab || !registerTab || !loginForm || !registerForm) return;

  registerTab.classList.add('active');
  loginTab.classList.remove('active');

  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
}

if (loginTab && registerTab) {
  loginTab.addEventListener('click', showLogin);
  registerTab.addEventListener('click', showRegister);
}

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  authStatus.textContent = 'Login is ready for backend connection.';
});

registerForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const password = document.getElementById('register-password');
  const confirmation = document.getElementById('register-confirm');

  if (password?.value !== confirmation?.value) {
    authStatus.textContent = 'Passwords do not match.';
    confirmation?.focus();
    return;
  }

  authStatus.textContent = 'Registration is ready for backend connection.';
});

document.addEventListener('DOMContentLoaded', () => {
  showLogin();
});
