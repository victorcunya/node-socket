import { RestServer as Server } from './models/server.js';
import 'dotenv/config';

const server = new Server()

server.listen();