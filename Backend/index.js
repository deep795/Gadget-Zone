const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require('multer')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { promisify } = require('util');
const cors = require("cors");
const nodemailer = require('nodemailer');
const fs = require('fs')
const path = require('path')
const randomstring = require("randomstring");
const UsersModel = require("./models/users.js");
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/GadgetZone")


// *********** Signup API ***************// 

app.post("/register", async(req,res)=>{
    const Firstname = req.body.firstName;
    const Lastname = req.body.lastName;
    const Email = req.body.email;
    const Password = req.body.password;
    const PhoneNumber = req.body.phoneNumber;
try{
    const existingUser = await UsersModel.findOne({Email : Email});

    if(existingUser){
        // res.status(409).json({message : "User already with this Email Exists"})

        res.json({success: false ,message : "User already exists with that Email"})
       
        return 
    }

    const hashedPassword = await hashPassword(Password);
    async function hashPassword(Password) {
        try {
            const hash = await bcrypt.hash(Password, 10);
            return hash;
        } catch (err) {
            console.log(err);
            throw err; // Consider throwing the error for proper error handling
        }
    }

    const randomBytesAsync = promisify(crypto.randomBytes);

    async function generateAuthToken(email) {
        try {
          const randomBytes = await randomBytesAsync(16);
          const token = randomBytes.toString('hex');
          const authToken = `${email}_${token}`;
          return authToken;
        } catch (error) {
          // Handle error if the randomBytes generation fails
          console.error('Error generating random bytes:', error.message);
          throw error;
        }
      }
    const authToken = await generateAuthToken(Email)
    // Usage

    const maxUIDResult = await UsersModel.findOne({}, { UID: 1 }, { sort: { UID: -1 } });

        let newUID;

        if (maxUIDResult) {
            // Increment the maximum UID by 1
            newUID = String(Number(maxUIDResult.UID) + 1).padStart(6, '0');
        } else {
            // If no documents exist, start with UID 000001
            newUID = '000001';
        }

     

    const formData = new UsersModel({
        Firstname : Firstname,
        Lastname :  Lastname,
        Email : Email,
        Password : hashedPassword,
        PhoneNumber : PhoneNumber,
        AuthToken : authToken,
        UID : newUID,
       
    })

    await formData.save();
    console.log(formData)  
    res.json({success : true , message: 'Registered successfully and now you can check your Email to verify' });

    var trans = nodemailer.createTransport({
        host : "smtp.gmail.com",
        port : 465,
        auth: {
            user : "kevinu774@gmail.com",
            pass : "okgnfxrglfyyyljl"

        }

    })
    var mailoption = {
            from:"kevinu774@gmail.com",
            to: formData.Email,
            subject : "Please Verify your Email Here!!",
            text : "Verify ASAP",
            html: '<p>Verify your Email</p> <br/> <a href="http://localhost:3001/verify/' + formData.AuthToken + '" >Click Here</a>',

        };

    trans.sendMail(mailoption,(err,info)=>{
            if(err){
            console.error(err);
            }
            console.log(info);
         });
}
    catch(error){
        console.log(error);
        // res.status(500).json({ message: 'Internal Server Error' });
    }
})


app.get("/verify/:authToken",(req,res)=>{
    const authToken = req.params.authToken;
    UsersModel.findOneAndUpdate({AuthToken : authToken}, { $set : {"isVerified" : true}})
    .then(response => res.json(response))
    .catch(err => res.json(err))
    
    
})

// *********** Log-In API ***************// 

app.post("/signin", async (req,res)=>{
    const Email = req.body.Email;
    const Password = req.body.Password;

    try {
        const user = await UsersModel.findOne({ Email: Email });
        console.log(user)
        if (user) {
            if(!user.isVerified){
                res.json({success : false, message : "Verfiy your Email"})
            }
            else{

                // User found, now validate the password
                const isPasswordValid = await bcrypt.compare(Password, user.Password);
                
                if (isPasswordValid) {
                    const userData = {
                        firstname: user.Firstname,
                        lastname: user.Lastname,
                        email: user.Email,
                        phonenumber: user.PhoneNumber,
                        password : user.Password,
                        image : user.Images,
                      };
                  // Password is valid, you might want to generate and send a JWT token here
                  res.json({ success: true, message: "Login successful", user : userData});
                } else {
                  res.json({ success: false, message: "Invalid password" });
                }
                
            }
        }
         else {

                res.json({ success: false, message: "User not found" });
            
        }
    }
    catch(err){
        console.log(err);
    }
})


app.listen(3001, ()=>{
    console.log("Server is running.")
})