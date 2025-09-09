/**
* Template Name: Append
* Template URL: https://bootstrapmade.com/append-bootstrap-website-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Custom Pure Counter
   */
  function PureCounter() {
    document.querySelectorAll('.purecounter').forEach(counter => {
      const start = parseInt(counter.getAttribute('data-purecounter-start')) || 0;
      const end = parseInt(counter.getAttribute('data-purecounter-end')) || 0;
      const duration = parseInt(counter.getAttribute('data-purecounter-duration')) || 1;
      const separator = counter.getAttribute('data-purecounter-separator') || '';
      const once = counter.getAttribute('data-purecounter-once') === 'true';

      let current = start;
      let increment = (end - start) / (duration * 60); // Assuming 60 frames per second

      const updateCounter = () => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
          current = end;
          counter.innerText = current.toLocaleString('en-US').replace(/,/g, separator);
          return;
        }
        counter.innerText = Math.floor(current).toLocaleString('en-US').replace(/,/g, separator);
        requestAnimationFrame(updateCounter);
      };

      if (!once) { // Simple check for now, full PureCounter has more logic
        updateCounter();
      } else {
        // For 'once' functionality, we'd need IntersectionObserver to start when visible
        // For now, just set the end value if 'once' is true and not yet visible
        counter.innerText = end.toLocaleString('en-US').replace(/,/g, separator);
      }
    });
  }

  /**
   * Custom Animation on Scroll (AOS)
   */
  function aosInit() {
    const aosElements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          // If 'once' is true, stop observing after animation
          if (entry.target.getAttribute('data-aos-once') === 'true') {
            observer.unobserve(entry.target);
          }
        } else {
          // If 'mirror' is true, remove class when out of view
          if (entry.target.getAttribute('data-aos-mirror') === 'true') {
            entry.target.classList.remove('aos-animate');
          }
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of element is visible

    aosElements.forEach(element => {
      observer.observe(element);
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Custom Swiper (Simplified)
   */
  function Swiper(selector, options) {
    const element = document.querySelector(selector);
    if (!element) return;

    const wrapper = element.querySelector('.swiper-wrapper');
    const slides = Array.from(element.querySelectorAll('.swiper-slide'));
    let currentIndex = 0;
    let intervalId;

    // Ensure wrapper is a flex container
    wrapper.style.display = 'flex';
    wrapper.style.width = `${slides.length * 100}%`; // Make wrapper wide enough for all slides

    // Apply initial styles for slides
    slides.forEach((slide, i) => {
      slide.style.width = '100%'; // Each slide takes 100% of the wrapper's width
      slide.style.flexShrink = '0';
      slide.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      if (options.effect === 'fade') {
        slide.style.position = 'absolute';
        slide.style.top = '0';
        slide.style.left = '0';
        slide.style.opacity = '0';
      }
    });

    function showSlide(index) {
      console.log('Showing slide:', index);
      if (options.effect === 'fade') {
        slides.forEach((slide, i) => {
          if (i === index) {
            slide.style.opacity = '1';
            slide.style.zIndex = '1';
          } else {
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
          }
        });
      } else {
        const offset = -index * (100 / slides.length); // Calculate offset based on number of slides
        wrapper.style.transform = `translateX(${offset}%)`;
      }
      currentIndex = index;
    }

    function nextSlide() {
      let newIndex = (currentIndex + 1) % slides.length;
      showSlide(newIndex);
    }

    function prevSlide() {
      let newIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    }

    // Autoplay
    if (options.autoplay && options.autoplay.delay) {
      intervalId = setInterval(nextSlide, options.autoplay.delay);
    }

    // Navigation
    if (options.navigation) {
      const nextButton = document.querySelector(options.navigation.nextEl);
      const prevButton = document.querySelector(options.navigation.prevEl);

      if (nextButton) {
        nextButton.addEventListener('click', () => {
          clearInterval(intervalId); // Stop autoplay on manual navigation
          nextSlide();
          if (options.autoplay && options.autoplay.delay) {
            intervalId = setInterval(nextSlide, options.autoplay.delay);
          }
        });
      }
      if (prevButton) {
        prevButton.addEventListener('click', () => {
          clearInterval(intervalId); // Stop autoplay on manual navigation
          prevSlide();
          if (options.autoplay && options.autoplay.delay) {
            intervalId = setInterval(prevSlide, options.autoplay.delay);
          }
        });
      }
    }

    // Initial display
    showSlide(currentIndex);

    // Handle breakpoints (simplified - only adjusts slidesPerView visually)
    const applyBreakpoints = () => {
      if (options.breakpoints) {
        const windowWidth = window.innerWidth;
        let activeBreakpoint = null;
        for (const bp in options.breakpoints) {
          if (windowWidth >= parseInt(bp)) {
            activeBreakpoint = options.breakpoints[bp];
          }
        }
        if (activeBreakpoint) {
          slides.forEach(slide => {
            slide.style.width = `${100 / activeBreakpoint.slidesPerView}%`;
          });
        } else {
          slides.forEach(slide => {
            slide.style.width = `${100 / (options.slidesPerView || 1)}%`;
          });
        }
      }
    };

    window.addEventListener('resize', applyBreakpoints);
    applyBreakpoints(); // Apply on load
  }

  /**
   * Custom Isotope (Simplified)
   */
  function Isotope(element, options) {
    const container = element;
    const items = Array.from(container.querySelectorAll(options.itemSelector));

    function arrangeItems(filter) {
      items.forEach(item => {
        if (filter === '*' || item.classList.contains(filter.substring(1))) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      // Simple fitRows layout (can be improved for more complex scenarios)
      // For now, just ensures block display for visible items
      // A true Isotope layout would calculate positions to fill gaps
    }

    // Initial arrangement
    arrangeItems(options.filter);

    return {
      arrange: function(opts) {
        arrangeItems(opts.filter);
      }
    };
  }

  /**
   * Custom AddToHomeScreen
   */
  function AddToHomeScreen(options) {
    // Basic implementation for demonstration.
    // A full PWA prompt would involve listening to 'beforeinstallprompt' event
    // and showing a custom UI.
    console.log('AddToHomeScreen called with options:', options);

    return {
      show: function(lang) {
        console.log('Showing AddToHomeScreen prompt for language:', lang);
        // In a real scenario, you'd show a modal or banner here
        // For now, we'll just log a message
        alert('This is a placeholder for Add to Home Screen prompt. In a real PWA, you would see a custom banner here.');
      }
    };
  }
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    const selectSelloCV = document.getElementById('sello-verde-cv');

    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    //window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');

    if(window.scrollY > 100){
      selectBody.classList.add('scrolled')
    }else{
      selectBody.classList.remove('scrolled')
    }
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Scroll up sticky header to headers with .scroll-up-sticky class
   */
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky')) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = `-${header.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = "0";
    } else {
      selectHeader.style.removeProperty('top');
      selectHeader.style.removeProperty('position');
    }
    lastScrollTop = scrollTop;
  });

  

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  
  /**
   * Initiate Pure Counter
   */
  // PureCounter reimplementation will go here  

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
  */  
  

  

  /**
   * Animation on scroll function and init
   */
  // AOS reimplementation will go here

  /**
   * Init services layout and filters
   */
  document.querySelectorAll('.tramites-layout').forEach(function(objIsotopeItem) {
    let objInitIsotope;
    let propLayout = objIsotopeItem.getAttribute('data-layout') ?? 'fitRows';
    let propFilter = objIsotopeItem.getAttribute('data-default-filter') ?? '*';
    let propSort = objIsotopeItem.getAttribute('data-sort') ?? 'original-order';

    objInitIsotope = new Isotope(objIsotopeItem.querySelector('.tramites-container'), {
      itemSelector: '.tramites-item',
      layoutMode: propLayout,
      filter: propFilter,
      sortBy: propSort
    });    

    objIsotopeItem.querySelectorAll('.tramites-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        objIsotopeItem.querySelector('.tramites-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        objInitIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });  

  /**
   * Init services worker and AddToHomeScreen web app
   */
  /*if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });
  } */

  window.addEventListener("DOMContentLoaded", async event => {
   
    // AddToHomeScreen reimplementation will go here

  // Clarity calls removed
        
  });

  function isStandAlone() {        
    return (!!("standalone" in window.navigator && window.navigator.standalone) || 
            !!window.matchMedia("(display-mode: standalone)").matches); 
  }  

})();

