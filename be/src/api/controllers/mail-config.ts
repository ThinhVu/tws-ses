import MailConfigModel from "../../db/models/mail-config";
import express from 'express';
import {requireAdmin} from "../../middlewares/auth";
import $ from '../../middlewares/safe-call';
import To from '../../utils/data-parser';
import _ from 'lodash'

const router = express.Router()

router.get('/', requireAdmin, $(async () => MailConfigModel.find()))
router.get('/:id', requireAdmin, $(async req => MailConfigModel.findById({_id: To.objectId(req.params.id)})))
router.post('/', requireAdmin, $(async req => MailConfigModel.create(_.pick(req.body, ['name', 'cfg']))))
router.put('/:id', requireAdmin, $(async req => MailConfigModel.updateOne(
   {_id: To.objectId(req.params.id)},
   _.compact(_.pick(req.body, ['name', 'cfg']))
)))
router.delete('/:id', requireAdmin, $(async req => MailConfigModel.deleteOne({_id: To.objectId(req.params.id)})))

export default router

