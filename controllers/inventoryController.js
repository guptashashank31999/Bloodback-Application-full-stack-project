const mongoose  = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventory = async (req, res) => {
  console.log("line 5 create inventory", req.body);
  try {
    const { email, inventoryType } = req.body;
    const user = await userModel.findOne({ email });

    console.log('user line 10',user)
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User Not found",
      });
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if(req.body.inventoryType == 'out'){
      const requestedBloodGroup = req.body.bloodGroup
      const requestedQuantityOfBlood = req.body.quantity
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      //Calculate blood quntity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {$match : {
          organisation ,
          inventoryType : 'in',
          bloodGroup : requestedBloodGroup
        }},{
          $group : { 
            _id : '$bloodGroup',
            total : {$sum : '$quantity'}
          }
        }
      ])

     // console.log('total In', totalInOfRequestedBlood)
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //Calaulate out blood cont
      const totalOutOfRequestedBlood = await inventoryModel.aggregate([
        {$match:{
          organisation,
          inventoryType : 'out',
          bloodGroup: requestedBloodGroup
        }},
        {
          $group : {
            _id : '$bloodGroup',
            total : {$sum : '$quantity'}
          }
        }
      ])

      const totalOut = totalOutOfRequestedBlood[0]?.total || 0;
      console.log('total In', totalOutOfRequestedBlood)

      //in and out calc
      const availableQuantityOfbloodGroup = totalIn - totalOut;

      //Quantity Validation

      if(availableQuantityOfbloodGroup < requestedQuantityOfBlood){
        return res.status(500).send({
          success : false,
          message : `only ${availableQuantityOfbloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available `
        })
      }

      req.body.hospital = user?._id;
    }
    //Save Record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood record added",
    });
  } catch (error) {
    console.log("line 29",error);
    return res.status(500).send({
      success: false,
      message: "Error in create inventory api",
      error,
    });
  }
};

//GET ALL BLOOD RECORD
const getInventoryController = async (req, res) => {
  try {
    
    let inventory = await inventoryModel.find({orginisation : req.body.userId}).populate('donar').populate('hospital').sort({createdAt: -1});
    return res.status(200).send({
        success : true,
        message: "Get all records successfully",
        inventory
    })
  } catch (error) {
    console.log("line 49",error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all blood records",
      error
    })
  }
}

module.exports = { createInventory , getInventoryController};
