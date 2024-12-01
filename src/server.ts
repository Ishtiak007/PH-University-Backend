/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const { port, databaseURL } = config;

async function connectServer() {
  try {
    await mongoose.connect(databaseURL as string);
    app.listen(port, () => {
      console.log(`PH-University server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

connectServer();
