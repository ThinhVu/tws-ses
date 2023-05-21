export default {
   // system config
   port: process.env.PORT,

   // auth
   adminCode: process.env.ADMIN_CODE,

   // db
   mongoDBConn: process.env.MONGO_URL,

   // api & metric
   requestBodyMaxSize: process.env.REQUEST_BODY_MAX_SIZE || '50mb',
}
