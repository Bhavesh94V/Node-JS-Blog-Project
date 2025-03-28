const express = require('express');

const router = express.Router();
const cors = require('cors');
const {
    createuser,
    users,
    checkuser,
    getblogs,
    createblog,
    updateBlog,
    deleteBlog
} = require('../controllers/authController');

router.use(cors());
router.use(express.json());

router.get('/user', users)
router.post('/adduser', createuser)
router.post('/login', checkuser);

router.get('/blog', getblogs);
router.post('/addblog', createblog);
router.put('/updateblog/:id', updateBlog);
router.delete('/deleteblog/:id', deleteBlog);


module.exports = router;