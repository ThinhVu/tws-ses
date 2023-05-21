import MailTemplate from "../../db/models/mail-template";
import express from 'express'
import {requireAdmin} from "../../middlewares/auth";
import $ from '../../middlewares/safe-call'
import To from "../../utils/data-parser";
import _ from 'lodash';

const router = express.Router()

router.get('/', requireAdmin, $(async () => MailTemplate.find()))
router.get('/:id', requireAdmin, $(async req => MailTemplate.findById({_id: To.objectId(req.params.id)})))
router.post('/', requireAdmin, $(async req => MailTemplate.create(_.pick(req.body, ['title', 'content']))))
router.put('/:id', requireAdmin, $(async req => MailTemplate.updateOne(
   {_id: To.objectId(req.params.id)},
   _.compact(_.pick(req.body, ['title', 'content']))
)))
router.delete('/:id', requireAdmin, $(async req => MailTemplate.deleteOne({_id: To.objectId(req.params.id)})))

export default router

