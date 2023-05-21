import ApiKeyModel from "../../db/models/api-key";
import express from 'express'
import {requireAdmin} from "../../middlewares/auth";
import $ from '../../middlewares/safe-call'
import To from "../../utils/data-parser";
import _ from 'lodash';

const router = express.Router()

router.get('/', requireAdmin, $(async () => ApiKeyModel.find()))
router.get('/:id', requireAdmin, $(async req => ApiKeyModel.findById({_id: To.objectId(req.params.id)})))
router.post('/', requireAdmin, $(async req => ApiKeyModel.create(_.pick(req.body, ['key']))))
router.put('/:id', requireAdmin, $(async req => ApiKeyModel.updateOne(
   {_id: To.objectId(req.params.id)},
   _.compact(_.pick(req.body, ['key']))
)))
router.delete('/:id', requireAdmin, $(async req => ApiKeyModel.deleteOne({_id: To.objectId(req.params.id)})))

export default router

