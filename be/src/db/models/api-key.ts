import {Schema, model} from 'mongoose';

const schema = new Schema({
   key: String,
}, {versionKey: false})

export interface IApiKey {
   key: string
}

export default model<IApiKey>('ApiKey', schema)
