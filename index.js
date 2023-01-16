const express = require('express');
const {connection} = require("./config/db");
const cors = require("cors");
const { authentication } = require('./middleware/auth');
const {userRouter} = require("./routes/User.route");
const { UserModel } = require('./model/users');
const { PostModel } = require('./model/users');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

require("dotenv").config()


const app = express()


app.use(express.json())
app.use(cors({
    origin:"*"
}))


app.get("/" ,(req,res)=>{

    res.send("welcome to homepage")

})




app.post("/users/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        console.log(err);
      } else {
        const newData = new UserModel({
          name,
          email,
          gender,
          password: hash,
        });
        await newData.save();
        res.send("registered");
      }
    });
  } catch (error) {
    console.log(error);
    res.send("enter all the details");
  }
});
server.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        // result == true
        if (result) {
          const token = jwt.sign({ name: "suvo" }, "suvo");
          res.send({ status: "login successful", token: token });
        } else {
          res.send("wrong entry");
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send("wrong entry");
  }
});
server.use(auth);
server.post("/post", async (req, res) => {
  const data = req.body;
  try {
    const post = new PostModel(data);
    await post.save();
    res.send("post added");
  } catch (error) {
    console.log(error);
    res.send("not able to  post ");
  }
});
server.patch("/posts/update/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await PostModel.findByIdAndUpdate({ _id: id }, data);
    res.send(`post is updated for user whos iD is: ${id}`);
  } catch (error) {
    res.send("something wrong");
  }
});
server.delete("/posts/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.send(`post is deleted for user whos iD is: ${id}`);
  } catch (error) {
    res.send("something wrong");
  }
});

  // app.use(authentication);
  app.use("/users",userRouter)
const port = 9000;

app.listen(port, async ()=>{

    try {
        await connection
        
        console.log("connected to db")
        
    } catch (error) {
        console.log(error)
        
        res.status(400).send({"err":"Something went wrong"})
    }
    console.log(`server is running on ${port}`)


})


