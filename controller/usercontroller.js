const user = require('../model/user');

const createUser = async (req, res) => {
    try {
        const request = req.body
        const newUser = await user.create(request)
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUserById = async(req,res)=>{
    try{
        const id = req.params.id;
        const getUser = await user.findOne().where("_id").equals(id);
        res.status(201).json(getUser);
    }catch(error){
        res.status(404).json({  message: "user Not Found!!" });
    }
} 

const getUsers = async(req,res)=>{
    try{
        const users = await user.find().sort({name : -1}).limit(1)
        res.status(201).json(users)
    }catch(error){
        res.status(400).json({ message: error.message });
    }
};

const updateUsers = async(req,res)=>{
    try{
        const request = req.body;
        const id = req.params.id
        const updateUser = await user.findByIdAndUpdate(id,request);
        res.status(201).json(updateUser) 
    }catch(error){
        res.status(404).json({ message: "user Not Found!!" });
    }
}

const deleteUser = async(req,res)=>{
    try{
        const id = req.params.id
        await user.findByIdAndDelete(id);
        res.status(201).json({message : "user deleted"}) 
    }catch(error){
        res.status(404).json({ message: "user Not Found!!" });
    }

}

const numberOfUser = async(req,res)=>{
    try{
        const totalUsers = await user.countDocuments()
        res.status(201).json(totalUsers)

    }catch(error){
        res.status(400).json({ message: error.message });
    }
}



const getUserWithHighestId = async (req, res) => {
    try {
        const highestIdUser = await user.findOne().sort({ _id: -1 });
        res.status(200).json(highestIdUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserWithLowestId = async (req, res) => {
    try {
        const lowestIdUser = await user.findOne().sort({ _id: 1 });
        res.status(200).json(lowestIdUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createUser,getUserById,getUsers,updateUsers,deleteUser,numberOfUser,getUserWithHighestId,getUserWithLowestId}