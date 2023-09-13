const mongoose = require('mongoose');

class agentController {
    async agentLogin(req,res) {
        try{
            const {email, password} = req.body;
            const agentData = await mongoose.Collection('allagentregisterdata').findOne({email: email});
            console.log(agentData)
            if(agentData.password === password){
                return res.status(200).json({results:true});
            }else {
                return res.status(400).json({results:false});
            }
            
        }catch(error){
            console.log('Error@findingagentDetails', error);
            return res.status(400).json({message: error.message});
        }
    }

    
}