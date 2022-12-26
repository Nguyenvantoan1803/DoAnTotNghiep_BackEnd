const Jobs = require('../model/jobs')
const Companies = require('../model/companies')
const addJob = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")
    }
    const {title,salary,city,district,tags,benefits,description,idCompany} = req.body;
    const {image} = req.file.filename;
    if (!idCompany){
        return res.status(409).send("What is Company?")
    }
    const findCompany = await Companies.findOne({idCompany})
    if (!findCompany){
        return res.status(409).send("Company don't exist")
    }
    const getTime = Date.now;
    const isShow = true;
    const newJobs = await Jobs.create({getTime,tags,benefits,title,image,salary,city,district,description,idCompany,isShow});
    const arrayJobs = findCompany.jobs;
    arrayJobs.push(newJobs._id);
    await Companies.findByIdAndUpdate(idCompany,{
        jobs: arrayJobs
    })
    return res.status(201).send(newJobs)
}
const updateJob = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")
    }
    const {title,salary,city,district,tags,benefits,description,idCompany,idJob} = req.body;
    const {image} = req.file.filename;
    const getTime = Date.now;
    const isShow = true;
    const newJobs = await Jobs.findByIdAndUpdate(idJob,{getTime,tags,benefits,title,image,salary,city,district,description,idCompany,isShow});
    return res.status(201).send(newJobs)
}
const closeJob = async (req, res) => {
    if (Object.keys(req.body).length === 0){
        return res.status(400).send("Body can`t be empty")
    }
    const {idJob,idCompany} = req.body;
    if (!idCompany){
        return res.status(409).send("What is Company?")
    }
    if (!idJob){
        return res.status(409).send("What is Job?")
    }
    const job = await Jobs.findOne({idJob});
    if (!job){
        return res.status(409).send("Job don't exist")
    }
    if (job.idCompany != idCompany)
    {
        return res.status(409).send("Not pemisstion")
    }
    await Jobs.findByIdAndUpdate(idJob,{
        isShow: false
    })
    return res.status(201).send('Sucess')
}
const getJobByIdCompany = async (req, res) => {
    const { idCompany } = req.params;
    const listJob = await Jobs.find({ idCompany: idCompany})
    return res.status(201).send(listJob)
}

const getJobByTime = async (req, res) => {
    const listJob = await Jobs.find().sort({ time: -1})
    return res.status(201).send(listJob)
}


module.exports = { addJob, closeJob, updateJob, getJobByIdCompany, getJobByTime };
