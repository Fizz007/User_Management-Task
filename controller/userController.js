const User = require("../models/users");
const States = require("../models/states");
const Role = require("../models/role");
const District = require("../models/districts");
const Villages = require("../models/villages");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const SECRET_KEY = "Dhwani123";
const Op = require("sequelize").Op

const signUpUser = async (req, res) => {
  const {name, email,role, password, mobile} = req.body;
  
  try {
    const existingUser = await User.findOne({ where: {email} });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const result = await User.create({
      name,
      email,
      role,
      password:hashPass,
      mobile,
    });
    
    res.status(200).json({ user: result, message: "User created Succesfully" });
  } catch (err) {
    res.status(500).json({ err: err.message, message:"there is an error" });
  }
};

const roleAssignee = async (req,res)=> {
  const {name, email,role, password, mobile,stateLoc,districtLoc,villageLoc} = req.body;

  if(req.userInfo.role === '0'){
    console.log('0', req.userInfo.role)
    try {
      const existingUser = await User.findOne({ where: {email} });
      if (existingUser) {
        return res.status(400).json({ message: "User already exist" });
      }
      const hashPass = await bcrypt.hash(password, 10);
      const result = await User.create({
        name,
        email,
        role,
        password:hashPass,
        mobile,
        stateLoc        
      });      
      res.status(200).json({ user: result, message: "User created Succesfully" });
    } catch (err) {
      res.status(500).json({ err: err.message, message:"there is an error" });
    }

  }else if(req.userInfo.role === '1'){
    console.log('1', req.userInfo.role)
    try {
      const existingUser = await User.findOne({ where: {email} });
      if (existingUser) {
        return res.status(400).json({ message: "User already exist" });
      }
      const hashPass = await bcrypt.hash(password, 10);
      const result = await User.create({
        name,
        email,
        role,
        password:hashPass,
        mobile,
        stateLoc,
        districtLoc
      });
      
      res.status(200).json({ user: result, message: "User created Succesfully" });
    } catch (err) {
      res.status(500).json({ err: err.message, message:"there is an error" });
    }

  }
  else if(req.userInfo.role === '2'){
    console.log('2', req.userInfo.role)
    try {
      const existingUser = await User.findOne({ where: {email} });
      if (existingUser) {
        return res.status(400).json({ message: "User already exist" });
      }
      const hashPass = await bcrypt.hash(password, 10);
      const result = await User.create({
        name,
        email,
        role,
        password:hashPass,
        mobile,
        districtLoc,
        villageLoc
      });
      
      res.status(200).json({ user: result, message: "User created Succesfully" });
    } catch (err) {
      res.status(500).json({ err: err.message, message:"there is an error" });
    }

  }
}

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: existingUser.id, role: existingUser.role, email: existingUser.email }, SECRET_KEY);
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour

    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(existingUser);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ err: err.message });
  }
};


const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res
      .status(401)
      .json({ message: "You can update only your account" });
  }
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await User.update(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const delUser = await User.findByPk(id);
    if (!delUser) {
      return res.send(delUser);
    }
    await delUser.destroy();
    res.status(200).json({ message: "user deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  let filterObj = {
    include: [
      { model: States, attributes: ['name'] },
      { model: District, attributes: ['name']},
      { model: Villages, attributes: ['name'] },
    ],
  }
  try {
    if (req.userInfo.role === '1') {
      filterObj.where = {
        districtLoc : {
          [Op.ne]:null,
          
        },
        villageLoc : null
      }
      
    }
    else if (req.userInfo.role === '2') {
      filterObj.where = {
        villageLoc : {
          [Op.ne]:null,
        }
      }
      
    }
    const allUsers = await User.findAll(filterObj);
   return res.status(200).json({ users: allUsers });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { signInUser, signUpUser, updateUser, deleteUser,roleAssignee,getAllUsers };
