export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// This function handles navigation from policy pages back to main page sections
export const navigateFromPolicyPage = (href: string) => {
  // Check if we're on a policy page by examining the hash
  const isPolicyPage = window.location.hash.startsWith('#/privacy-policy') ||
                       window.location.hash.startsWith('#/terms-of-service') ||
                       window.location.hash.startsWith('#/cookie-policy');
  
  if (isPolicyPage) {
    // First, navigate back to the main page without any policy hash
    window.location.hash = '';
    
    // Then set a timeout to allow the main page to render before scrolling
    setTimeout(() => {
      if (href === '#') {
        scrollToTop();
      } else {
        const sectionId = href.replace('#', '');
        scrollToSection(sectionId);
      }
    }, 50);
    
    return true; // Indicate that we handled a policy page navigation
  }
  
  return false; // Regular navigation (not from a policy page)
};
