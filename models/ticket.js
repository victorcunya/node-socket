
import { readFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';

class Ticket {

    constructor(number = 1, desk) {
        this.number = number;
        this.desk = desk;
    }

}

export class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        this.init();
    }

    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        }
    }

    async init() {
        // leer archivo json
        const json = JSON.parse(
            await readFile(
                new URL(
                    '../db/data.json', import.meta.url
                )
            )
        );
        const { today, last, tickets, last4 } = json;

        if (today === this.today) {
            this.last = last;
            this.last4 = last4;
            this.tickets = tickets;
        } else {
            this.saveDB();
        }

    }

    saveDB() {
        const dbPath = path.join(process.cwd(), '/db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    next() {
        this.last++;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveDB();

        return `Ticket Nro. ${ticket.number}`;
    }

    attend(desk) {

        if (this.tickets.length === 0) {
            return null;
        }

        const ticket = this.tickets.shift(); // remove el primero del array.
        ticket.desk = desk;

        this.last4.unshift(ticket); // lo inserta al inicio del array.

        if (this.last4.length > 4) {
            this.last4.splice(-1, 1); // remove el ultimo.
        }

        this.saveDB();

        return ticket;
    }

}