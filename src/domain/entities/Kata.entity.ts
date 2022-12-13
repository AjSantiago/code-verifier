import mongoose from 'mongoose';
import { IKata } from '../interfaces/IKata.interface';

export const kataEntity = () => {
  let kataSchema = new mongoose.Schema<IKata>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true },
    intents: { type: Number, required: true },
    stars: { type: Number, required: true },
    creator: { type: String, required: true }, //Id of user
    solution: { type: String, required: true },
    participants: { type: [], required: true },
  });

  return mongoose.models.katas || mongoose.model<IKata>('katas', kataSchema);
};
