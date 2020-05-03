import { games } from './games.js';
import { TextAdventureServer } from './processing/telnet-host.js';
const sv = new TextAdventureServer();
sv.start(3000);
