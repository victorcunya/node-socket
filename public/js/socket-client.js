
const onLine = document.querySelector('#onLine');
const offLine = document.querySelector('#offLine');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');


const socket = io();

socket.on('connect', () => {

    offLine.style.display = 'none';
    onLine.style.display = '';
});

socket.on('disconnect', () => {
    offLine.style.display = '';
    onLine.style.display = 'none';
});

socket.on('send-message-server', (message) => {
    console.log('message from server', message);
});


btnSend.addEventListener('click', () => {
    const message = txtMessage.value;

    const payload = {
        message,
        date: new Date().getTime()
    }

    socket.emit('send-message-client', payload, (response) => {
        console.log('el id es el responde del server', response);
    })
});