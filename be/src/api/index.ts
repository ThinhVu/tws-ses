import express from 'express'
import ApiKey from "./controllers/api-key";
import MailTemplate from "./controllers/mail-template";
import MailConfig from "./controllers/mail-config";
import SendMail from './controllers/send-mail'
import {requireAdmin, requireApiKey} from "../middlewares/auth";

const router = express.Router()

router.get('/health-check', (_, res) => res.status(200).end())
router.use('/api-key', requireAdmin, ApiKey)
router.use('/mail-template', requireAdmin, MailTemplate)
router.use('/mail-config', requireAdmin, MailConfig)
router.use('/send-mail', requireApiKey, SendMail)

export default router
