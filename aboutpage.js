
function adjustLayout() {
  const content = document.querySelector('.content');
  const h1 = document.querySelector('h1');
  const h2 = document.querySelectorAll('h2');
  const loginButton = document.querySelector('.login-button');

  const windowWidth = window.innerWidth;

  if (windowWidth <= 768) {
      content.style.width = '90%';
      content.style.padding = '20px';
  } else if (windowWidth <= 480) {
      content.style.width = '95%';
      content.style.padding = '10px';
      h1.style.fontSize = '24px';
      h2.forEach(heading => heading.style.fontSize = '20px');
      loginButton.style.fontSize = '14px';
      loginButton.style.padding = '12px 20px';
  } else {
      content.style.width = '80%';
      content.style.padding = '40px';
      h1.style.fontSize = '';
      h2.forEach(heading => heading.style.fontSize = '');
      loginButton.style.fontSize = '';
      loginButton.style.padding = '15px 25px';
  }
}

window.addEventListener('load', adjustLayout);
window.addEventListener('resize', adjustLayout);