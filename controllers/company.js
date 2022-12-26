const Companies = require('../model/companies')
const User = require('../model/user')
const createCompany = async (req, res) => {
    const {email,companyname,password} = req.body
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")

    }
    if (!email || !companyname || !password){
        return res.status(409).send("Request all fields")
    }
    const existingEmail = await Companies.findOne({email})
    if (existingEmail){
        return res.status(409).send("Email already exist")
    }
    const existingNickName = await Companies.findOne({companyname})
    if (existingNickName){
        return res.status(409).send("Company Name already exist")
    }
    const newCompany = await Companies.create({email,companyname,password})
    return res.status(200).send(newCompany)
}

const findCompany = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")
    }
    const {companyname,password} = req.body;
    const existingNickName = await Companies.findOne({companyname: companyname})
    if (!existingNickName){
        return res.status(400).send("UserName don`t exist")
    }

    if (existingNickName.password != password)
    {
        return res.status(400).send("Password error")
    }

    return res.status(200).send(existingNickName)
}

const uploadCompany = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")
    }
    const {_id,email,quote,address,country,day,description,skills,reasons,benefits,phone} = req.body;
    const company = await Companies.findById(_id)
    if (!company){
        return res.status(400).send("company don`t exist")
    }
    const updateCompany = await Companies.findByIdAndUpdate(_id,{
        email: email,
        quote: quote,
        address: address,
        country: country,
        day: day,
        description: description,
        skills: skills,
        reasons: reasons,
        benefits: benefits,
        phone: phone
    })
    return res.status(200).send(updateCompany)
}

const ratingCompany = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")
    }
    const {idCompany, idUser, rating} = req.body;
    const company = await Companies.findById(idCompany)
    if (!company){
        return res.status(400).send("company don`t exist")
    }
    const user = await User.findById(idUser)
    if (!user){
        return res.status(400).send("user don`t exist")
    }
    const checkDidRating = company.rating.find(value => value == idUser)
    if (checkDidRating){
        return res.status(400).send("user did rating")
    }
    const newRating = company.rating;
    if(newRating.length == 0)
    {
        newRating[0]=rating;

    } else {
        newRating[0]=(Number(company.rating[0])*Number(company.rating.length-1)+Number(rating))/Number(company.rating.length);
    }
    newRating.push(idUser);
    const updateCompany = await Companies.findByIdAndUpdate(idCompany,{
        rating: newRating
    })
    return res.status(200).send(updateCompany)
}

module.exports = {createCompany,findCompany,uploadCompany,ratingCompany};