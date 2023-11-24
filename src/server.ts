/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function server() {
  try {
    await mongoose.connect(config.database_url as string).then(() => {
      console.log('database connected successfully');
    });

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port http://localhost:${config.port}`);
    });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
}

// eslint-disable-next-line no-console
server().catch((err) => console.log(err.message));
