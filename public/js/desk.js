
const search = new URLSearchParams(window.location.search);

if (!search.has('desk')) {
    window.location = 'index.html';
    throw new Error('Param desk required');
}

const lblH1 = document.querySelector('h1');
const btnAttend = document.querySelector('#btnAttend');
const lblTicket = document.querySelector('small');
const lblAlert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const desk = search.get('desk');
const socket = io();

socket.on('connect', () => {
    lblH1.innerHTML = 'Escritorio ' + desk;
    btnAttend.disabled = false;

})

socket.on('disconnect', () => {
    btnAttend.disabled = true;
})

socket.on('tickets-pendientes', (nroTickets) => {
    if (nroTickets === 0) {
        lblPendientes.style.display = 'none';
    }
    lblPendientes.innerHTML = nroTickets;
})

btnAttend.addEventListener('click', () => {

    socket.emit('attend-ticket', { desk }, (response) => {
        const { ok, msg, ticket, pendientes } = response;
        if (!ok) {
            lblAlert.innerHTML = msg;
            lblTicket.textContent = 'Nadie';
            return lblAlert.style.display = '';
        }
        lblPendientes.innerHTML = pendientes;
        lblTicket.textContent = ticket.number;
    });

});

