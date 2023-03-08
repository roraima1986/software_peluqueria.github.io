$(function(){
    // Fecha
    let date_sale = document.getElementById('date-sale');
    date_sale.innerHTML = new Date().toLocaleDateString();

    // Hora
    let time_sale = document.getElementById('time-sale');

    function displayTime(){
        time_sale.innerHTML = new Date().toLocaleTimeString();
    }

    setInterval(displayTime, 1000);
});
