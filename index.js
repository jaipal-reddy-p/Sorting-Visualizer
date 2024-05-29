// Get the banner video element
const bannerVideo = document.querySelector('.banner video');

// Get the button element
const button = document.querySelector('.buttonclass');

// Function to handle video playback
function handleVideoPlayback() {
  const windowWidth = window.innerWidth;

  // Check if the window width is smaller than 768px (mobile devices)
  if (windowWidth < 768) {
    // Stop video playback on mobile devices
    bannerVideo.pause();
  } else {
    // Play video on larger screens
    bannerVideo.play();
  }
}

// Function to handle button click
function handleButtonClick() {
  // Redirect to the "aboutpage.html"
  window.location.href = 'aboutpage.html';
}

// Function to handle screen resize
function handleScreenResize() {
  handleVideoPlayback();
}

// Add event listeners
window.addEventListener('load', handleVideoPlayback);
window.addEventListener('resize', handleScreenResize);
button.addEventListener('click', handleButtonClick);