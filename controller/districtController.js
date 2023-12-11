const District = require("../models/districts");
const State = require('../models/states')

const createDistrict = async (req, res) => {
    const { name, stateId } = req.body;
    if(req.userInfo.role == '0' || req.userInfo.role == '1'){
        try{
            const createDist = await District.create({ name, stateId });
            res.status(201).json({District: createDist, message:'District created'})
        }catch(err){
            res.status(500).json({ err: err.message });
        }
    }else{
        res.status(401).json({ message: "unauthorised role" });
    }
};

const getDistricts = async(req,res)=> {
    if(req.userInfo.role === '0' || req.userInfo.role == '1'){
      try {
        const district = await District.findAll({
          include:[
            {
              model:State,
              attributes:['name']
            }
          ]
        });

        const obj = district.map((item,i)=> {
          return {
            id: item.id,
            name: item.name,
            state: item.state ? item.state.name : null,
          }
        })
        res.status(201).json({ District: obj, message: "District retrived" });
      } catch (err) {
        res.status(500).json({ err: err.message });
      }
    }else{
      res.status(401).json({ message: "unauthorised role" });
    }
  }
  
  const getDistrict = async(req,res)=> {
    const {id} = req.params
    if(req.userInfo.role === '0' || req.userInfo.role == '1'){
      try {
        const district = await District.findOne({
          where:{
            id:id
          }
        });
        const getData = await district.getState();    //Lazy loading
        res.status(201).json({ District: district,State:getData, message: "District retrived" });
      } catch (err) {
        res.status(500).json({ err: err.message });
      }
    }else{
      res.status(401).json({ message: "unauthorised role" });
    }
  }
  
  const deleteDistrict = async(req,res)=> {
    const {id} = req.params
    if(req.userInfo.role === '0' || req.userInfo.role == '1'){
      try {
        const district = await District.destroy({
          where:{
            id:id
          }
        });
        res.status(201).json({ District: district, message: "District deleted" });
      } catch (err) {
        res.status(500).json({ err: err.message });
      }
    }else{
      res.status(401).json({ message: "unauthorised role" });
    }
  }
  
  const updateDistrict = async(req,res)=> {
    const {id} = req.params
    if(req.userInfo.role === '0' || req.userInfo.role == '1'){
      try {
        const district = await District.update(req.body,{
          where:{
            id:id
          }
        });
        res.status(201).json({ District: district, message: "District updated" });
      } catch (err) {
        res.status(500).json({ err: err.message });
      }
    }else{
      res.status(401).json({ message: "unauthorised role" });
    }
  }

module.exports = {createDistrict,deleteDistrict,getDistrict,getDistricts,updateDistrict}
