const express = require("express")
const {UserModel} = require("../model/users")

const userRouter  = express.Router();
userRouter.get("/", async (req, res) => {
    try {
      const notes = await todosModel.find();
      res.send(notes);
    } catch (err) {
      console.log(err);
      res.send({ massage: "Something Went Wrong" });
    }
  })
  
  userRouter.post("/create", async (req, res) => {
    const payload = req.body;
    try {
      const new_user = new UserModel(payload);
      await new_user.save();
      res.send({ massage: "Note Created Successfully" });
    } catch (err) {
      console.log(err);
      res.send({ massage: "Something Went Wrong" });
    }
  });
  
  userRouter.patch("/update/:postID", async (req, res) => {
    try {
      const payload = req.body;
      const postID = req.params.todosID;
      const userID = req.body.userID;
      const user = await UserModel.findOne({ _id: postID });
      if (userID !== user.userID) {
        res.send("Not Authorised");
      } else {
        await UserModel.findByIdAndUpdate({ _id: postID },payload);
        res.send({ massage: "User Updated Successfully" });
      }
    } catch (err) {
      console.log(err);
      res.send({ massage: "Something Went Wrong" });
    }
  });
  
  userRouter.delete("/delete/:postID", async (req, res) => {
    try {
      const postID = req.params.todosID;
      const userID = req.body.userID;
      const user = await UserModel.findOne({ _id: todosID });
      if (userID !== user.userID) {
        res.send("Not Authorised");
      }
     else{
      await UserModel.findByIdAndDelete({ _id: postID });
      res.send({ massage: "Todo Deleted Successfully" });
     }
    } catch (err) {
      console.log(err);
      res.send({ massage: "Something Went Wrong" });
    }
  });
  
  module.exports = { userRouter };
  