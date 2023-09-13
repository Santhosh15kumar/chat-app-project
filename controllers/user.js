const userModel = require('../model/user.js');
const objectID = require('mongodb').ObjectId;


class userController {
    async create(req, res) {
      try {
        const {username, email, phNo, almsgdata} = req.body;
        const userAgent = req.headers['user-agent'];
        const clientIp = req.ips[0] || req.connection.remoteAddress;
        const browserInfo = parseUserAgent(userAgent);

        function parseUserAgent(userAgent) {
            const match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            const browserName = match[1];
            const version = match[2];
            return {
              name: browserName,
              version: version
            };
          }
        
        const user = new userModel({
            username: username,
            email: email,
            phNo: phNo,
            almsgdata: almsgdata,
            clientIp: clientIp,
            browserInfo: browserInfo
            
        });
        await user.save();
        console.log(user);
        return res.status(200).json({message: "User created successfully", success: true, data: user, });

      }
     catch(error){
        console.log("Error@createUser", error);
        return res.status(500).json({message: "Something went wrong please try again later", success: true});
    }
  };

  async getUserById(req,res) {
    try{
      const { id } = req.body;
      const objectId = new objectID(`${id}`);
      const myData = await userModel.findOne({_id:objectId});
      console.log(myData);
      return res.status(200).json(myData);
    }catch(error) {
      console.log('Error@getUserId', error);
      return res.status(400).json({message: error.message});
    }
  };

  async updateUserDetails(req,res) {
    try{
      const { clientarray } = req.body;
      const id = req.params.email;
      const objectId = new objectID(`${id}`);
      const myData = await userModel.updateOne({_id:objectId}, {$set:{allMessageData:clientarray}});
      console.log(myData);
      return res.status(200).json({message: "User updated Successfully", data:myData});
    }catch(error) {
      console.log('Error@updateUser', error);
      return res.status(400).json({message: error.message});
    }
  };

}