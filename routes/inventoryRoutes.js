const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createInventory, getInventoryController } = require("../controllers/inventoryController");

const router = express.Router();

//route
//ADD INVENTORY || POST
router.post("/create-inventory", authMiddleware, createInventory);

//GET ALL BLOOD RECORD
router.get("/get-inventory", authMiddleware, getInventoryController)

module.exports = router;
