import { TicketControl } from '../models/ticket.js';

const ticketControl = new TicketControl();

const socketController = (socket) => {

    const last = `Ticket Nro. ${ticketControl.last}`;
    socket.emit('welcome', last);
    socket.emit('actual-state', ticketControl.last4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {

        const nextTicket = ticketControl.next();
        callback(nextTicket);

        socket.broadcast.emit('last-ticket', nextTicket);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    });

    socket.on('attend-ticket', (payload, callback) => {

        const { desk } = payload;
        if (!desk) {
            return callback({
                ok: false,
                msg: 'Escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.attend(desk);
        const pendientes = ticketControl.tickets.length;
        socket.broadcast.emit('actual-state', ticketControl.last4);
        socket.broadcast.emit('tickets-pendientes', pendientes);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        } else {
            callback({
                ok: true,
                pendientes,
                ticket
            })
        }
    });

}

export default socketController
