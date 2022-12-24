const Jobs = require('../model/jobs')
const Companies = require('../model/companies')
const addJob = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")
    }
    const {title,image,salary,city,district,tags,benefits,description,idCompany} = req.body;
    if (!idCompany){
        return res.status(409).send("What is Company?")
    }
    const findCompany = await Companies.findOne({idCompany})
    if (!findCompany){
        return res.status(409).send("Company don't exist")
    }
    const getTime = Date.now;
    const newJobs = await Jobs.create({getTime,tags,benefits,title,image,salary,city,district,description});
    const arrayJobs = findCompany.jobs;
    arrayJobs.push(newJobs._id);
    await Companies.findByIdAndUpdate(idCompany,{
        jobs: arrayJobs
    })
    return res.status(201).send(newJobs)
}

module.exports = { addJob };
