const {model, Schema} = require('mongoose')
const Task = require('./Task')

const projectSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

projectSchema.pre('remove', async function(next){
  const project = this
  await Task.deleteMany({project: project._id})

  next()
})

const Project = model('project', projectSchema)

module.exports = Project