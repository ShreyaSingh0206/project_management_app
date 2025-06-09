const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/bugtracker')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("hello")
})

app.post('/SignUp',(req,res) => {
  let {email, password} = req.body;

  bcrypt.genSalt(10,(err,salt) => {
    bcrypt.hash(password,salt,async(err,hash)=>{
      try{
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ success: false, message: "Account already exists" });
        }
        let createdUser = await userModel.create({
        email,
        password: hash
      })
      let token = jwt.sign({ email }, process.env.JWT_SECRET || "defaultsecret");
      res.cookie("token",token);
      res.json({ success: true, message: "Account created successfully" })
      }catch (err) {
        res.status(500).json({ success: false, message: "Error creating account" });
      }
      
    })
  })
})

app.post('/SignIn', async function (req,res) {
  let user = await userModel.findOne({email:req.body.email});
  
  if(!user) res.json({ success: false, message: "something is wrong" })

  bcrypt.compare(req.body.password, user.password, function(err,result){
    if(result){
      let token = jwt.sign({email: user.email}, process.env.JWT_SECRET || "defaultsecret");
      res.cookie("token",token);
      res.json({ success: true, message: "Signed up successfully" })
    }
    else res.json({ success: false, message: "something is wrong" })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
