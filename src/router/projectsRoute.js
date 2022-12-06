const express = require('express')
const {UpdateProject, CreateProject, AllUserProjects, OneUserProject, DeleteProject } = require('../controllers/projectController')
const auth = require('../middlewares/Auth')

const router = express.Router()

router.get('/', auth, AllUserProjects)
router.post('/', auth, CreateProject)
router.get('/:id', auth, OneUserProject )
router.delete('/:id', auth, DeleteProject)

router.patch('/:id', auth, UpdateProject)

module.exports = router