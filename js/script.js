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
});