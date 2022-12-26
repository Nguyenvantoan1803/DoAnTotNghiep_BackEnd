const User = require('../model/user')

const addUser = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")

    }
    const {email,username,password,cv} = req.body;
    const existingEmail = await User.findOne({email})
    if (existingEmail){
        return res.status(409).send("Email already exist")
    }
    const existingNickName = await User.findOne({username})
    if (existingNickName){
        return res.status(409).send("UserName already exist")
    }
    const newUser = await User.create({email,username,password,cv});
    return res.status(201).send(newUser)
}

const checkUser = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")
    }
    const {username,password} = req.body;

    const existingNickName = await User.findOne({username})
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

module.exports = { addUser, checkUser, uploadCV, getCV };
