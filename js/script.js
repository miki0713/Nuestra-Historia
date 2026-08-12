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
});