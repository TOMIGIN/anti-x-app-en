// ==========================================================================
// Anti-X App Logic & Timing Control (English Version)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  registerServiceWorker();

  const splashScreen = document.getElementById('splash-screen');
  const warningScreen = document.getElementById('warning-screen');
  const doneScreen = document.getElementById('done-screen');
  const blackoutScreen = document.getElementById('blackout-screen');
  
  const timerProgress = document.querySelector('.timer-progress');
  const closeBtn = document.getElementById('close-btn');

  const SPLASH_DURATION = 800;      
  const SPLASH_EXIT_TIME = 500;     
  const WARNING_DURATION = 2500;    

  if (timerProgress) {
    timerProgress.style.transform = 'scaleX(1)';
    timerProgress.style.transition = 'none';
  }

  // --- 1. Transition Timeline ---
  setTimeout(() => {
    splashScreen.classList.add('exit');

    setTimeout(() => {
      splashScreen.classList.remove('active');
      warningScreen.classList.add('active');

      if (timerProgress) {
        requestAnimationFrame(() => {
          timerProgress.style.transition = `transform ${WARNING_DURATION}ms linear`;
          timerProgress.style.transform = 'scaleX(0)';
        });
      }

      setTimeout(() => {
        warningScreen.classList.remove('active');
        doneScreen.classList.add('active');
      }, WARNING_DURATION);

    }, SPLASH_EXIT_TIME);

  }, SPLASH_DURATION);

  // --- 2. Action Button Control ---
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeBtn.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        doneScreen.classList.remove('active');
        blackoutScreen.classList.add('active');

        try {
          window.close();
          setTimeout(() => {
            if (!window.closed) {
              console.log("Window could not be closed automatically due to browser security restrictions.");
            }
          }, 500);
        } catch (e) {
          console.error("Error attempting to close the window:", e);
        }

      }, 200);
    });
  }
});

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((err) => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
}
