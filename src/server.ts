/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
import seedSupperAdmin from './app/DB';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.databaseURL as string);

    seedSupperAdmin();

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`😋 unahandledRejection is detected , shutting down ...😋`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😫 uncaughtException is detected , shutting down ...😫`);
  process.exit(1);
});
