import {Schema, Types, model} from 'mongoose';

const schema = new Schema({
   name: String,
   cfg: Object
}, {versionKey: false})

export interface IMailConfig {
   _id: Types.ObjectId;
   name: string;
   cfg: unknown;
}

export default model<IMailConfig>('MailConfig', schema)
