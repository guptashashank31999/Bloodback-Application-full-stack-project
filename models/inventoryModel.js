const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "inventory type require"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is required"],
      enum: ["O", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    donarEmail: {
      type: String,
      required: [true, "Donar Email is Required"],
    },
    quantity: {
      type: Number,
      required: [true, "Blood quantity is required"],
    },
    orginisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "orginisation is require"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
       // return false;
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      // required: function () {
      //  return this.inventoryType === "in";
      //  return false;
      // },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
