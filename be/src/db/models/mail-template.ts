import {Schema, Types, model} from 'mongoose';

const schema = new Schema({
   title: String,
   content: String
}, {versionKey: false})

export interface IMailTemplate {
   _id: Types.ObjectId;
   title: string;
   content: string;
}

export default model<IMailTemplate>('MailTemplate', schema)
