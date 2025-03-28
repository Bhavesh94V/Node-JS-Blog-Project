const blogModel = require("../model/productModel");
const userModel = require("../model/UserModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser');

const users = async (req, res) => {
    const data = await userModel.find();
    res.send(data)
}


const createuser = async (req, res) => {
    let {
        email,
        password
    } = req.body;

    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt)
        const data = await userModel.create({ email, password: hash });
        res.json(data);
    } catch (error) {
        console.log(error)
    }

}
const checkuser = async (req, res) => {
    let {
        email,
        password
    } = req.body;

    try {
        const data = await userModel.findOne({ email: email })
        if (!data) res.status(404).json({ message: "usernotFound" });

        let match = bcrypt.compare(password, data.password)
        if (match) {
            let token = jwt.sign({ email }, "sfsfd");
            res.json(data).cookie('token', token);
        } else {
            res.status(404).json({ message: "password inccorrect" });
        }
    } catch (error) {

    }
}


// const checkuser = async (req, res) => {
//     let { email, password } = req.body;
//     try {
//         const data = await userModel.findOne({ email: email });
//         if (!data) {
//             return res.status(404).json({ message: "usernotFound" });
//         }

//         const match = await bcrypt.compare(password, data.password); // await here
//         if (match) {
//             let token = jwt.sign({ email }, "sfsfd");
//             res.json(data).cookie('token', token);
//         } else {
//             res.status(404).json({ message: "password incorrect" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }


const getblogs = async (req, res) => {
    const data = await blogModel.find();
    res.json(data);
}
const createblog = async (req, res) => {
    let {
        author,
        article,
        comment
    } = req.body;
    await blogModel.create({ author: author, article: article, comment: comment });
}

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { author,
        article,
        comment
    } = req.body;
    try {
        const updatedBlog = await blogModel.findByIdAndUpdate(id, { author, article, comment }, { new: true });
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: "Update failed", error });
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        await blogModel.findByIdAndDelete(id);
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error });
    }
};

module.exports = { createuser, users, checkuser, getblogs, createblog, updateBlog, deleteBlog }