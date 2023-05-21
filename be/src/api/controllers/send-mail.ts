
import express from 'express';
import MailConfigModel from "../../db/models/mail-config";
import MailTemplateModel from "../../db/models/mail-template";
import $ from "../../middlewares/safe-call";
import {requireApiKey} from "../../middlewares/auth";
import To from '../../utils/data-parser';
import sendEmail from "../../utils/email-util";

const router = express.Router()

router.post('/', requireApiKey, $(async (req, res) => {
   const {mxCfgId, emailTemplateId, data} = req.body
   const mxConfigDoc = await MailConfigModel.findOne({_id: To.objectId(mxCfgId)})
   if (!mxConfigDoc)
      throw new Error("mx-config not found")

   const emailTemplateDoc = await MailTemplateModel.findOne({_id: To.objectId(emailTemplateId)})
   if (!emailTemplateDoc)
      throw new Error("email template not found")

   let emailContent = emailTemplateDoc.content
   Object.keys(data).forEach(key => emailContent = emailContent.replace(`{{${key}}`, data[key]))

   await sendEmail(mxCfgId.cfg, {to: data.to, subject: data.subject, html: emailContent})

   res.status(204)
}))

export default router;
