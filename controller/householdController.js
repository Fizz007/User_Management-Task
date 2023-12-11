const Form = require("../models/household");

const createForm = async(req,res)=> {
    const {name,children, villageId} = req.body;
    console.log("role", req.userInfo)
    if(req.userInfo.role === '3'){
        try{
            const newForm = await Form.create({
                name,
                children,
                villageId
            })
            res.status(201).json({Form: newForm, message:'form created'})
        }catch(err){
            res.status(500).json({ err: err.message });
        }
    }else{
        res.status(401).json({ message: "unauthorised role" });
    }
}

module.exports = createForm;