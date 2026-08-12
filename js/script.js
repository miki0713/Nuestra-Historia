document.addEventListener("DOMContentLoaded", () => {
    // La fecha del noviazgo oficial (Año, Mes - 1, Día)
    // Agosto es el mes 7 porque enero empieza en 0.
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

    updateCounter();
});