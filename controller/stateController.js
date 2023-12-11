const State = require("../models/states");
const Op = require("sequelize").Op

const createState = async (req, res) => {
  const { name } = req.body;
  if(req.userInfo.role === '0'){
    try {
      const state = await State.create({ name });
      res.status(201).json({ State: state, message: "State created" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }else{
    res.status(401).json({ message: "unauthorised role" });
  }
};

const getStates = async(req,res)=> {
  if(req.userInfo.role === '0'){
    try {
      const {count,rows} = await State.findAndCountAll({
        where:{
          id:{
            [Op.gt]: 0
          }
        },
      });
      res.status(201).json({ State: rows,count:count , message: "State retrived" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }else{
    res.status(401).json({ message: "unauthorised role" });
  }
}

const getState = async(req,res)=> {
  const {id} = req.params
  if(req.userInfo.role === '0'){
    try {
      const state = await State.findOne({
        where:{
          id:id
        }
      });
      res.status(201).json({ State: state, message: "State retrived" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }else{
    res.status(401).json({ message: "unauthorised role" });
  }
}

const deleteState = async(req,res)=> {
  const {id} = req.params
  if(req.userInfo.role === '0'){
    try {
      const state = await State.destroy({
        where:{
          id:id
        }
      });
      res.status(201).json({ State: state, message: "State deleted" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }else{
    res.status(401).json({ message: "unauthorised role" });
  }
}

const updateState = async(req,res)=> {
  const {id} = req.params
  if(req.userInfo.role === '0'){
    try {
      const state = await State.update(req.body,{
        where:{
          id:id
        }
      });
      res.status(201).json({ State: state, message: "State updated" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }else{
    res.status(401).json({ message: "unauthorised role" });
  }
}

module.exports = {createState,getStates,getState,deleteState,updateState};
