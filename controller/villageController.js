const Village = require("../models/villages");
const District = require('../models/districts')
const State = require('../models/states')

const createVillage = async (req, res) => {
  const { name, districtId } = req.body;
  if (req.userInfo.role === "2") {
    try {
      const createVill = await Village.create({ name, districtId });
      res.status(201).json({ Village: createVill, message: "Village created" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  } else {
    res.status(401).json({ message: "unauthorised role" });
  }
};

const getVillages = async (req, res) => {
  if (req.userInfo.role === "2") {
    try {
      const villages = await Village.findAll({
        include: [
          {
            model: District,
            attributes: ['name'],
            include: [
              {
                model: State,
                attributes: ['name'],
              },
            ],
           
          },
        ],
      });

      const obj = villages.map((item,i)=> {
        return {
          id: item.id,
          name: item.name,
          district: item.District ? item.District.name : null,
          state:   item.District.state ? item.District.state.name : null,
        }
      })

      res.status(201).json({ Villages: obj, message: "Villages retrieved" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  } else {
    res.status(401).json({ message: "Unauthorized role" });
  }
};
const getVillage = async (req, res) => {
  const { id } = req.params;
  Village.addScope('checkById',{
    where:{
      id:id
    }
  })

  Village.addScope('districtName',{
    include:[
      {
        model:District,
        attributes:['name']
      }
    ]
  })


  if (req.userInfo.role === "2") {
    try {
      const village = await Village.scope(['checkById', 'districtName']).findOne({});
      res.status(201).json({ Village: village, message: "Village retrived" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  } else {
    res.status(401).json({ message: "unauthorised role" });
  }
};

const deleteVillage = async (req, res) => {
  const { id } = req.params;
  if (req.userInfo.role === "2") {
    try {
      const village = await Village.destroy({
        where: {
          id: id,
        },
      });
      res.status(201).json({ Village: village, message: "Village deleted" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  } else {
    res.status(401).json({ message: "unauthorised role" });
  }
};

const updateVillage = async (req, res) => {
  const { id } = req.params;
  if (req.userInfo.role === "2") {
    try {
      const village = await Village.update(req.body, {
        where: {
          id: id,
        },
      });
      res.status(201).json({ Village: village, message: "Village updated" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  } else {
    res.status(401).json({ message: "unauthorised role" });
  }
};
module.exports = {
  createVillage,
  deleteVillage,
  getVillage,
  getVillages,
  updateVillage,
};
