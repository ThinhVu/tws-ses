import nodemailer from 'nodemailer';

function mailSenderFactory(cfg) {
   return {
      cfg: cfg,
      ins: nodemailer.createTransport(cfg)
   }
}

export default function sendEmail(cfg, { to, subject, html }) {
   const mailSender = mailSenderFactory(cfg)

   return new Promise((resolve, reject) => {
      mailSender.ins.sendMail(
         {
            from: mailSender.cfg.auth.user,
            to,
            subject,
            html
         },
         function (err, info) {
            if (err) {
               console.log('An error occurred while sending an email: ', err);
               return reject(err);
            } else {
               return resolve(info);
            }
         }
      )
   })
}
