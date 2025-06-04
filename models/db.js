const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var options = { // commented out as at local there is no username and password 
 user: process.env.DB_USER,
 pass: process.env.DB_PWD,
 auth: {
   authdb: 'admin'
 } 
}

let isConnected;

module.exports = connectToDatabase = () => {
  return new Promise((resolve, reject)=>{
    if (isConnected) {
      console.log('=> using existing database connection');
      return resolve();
    }
  
    console.log('=> using new database connection');
    mongoose.connect(process.env.DB,{ useUnifiedTopology: true,useNewUrlParser: true })
      .then(db => { 
        mongoose.set('useCreateIndex', true);
        isConnected = db.connections[0].readyState;
        return resolve();
      }).catch(err=>{
        console.log("Error in db connection",err);
        return reject(err);
      });

  });
};
module.exports={connectToDatabase};



