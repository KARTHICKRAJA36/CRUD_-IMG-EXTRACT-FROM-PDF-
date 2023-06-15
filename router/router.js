const express = require("express")
const createuser = require("../controllers/create")
const pdftoimage = require("../controllers/img")
const login = require("../controllers/login")
const checktoken = require("../controllers/read")
const preview = require("../controllers/imagepreview")
const updateImage = require("../controllers/update")
const deleteImage = require("../controllers/delete")
const addImage = require("../controllers/addphoto")
const adminlogin = require("../controllers/adminlogin")
const upload = require("../middleware/fileupload")
const checkadmin = require("../middleware/authorization")
const allimages = require("../controllers/allimages")
const router = express.Router();



router.post('/create', createuser)
router.post('/imageextract', upload.single('pdfFile'), pdftoimage)
router.post('/login', login)
router.get('/read', checktoken)
router.get('/:filename', preview)
router.put('/update/:filename', updateImage)
router.post('/addphoto/:id', addImage)
router.delete('/:filename/:id', deleteImage)
router.post('/adminlogin', adminlogin)
router.post('/readall', checkadmin, allimages)



module.exports = router