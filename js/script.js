document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. CONTADOR DE DÍAS (Tu código original)
    // -------------------------------------------------------------
    const startDate = new Date(2026, 7, 9); 

    function updateCounter() {
        const today = new Date();
        const differenceInTime = today.getTime() - startDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        
        const counterElement = document.getElementById("days-count");
        if (counterElement) {
            counterElement.innerText = differenceInDays >= 0 ? differenceInDays : 0;
        }
    }

    // -------------------------------------------------------------
    // 2. FRASES DIARIAS (31 frases para cada día del mes)
    // -------------------------------------------------------------
    const dailyQuotes = [
        "Cada día a tu lado es una nueva oportunidad para agradecer tu existencia.",
        "Eres el rincón preferido de mi mente y el lugar seguro de mi corazón.",
        "Cuando menos lo esperaba, apareciste tú para darle sentido a todo.",
        "Amarte es la decisión más bonita y fácil que tomo cada mañana.",
        "En tu sonrisa encuentro la paz que no sabía que necesitaba.",
        "Gracias por ser esa luz constante que me levanta cada día.",
        "Coincidir contigo en esta vida siempre será mi mayor bendición.",
        "A tu lado, los días normales se convierten en recuerdos extraordinarios.",
        "Un día tan casual como hoy comenzó nuestra historia de amor.",
        "Cuidar de tus días para hacerte feliz es mi mayor compromiso.",
        "Tu sencillez y tu forma de ser enamoraron mi alma por completo.",
        "No importa a dónde vayamos, el camino es perfecto si voy de tu mano.",
        "Eres el verso más hermoso que la vida me dio el placer de escribir.",
        "Superando cualquier dolor, mi promesa es llegar lejos juntos.",
        "El amor no necesita ser perfecto, solo necesita ser tan sincero como el nuestro.",
        "En ti encontré a mi mejor amiga, mi compañera y al amor de mi vida.",
        "Tu brillo me cautiva cada día como si fuera la primera vez.",
        "Estar contigo es la paz que mi historia siempre estuvo buscando.",
        "Jamás dudes de mi entrega, siempre estaré aquí cuidando de ti.",
        "Seguiremos en este hermoso camino guiados por el amor que compartimos.",
        "La vida se volvió más clara y bonita desde que caminamos juntos.",
        "Tenerte cerca es recordar que la magia en el mundo sí existe.",
        "Eres el motivo de mis sonrisas espontáneas a lo largo del día.",
        "Tu presencia convierte cualquier lugar en el mejor hogar.",
        "Prometo seguir construyendo a tu lado la historia más bonita.",
        "Apareciste en mi andar justo en el momento adecuado.",
        "Cada detalle tuyo me confirma que elegí al amor correcto.",
        "Gracias por levantarme, apoyarme y enseñarme lo lindo de amar.",
        "Llegar lejos y juntos... esa siempre será nuestra meta.",
        "Un amor verdadero y real no se busca, simplemente nace como el nuestro.",
        "Hoy, mañana y siempre, mi lugar favorito seguirá siendo a tu lado."
    ];

    function setDailyQuote() {
        const todayDay = new Date().getDate(); // Devuelve el número del día actual (1 - 31)
        const quoteElement = document.getElementById("daily-quote-text");
        
        if (quoteElement) {
            // Se usa todayDay - 1 porque los arreglos empiezan en la posición 0
            quoteElement.innerText = dailyQuotes[todayDay - 1] || dailyQuotes[0];
        }
    }

    // Ejecutar ambas funciones al cargar la página
    updateCounter();
    setDailyQuote();

    // -------------------------------------------------------------
    // 2. PANTALLA DE BIENVENIDA (overlay inicial)
    // - Muestra al cargar; al hacer click en 'Entrar' se hace fade-out
    // -------------------------------------------------------------
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const enterBtn = document.getElementById('enter-site');
    if (welcomeOverlay) {
        // Evitar scroll mientras esté visible
        document.body.classList.add('has-welcome');
        // Forzar focus al botón para accesibilidad
        if (enterBtn) enterBtn.focus();

        function hideWelcome() {
            welcomeOverlay.classList.add('hidden');
            document.body.classList.remove('has-welcome');
            // Esperar fin de transición y remover del DOM
            welcomeOverlay.addEventListener('transitionend', () => {
                if (welcomeOverlay && welcomeOverlay.parentNode) welcomeOverlay.parentNode.removeChild(welcomeOverlay);
            }, { once: true });
            // Fallback por si no ocurre transitionend
            setTimeout(() => {
                if (welcomeOverlay && welcomeOverlay.parentNode) welcomeOverlay.parentNode.removeChild(welcomeOverlay);
            }, 500);
        }

        if (enterBtn) {
            enterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                hideWelcome();
            });
            // Soportar tecla Enter/Space
            enterBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    hideWelcome();
                }
            });
        }

        // Permitir cerrar con Escape por accesibilidad
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape' && document.body.classList.contains('has-welcome')) {
                hideWelcome();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    // -------------------------------------------------------------
    // 3. LIGHTBOX: click en fotos para agrandar + desenfocar fondo
    // - Click en la imagen abre un overlay con la imagen ampliada
    // - Click nuevamente o presionar Escape cierra el overlay
    // -------------------------------------------------------------
    function openPhotoOverlay(src, alt) {
        // Si ya hay un overlay, ciérralo primero
        const existing = document.querySelector('.photo-overlay');
        if (existing) return;

        const overlay = document.createElement('div');
        overlay.className = 'photo-overlay';
        overlay.tabIndex = 0;

        const img = document.createElement('img');
        img.src = src;
        img.alt = alt || '';
        overlay.appendChild(img);

        // Cerrar al hacer click en cualquier lado del overlay
        overlay.addEventListener('click', () => closePhotoOverlay(overlay));

        // Evitar que click en la imagen cierre inmediatamente (se propaga al overlay)
        img.addEventListener('click', (e) => e.stopPropagation());

        document.body.appendChild(overlay);
        // Deshabilitar scroll y aplicar clase para desenfoque del fondo
        document.body.classList.add('is-lightbox-open');

        // Forzar reflow y luego abrir (para que la transición funcione)
        requestAnimationFrame(() => overlay.classList.add('open'));

        // Cerrar con Escape
        function onKey(e) {
            if (e.key === 'Escape') closePhotoOverlay(overlay);
        }

        document.addEventListener('keydown', onKey);

        // Remove listener cuando se cierre
        overlay._cleanup = () => {
            document.removeEventListener('keydown', onKey);
        };
    }

    function closePhotoOverlay(overlay) {
        if (!overlay) overlay = document.querySelector('.photo-overlay');
        if (!overlay) return;
        overlay.classList.remove('open');
        document.body.classList.remove('is-lightbox-open');
        // Esperar la transición y luego remover
        overlay.addEventListener('transitionend', () => {
            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
            if (overlay && overlay._cleanup) overlay._cleanup();
        }, { once: true });
        // Fallback inmediato si no hay transitionend
        setTimeout(() => {
            if (document.querySelector('.photo-overlay')) {
                const el = document.querySelector('.photo-overlay');
                if (el && el.parentNode) el.parentNode.removeChild(el);
            }
            document.body.classList.remove('is-lightbox-open');
        }, 400);
    }

    // Añadir listeners a todas las fotos dentro de .photo-card
    const photoImages = document.querySelectorAll('.photo-card img');
    photoImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            // Si ya existe overlay, ciérralo
            if (document.querySelector('.photo-overlay')) {
                closePhotoOverlay();
                return;
            }
            openPhotoOverlay(img.src, img.alt);
        });
    });

    // -------------------------------------------------------------
    // Notas / Cartas interactivas: toggle open/close al click o tecla
    // -------------------------------------------------------------
    const noteCards = document.querySelectorAll('.note-card');
    noteCards.forEach(card => {
        function toggle(e) {
            // si el overlay de bienvenida está presente, ignorar
            if (document.getElementById('welcome-overlay')) return;
            const isOpen = card.classList.contains('open');
            card.classList.toggle('open');
            card.setAttribute('aria-expanded', String(!isOpen));
        }

        card.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle(e);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle(e);
            }
            // Escape: cerrar
            if (e.key === 'Escape') {
                card.classList.remove('open');
                card.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Cerrar cualquier nota abierta al hacer click fuera
    document.addEventListener('click', () => {
        noteCards.forEach(c => {
            if (c.classList.contains('open')) {
                c.classList.remove('open');
                c.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Evitar que clicks internos en .note-inner cierren inmediatamente (propagación)
    document.addEventListener('click', (e) => {
        if (e.target.closest && e.target.closest('.note-inner')) {
            e.stopPropagation();
        }
    }, true);

    // -------------------------------------------------------------
    // Video lightbox: abrir video en grande y reproducir completo
    // -------------------------------------------------------------
    const videoCards = document.querySelectorAll('.video-card .video-player');
    function openVideoOverlay(src) {
        if (document.querySelector('.video-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'video-close';
        closeBtn.setAttribute('aria-label', 'Cerrar video');
        closeBtn.textContent = '✕';

        const container = document.createElement('div');
        container.className = 'video-full';

        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.preload = 'auto';

        container.appendChild(video);
        overlay.appendChild(container);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
        document.body.classList.add('is-video-open');

        // Forzar mostrar overlay
        requestAnimationFrame(() => overlay.classList.add('open'));

        // Manejo cierre
        function close() {
            try { video.pause(); } catch (e) {}
            overlay.classList.remove('open');
            document.body.classList.remove('is-video-open');
            overlay.addEventListener('transitionend', () => {
                if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, { once: true });
            setTimeout(() => { if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 350);
            document.removeEventListener('keydown', onKey);
        }

        closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

        function onKey(e) { if (e.key === 'Escape') close(); }
        document.addEventListener('keydown', onKey);
    }

    videoCards.forEach(v => {
        v.style.cursor = 'zoom-in';
        v.addEventListener('click', (e) => {
            e.stopPropagation();
            const src = v.getAttribute('src') || v.dataset.src || '';
            if (src) openVideoOverlay(src);
        });
    });
});