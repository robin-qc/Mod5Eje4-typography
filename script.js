// Funcionalidades para la página UPDS
document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // CAMBIO DE TEMA OSCURO/CLARO
    // =========================================
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Verificar tema guardado o preferencia del sistema
    const currentTheme = localStorage.getItem('theme') || 
                         (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            document.body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // =========================================
    // CONTROL DE TAMAÑO DE FUENTE
    // =========================================
    const fontSizeKey = 'upds-font-size';
    const savedSize = localStorage.getItem(fontSizeKey) || '100';
    document.documentElement.style.fontSize = savedSize + '%';
    
    document.getElementById('fontIncrease').addEventListener('click', function() {
        changeFontSize(10);
    });
    
    document.getElementById('fontDecrease').addEventListener('click', function() {
        changeFontSize(-10);
    });
    
    function changeFontSize(delta) {
        const html = document.documentElement;
        const currentSize = parseFloat(getComputedStyle(html).fontSize);
        const newSize = Math.min(Math.max(currentSize + delta, 80), 150);
        
        html.style.fontSize = newSize + '%';
        localStorage.setItem(fontSizeKey, newSize);
    }
    
    // =========================================
    // BOTÓN VOLVER ARRIBA
    // =========================================
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // =========================================
    // COPIAR CÓDIGO
    // =========================================
    window.copyCode = function() {
        const code = document.querySelector('pre code').innerText;
        navigator.clipboard.writeText(code).then(function() {
            const btn = document.querySelector('.copy-btn');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            btn.style.background = 'var(--upds-success)';
            
            setTimeout(function() {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 2000);
        });
    };
    
    // =========================================
    // ANIMACIÓN DE BARRAS DE PROGRESO
    // =========================================
    const observerOptions = {
        threshold: 0.5
    };
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        progressObserver.observe(sidebar);
    }
    
    // =========================================
    // SIMULACIÓN DE FECHA Y HORA
    // =========================================
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        // Si existe un elemento para mostrar la fecha, actualizarlo
        const dateElement = document.querySelector('.current-date');
        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString('es-ES', options);
        }
    }
    
    updateDateTime();
    setInterval(updateDateTime, 60000); // Actualizar cada minuto
    
    // =========================================
    // EFECTO DE TIPO EN EL TÍTULO
    // =========================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'none';
        setTimeout(() => {
            heroTitle.style.animation = 'fadeInUp 0.8s ease forwards';
        }, 100);
    }
    
    // =========================================
    // NOTIFICACIÓN DE BIENVENIDA
    // =========================================
    if (!sessionStorage.getItem('welcomeShown')) {
        setTimeout(() => {
            console.log('%c👋 ¡Bienvenido a la demostración de tipografía fluida!', 
                'color: #0047ab; font-size: 16px; font-weight: bold;');
            console.log('%cEstudiante: Maycol Robin | UPDS - Ingeniería de Sistemas', 
                'color: #2a75ff; font-size: 14px;');
            sessionStorage.setItem('welcomeShown', 'true');
        }, 1000);
    }
});