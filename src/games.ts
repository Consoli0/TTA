import { readdirSync, readFileSync } from 'fs';
import { join, resolve } from 'path';

export var games: { [name: string]: Object } = {};

const __dirname = resolve();

readdirSync(join(__dirname, '/games')).forEach((filename: string) => {
  if (!filename.endsWith('.game.json')) return;
  const gameJson = readFileSync(join(__dirname, '/games', filename));
  const game = JSON.parse(gameJson.toString('utf-8'));
  games[game.id] = game;
  console.log(game);
});
