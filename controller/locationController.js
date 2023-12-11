const LocationAssignment = require("../models/locationAssignment");

const assignLocation = async (req, res) => {
  const {name,email, role,password,mobile, districtId, villageId } = req.body;
console.log(req.userInfo.role)
  try {    
    const assignment = await LocationAssignment.create({      
      name,
      email,
      role,
      password,
      mobile,
      districtId: req.userInfo.role === '1' ? districtId : null,
      villageId: req.userInfo.role === '2' ? villageId : null,
    });

    res.status(201).json({ LocationAssignment: assignment, message: "Location assigned" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = assignLocation;
