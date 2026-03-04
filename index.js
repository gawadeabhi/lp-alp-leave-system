const functions = require("firebase-functions");

exports.hello = functions.https.onRequest((req,res)=>{
  res.send("LP Leave System Backend Ready");
});