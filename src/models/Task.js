const {Schema, model} = require('mongoose')

const taskSchema = Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category:{
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now()
  },
  project: {
    type: Schema.Types.ObjectId,
    ref:'project'
  }
})

const Task = model('task', taskSchema)

module.exports = Task