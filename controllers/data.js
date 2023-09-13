const ObjectID = require('mongodb').ObjectId;
const userModel = require('../model/userModel.js');

class dataController {
    async getUserData(req,res){
        try{
          const data = req.body.id 
          console.log(data)  
          const objectId = new ObjectID(`${data}`);
          const mydata = await userModel.findOne({_id:objectId});
          console.log(mydata);
          return res.status(200).send(mydata);
        }catch(err) {
            console.log('Error@getUserData', err);
            return res.status(400).json({ message: "Something went wrong please try again later"});
        }
    }

    async online(req,res){
        try{
            console.log(req.body.responsedataid.responseid)
            const onlineStatus = req.body.responsedataid.online
            console.log(onlineStatus);
            const objectId = new ObjectID(`${req.body.responsedataid.responseid}`);
            const mydata = await userModel.updateOne({_id:objectId}, {$set: {onlineStatus:onlineStatus}});
            console.log(mydata);
            return res.status(200).send(mydata)
        }catch(err) {
            console.log('Error@getOnlineStatus', err);
            return res.status(400).json({message: err.message});
        }
    }

}