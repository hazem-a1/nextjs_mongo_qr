// types/global.d.ts

import { Mongoose } from 'mongoose';

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };

  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      };
    }
  }
}

export {};