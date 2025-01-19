document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Download button animation
  const downloadBtn = document.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('mouseover', () => {
      downloadBtn.style.transform = 'translateY(-2px)';
    });
    
    downloadBtn.addEventListener('mouseout', () => {
      downloadBtn.style.transform = 'translateY(0)';
    });
    
    downloadBtn.addEventListener('click', (e) => {
      // Add download animation or confirmation here
      const span = downloadBtn.querySelector('span');
      const originalText = span.textContent;
      span.textContent = 'Downloading...';
      
      setTimeout(() => {
        span.textContent = originalText;
      }, 2000);
    });
  }

  // Intersection Observer for animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe all features and game cards
  document.querySelectorAll('.feature, .game-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });

  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
  });

  // Language selection
  const languageModal = document.getElementById('languageModal');
  const languageButtons = document.querySelectorAll('.lang-btn');
  let currentLang = 'en';

  const translations = {
    en: {
      welcomeTitle: 'Welcome to DetoxLauncher',
      welcomeSubtitle: 'Your all-in-one gaming platform',
      downloadNow: 'Download Now',
      featuredGames: 'Featured Games',
      whyChoose: 'Why Choose DetoxLauncher?',
      gameScreenshots: 'Game Screenshots',
      actionGames: 'Action Games',
      thrillingSub: 'Experience thrilling adventures',
      strategy: 'Strategy',
      strategySub: 'Plan your path to victory',
      rpg: 'RPG',
      rpgSub: 'Immerse in epic stories',
      allGames: 'All Games in One Place',
      allGamesSub: 'Access your entire game library instantly',
      fastDownloads: 'Fast Downloads',
      fastDownloadsSub: 'Optimized download speeds',
      securePlatform: 'Secure Platform',
      secureSub: 'Safe and secure gaming experience',
      footer: {
        about: 'Your ultimate gaming platform',
        links: 'Links',
        contact: 'Contact',
        copyright: ' 2024 DetoxLauncher. All rights reserved.'
      }
    },
    ru: {
      welcomeTitle: 'Добро пожаловать в DetoxLauncher',
      welcomeSubtitle: 'Ваша универсальная игровая платформа',
      downloadNow: 'Скачать сейчас',
      featuredGames: 'Популярные игры',
      whyChoose: 'Почему DetoxLauncher?',
      gameScreenshots: 'Скриншоты игр',
      actionGames: 'Экшн игры',
      thrillingSub: 'Испытайте захватывающие приключения',
      strategy: 'Стратегии',
      strategySub: 'Планируйте путь к победе',
      rpg: 'РПГ',
      rpgSub: 'Погрузитесь в эпические истории',
      allGames: 'Все игры в одном месте',
      allGamesSub: 'Мгновенный доступ ко всей библиотеке игр',
      fastDownloads: 'Быстрая загрузка',
      fastDownloadsSub: 'Оптимизированная скорость загрузки',
      securePlatform: 'Безопасная платформа',
      secureSub: 'Безопасный игровой процесс',
      footer: {
        about: 'Ваша идеальная игровая платформа',
        links: 'Ссылки',
        contact: 'Контакты',
        copyright: ' 2024 DetoxLauncher. Все права защищены.'
      }
    }
  };

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    
    // Update text content for all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = key.split('.').reduce((obj, key) => obj[key], translations[lang]);
      if (translation) element.textContent = translation;
    });

    localStorage.setItem('preferredLanguage', lang);
    languageModal.style.display = 'none';
  }

  // Check for stored language preference
  const storedLang = localStorage.getItem('preferredLanguage');
  if (storedLang) {
    setLanguage(storedLang);
    languageModal.style.display = 'none';
  }

  languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });

  // Screenshot preview functionality
  document.querySelectorAll('.screenshot-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', () => {
      // Placeholder for future image upload functionality
      console.log('Screenshot clicked - implement image upload here');
    });
  });

  // Enhanced Header Functionality
  const header = document.querySelector('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  let lastScroll = 0;
  
  // Hide/Show header on scroll
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
    
    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // Add active class to current section in navigation
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute('id');
      }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Enhanced parallax effect for floating elements
  window.addEventListener('mousemove', (e) => {
    const floatElements = document.querySelectorAll('.float-element');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatElements.forEach(element => {
      const offsetX = (mouseX - 0.5) * 20;
      const offsetY = (mouseY - 0.5) * 20;
      element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });

  // Add floating elements dynamically
  const floatingElements = document.querySelector('.floating-elements');
  const decorElements = [
    { icon: 'M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6z', size: 40 },
    { icon: 'M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2z', size: 35 },
    { icon: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z', size: 45 },
    { icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z', size: 30 },
    { icon: 'M15 9H9v6h6V9zm-2 4h-2v-2h2v2z', size: 35 }
  ];

  decorElements.forEach((elem, index) => {
    const div = document.createElement('div');
    div.className = 'float-element';
    div.style.setProperty('--delay', `${index * 2}s`);
    div.innerHTML = `
      <svg width="${elem.size}" height="${elem.size}" viewBox="0 0 24 24">
        <path d="${elem.icon}"/>
      </svg>
    `;
    floatingElements.appendChild(div);
  });

  // Physics-based shape interaction
  const shapes = document.querySelectorAll('.shape');
  let isDragging = false;
  let currentShape = null;
  let initialX = 0;
  let initialY = 0;
  let xOffset = 0;
  let yOffset = 0;
  let velocity = { x: 0, y: 0 };
  let lastPos = { x: 0, y: 0 };
  let lastTime = Date.now();

  // Glow effect following scroll
  const updateGlowEffects = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    document.querySelectorAll('.hero::after, .features::before, .features::after')
      .forEach(glow => {
        const glowPos = (scrollY / (documentHeight - windowHeight)) * 100;
        glow.style.transform = `translateY(${glowPos}vh)`;
      });
  };

  window.addEventListener('scroll', updateGlowEffects);

  // Shape physics
  const dragStart = (e) => {
    if (e.target.classList.contains('shape')) {
      currentShape = e.target;
      isDragging = true;
      currentShape.classList.add('dragging');
      
      const rect = currentShape.getBoundingClientRect();
      initialX = e.clientX - rect.left;
      initialY = e.clientY - rect.top;
      
      lastPos = { x: e.clientX, y: e.clientY };
      lastTime = Date.now();
    }
  };

  const drag = (e) => {
    if (isDragging) {
      e.preventDefault();
      
      const currentX = e.clientX - initialX;
      const currentY = e.clientY - initialY;
      
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      
      velocity = {
        x: (e.clientX - lastPos.x) / dt,
        y: (e.clientY - lastPos.y) / dt
      };
      
      currentShape.style.transform = `translate(${currentX}px, ${currentY}px)`;
      
      lastPos = { x: e.clientX, y: e.clientY };
      lastTime = now;
    }
  };

  const dragEnd = () => {
    if (isDragging) {
      isDragging = false;
      currentShape.classList.remove('dragging');
      
      const decay = 0.95;
      const animate = () => {
        if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
          const rect = currentShape.getBoundingClientRect();
          const currentX = rect.left;
          const currentY = rect.top;
          
          velocity.x *= decay;
          velocity.y *= decay;
          
          const newX = currentX + velocity.x * 0.016;
          const newY = currentY + velocity.y * 0.016;
          
          // Bounce off window boundaries
          if (newX < 0 || newX > window.innerWidth - rect.width) {
            velocity.x *= -0.8;
          }
          if (newY < 0 || newY > window.innerHeight - rect.height) {
            velocity.y *= -0.8;
          }
          
          currentShape.style.transform = `translate(${newX}px, ${newY}px)`;
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  };

  document.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);
  document.addEventListener('mouseleave', dragEnd);

  // Add smooth mouse following effect
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      shapes.forEach(shape => {
        const rect = shape.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distX = mouseX - centerX;
        const distY = mouseY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          const moveX = distX * force * 0.1;
          const moveY = distY * force * 0.1;
          
          shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });
    }
  });
});