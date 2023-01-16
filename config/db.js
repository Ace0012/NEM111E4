const mongoose = require("mongoose");



const connection = mongoose.connect(
  "mongodb+srv://ayush:ayush@cluster0.vtnx6bc.mongodb.net/socialmedia?retryWrites=true&w=majority"

);

module.exprots = {
  connection
};
