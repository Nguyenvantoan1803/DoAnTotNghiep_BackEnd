const User = require('../model/user');
const Companies = require('../model/companies');
const Jobs = require('../model/jobs')
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.userEmail,
        pass: process.env.passEmail
    }
})

const addUser = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")

    }
    const {email,username,password} = req.body;
    if (!email || !username || !password){
        return res.status(409).send("Request all fields")
    }
    const existingEmail = await User.findOne({email})
    if (existingEmail){
        return res.status(409).send("Email already exist")
    }
    const existingNickName = await User.findOne({username})
    if (existingNickName){
        return res.status(409).send("UserName already exist")
    }
    const newUser = await User.create({email,username,password});
    return res.status(201).send(newUser)
}

const checkUser = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")
    }
    const {username,password} = req.body;
    const existingNickName = await User.findOne({username: username})
    if (!existingNickName){
        return res.status(400).send("UserName don`t exist")
    }

    if (existingNickName.password != password)
    {
        return res.status(400).send("Password error")
    }

    return res.status(200).send(existingNickName)
}

const uploadCV = async (req, res) => {
    const checkFile = req.file
    if (!checkFile) {
      return res.status(409).send('Please upload a file')
    }
    const { _id } = req.body;
    const updateUser = await User.findByIdAndUpdate(_id,{
        cv: checkFile.filename
    })
    return res.status(200).send(updateUser)
}

const getCV = async (req, res) => {
    const {username} = req.params;
    console.log(username);
    const existingUser = await User.findOne({username})
    if (!existingUser){
        return res.status(409).send("UserName don`t exist")
    }
    if (existingUser.cv==""){
        return res.status(409).send("UserName don`t cv")
    }
    return res.sendFile(`/public/uploads/${existingUser.cv}`, { root: '.' })
}

const approveJob = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")
    }
    const { idUser, idJob } = req.body
    const user = await User.findById(idUser)
    if (!user){
        return res.status(409).send("User don`t exist")
    }
    const job = await Jobs.findById(idJob)
    if (!job){
        return res.status(409).send("Job don`t exist")
    }
    const company = await Companies.findById(job.idCompany)
    const cvDetail = ('http://localhost:5000/api/user/' + `${user.username}`)

    var mailOptions = {
        from: process.env.userEmail,
        to: company.email,
        html: `<b>Bạn có người ứng cử việc ${job.title}. Bấm vào <a href='${cvDetail}'>${user.username}</a> để xem CV</b>`
    };
    
    transporter.sendMail(mailOptions, function(err,info) {
        if(err) {
            return console.log(err)
        } else 
        {
            console.log(info.response)
        }
    });

    return res.status(200).send("sucess")
}

module.exports = { addUser, checkUser, uploadCV, getCV, approveJob };
