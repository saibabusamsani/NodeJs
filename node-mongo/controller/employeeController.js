const Employee = require("../models/Employee");

const createEmployee=async(req,resp)=>{
    try{
        const {id,name,salary}=req.body;
    const employee=new Employee({
            id,
            name,
            salary
        })

        await employee.save()
        resp.status(201).json(employee);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"server errory"})
    }
}


const getEmployees = async(req,resp)=>{

    try{
        const employess=await Employee.find();
     
        resp.status(200).json(employess);

    }
    catch(error){
        resp.status(500).json({message:"Server error"})
    }
}

const singleEmployee= async(req,res)=>{
    try{
        const employee=await Employee.findById(req.params.id);

        if(!employee)
        {
            return res.status(404).json({message:"employee not found"})
        }

        res.status(200).json(employee)
    }
    catch(error)
    {
        res.status(500).json({message:"server error"})
    }
}


const updateEmployee= async(req,res)=>{
    try{
        const {id,name,salary}=req.body;
        const employee=await Employee.findByIdAndUpdate(req.params.id,{id,name,salary});
        if(!employee)
        {
            return res.status(404).json({message:"employee not found"})
        }

        res.status(200).json(employee)
    }
    catch(error)
    {
        res.status(500).json({message:"server error"})
    }
        
        
    
}

const deleteEmployee= async(req,res)=>{
    try{
        const employee=await Employee.findByIdAndDelete(req.params.id);

        if(!employee)
            {
                return res.status(404).json({message:"employee not found"})
            }
    
            res.status(200).send();
        }
        catch(error)
        {
            res.status(500).json({message:"server error"})
        }
}

module.exports={createEmployee,getEmployees,singleEmployee,updateEmployee,deleteEmployee}