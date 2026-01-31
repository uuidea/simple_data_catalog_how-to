document.addEventListener('DOMContentLoaded', function() {
  // Sidebar toggle for mobile
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const body = document.body;
  
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      body.classList.toggle('sidebar-visible');
    });
  }
  
  // Navigation toggles for nested items
  const navToggles = document.querySelectorAll('.nav-toggle');
  
  navToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      
      const childrenList = this.nextElementSibling;
      if (childrenList && childrenList.classList.contains('nav-children')) {
        childrenList.style.display = isExpanded ? 'none' : 'block';
      }
    });
  });
  
  // Set active navigation based on current URL
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(function(link) {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
      
      // Expand parent sections if necessary
      let parent = link.closest('.nav-children');
      while (parent) {
        const parentToggle = parent.previousElementSibling;
        if (parentToggle && parentToggle.classList.contains('nav-toggle')) {
          parentToggle.setAttribute('aria-expanded', 'true');
          parent.style.display = 'block';
        }
        parent = parent.parentElement.closest('.nav-children');
      }
    }
  });
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const sidebar = document.querySelector('.sidebar');
      const toggle = document.querySelector('.sidebar-toggle');
      
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
        body.classList.remove('sidebar-visible');
      }
    }
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768) {
        body.classList.add('sidebar-visible');
      } else {
        body.classList.remove('sidebar-visible');
      }
    }, 250);
  });
});