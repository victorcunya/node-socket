
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import socketController from '../controllers/socket.js';


export class RestServer {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = new Server(this.server); // toda la información de los sockets conectados
        this.path = {}
        this.middlewares();
        this.routes();
        this.sockets();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json()); // lectura y Parseo del body
        this.app.use(express.static('public')); // directorio publico

    }

    routes() {
        // this.app.use(this.path.user, userRouter);
    }

    sockets() {
        this.io.on('connection', socketController)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('listening on port ' + this.port);
        })
    }

}