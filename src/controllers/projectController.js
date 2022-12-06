const Project = require('../models/Project')

const AllUserProjects = async (req, res) =>{
  try {
    const alluserProjects = await Project.find({owner: req.user._id})
    res.status(200).json(alluserProjects)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

const OneUserProject = async (req,res)=>{
  const id = req.params.id
  try {
    const project = await Project.findOne({owner: req.user._id, _id: id})
    res.status(200).json(project)
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
}

const CreateProject = async (req,res) => {
  const project = new Project({
    ...req.body,
    owner: req.user._id
  })

  try {
    await project.save()
    return res.status(201).send(project)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

const UpdateProject = async (req,res) => {
  const id = req.params.id
  const { name } = req.body

  try {
    const project = await Project.findOne({owner: req.user._id, _id: id})

    if(!project) {
      return res.status(404).send({msg: "Project doesn't exist"})
    }

    await Project.findOneAndUpdate({owner: req.user._id, _id: id},{ name })
    return res.status(200).send(await Project.findOne({owner: req.user._id, _id: id}))
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

const DeleteProject = async (req,res) => {
  const id = req.params.id
  
  try {
    const project = await Project.findOne({owner: req.user._id, _id: id})

    if(!project) {
      return res.status(404).send(project)
    }
    
    await Project.findOneAndDelete({owner: req.user._id, _id: id})
    return res.status(200).json(project)
  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
}

module.exports = {
  CreateProject,
  AllUserProjects,
  OneUserProject,
  DeleteProject,
  UpdateProject
}