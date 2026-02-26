// This script runs before React loads to prevent hydration mismatch
// It locks the theme to prevent browser extensions from modifying the HTML

(function() {
  // Force light theme immediately before any extension can interfere
  document.documentElement.classList.add('light');
  document.documentElement.style.colorScheme = 'light';
  
  // Prevent any changes to the theme
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' || mutation.attributeName === 'style') {
        const html = document.documentElement;
        if (!html.classList.contains('light')) {
          html.classList.add('light');
        }
        html.style.colorScheme = 'light';
      }
    });
  });
  
  // Start observing after a short delay (once React has hydrated)
  setTimeout(() => {
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }, 100);
})();
