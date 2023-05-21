import config from '../config';
import ApiKeyModel from '../db/models/api-key'
import {apiError} from "../utils/common-util";
import _ from 'lodash'

export async function requireAdmin(req, res, next){
   try {
      const adminCode = req.headers['x-admin-code']
      if (adminCode !== config.adminCode)
         next('Invalid auth key')
      return next();
   } catch (e) {
      apiError(e, res);
   }
}

export async function requireApiKey(req, res, next) {
   try {
      const apiKey = req.headers['x-api-key']
      if (_.isEmpty(apiKey))
         throw new Error('missing api key')
      const exists = await ApiKeyModel.count({key: apiKey})
      if (exists < 1)
         throw new Error('unauthorized')
      return next()
   } catch (e) {
      apiError(e, res)
   }
}
