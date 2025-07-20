const mongoose = require('mongoose')

// const connectToDB = async () => {
//     mongoose.connection.on('connected',()=>{
//         console.log("Database Connected")
//     })
//    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
// }
// module.exports = connectToDB;
function connectToDb() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = connectToDb;