
// Referencias del HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();


socket.on('connect', () => {

    btnCrear.disabled = false;

    socket.on('welcome', (ticket) => {
        lblNuevoTicket.textContent = ticket;
    });
})

socket.on('disconnect', () => {
    btnCrear.disabled = true;
})

socket.on('last-ticket', (payload) => {
    lblNuevoTicket.textContent = payload;
})

btnCrear.addEventListener('click', () => {

    socket.emit('next-ticket', null, (ticket) => {
        console.log(ticket);
        lblNuevoTicket.textContent = ticket;
    });

});