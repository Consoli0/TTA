import { createServer, Server, Socket } from 'net';
import { EventEmitter } from 'events';
import readline from 'linebyline';

export class TextAdventureClient extends EventEmitter {
  cl: Socket;
  rl: readline;
  game: Object;
  active: boolean;
  progress: {};

  constructor(socket: Socket) {
    super();
    this.cl = socket;
    this.cl.setEncoding('UTF-8');
    this.cl.setKeepAlive(true);

    this.rl = readline(this.cl);
    this.rl.on('line', (input: string) => {
      console.log(`[${input.length}]: ${input}`);
      this.cl.write(input);
      if (input === '[[exit]]') process.exit(0);
    });
  }
}

export class TextAdventureServer extends EventEmitter {
  sv: Server;
  connections: Array<TextAdventureClient>;

  constructor() {
    super();
    this.connections = [];
    this.sv = createServer();
    this.sv.on('connection', (socket: Socket) => {
      this.connections.push(new TextAdventureClient(socket));
    });
  }

  start(port: number) {
    this.sv.listen(port);
    this.sv.once('listening', () => console.log('Listening at port ' + port));
  }
}
