document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');
  const nombres = localStorage.getItem('nombres');
  const apellidos = localStorage.getItem('apellidos');

  const welcomeUserSpan = document.getElementById('welcomeUser'); // Might not exist on all pages
  const heroWelcomeH2 = document.getElementById('heroWelcome'); // Might not exist on all pages
  const loginLogoutLi = document.querySelector('#navmenu ul');
  const lastLi = loginLogoutLi ? loginLogoutLi.lastElementChild : null;

  if (token) {
    const displayNombres = nombres || '';
    const displayApellidos = apellidos || '';
    
    if (welcomeUserSpan) {
      welcomeUserSpan.textContent = `Bienvenido ${displayNombres} ${displayApellidos}`.trim();
    }
    if (heroWelcomeH2) {
      heroWelcomeH2.textContent = `Bienvenido ${displayNombres} ${displayApellidos}`.trim();
    }
    
    if (lastLi) {
      lastLi.innerHTML = '<a href="#" id="logout">Cerrar Sesión</a>';
      
      const logoutButton = document.getElementById('logout');
      if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('token');
          localStorage.removeItem('rol');
          localStorage.removeItem('nombres');
          localStorage.removeItem('apellidos');
          window.location.href = 'index.html';
        });
      }
    }
  } else {
    if (welcomeUserSpan) {
      welcomeUserSpan.textContent = '';
    }
    if (heroWelcomeH2) {
      heroWelcomeH2.textContent = 'Bienvenidos'; // Reset hero section
    }
    if (lastLi) {
      lastLi.innerHTML = '<a href="login.html">Iniciar Sesión</a>';
    }
  }
});