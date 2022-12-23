const User = require('../model/user')

const addUser = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")

    }

    const {email,username,password,cv} = req.body;
    console.log(req.body);
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


module.exports = addUser;
