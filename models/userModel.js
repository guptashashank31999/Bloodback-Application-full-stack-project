const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "role is Require"],
      enum: ["admin", "orginisation", "donar", "hospital"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "user" || this.role === "admin") {
          return true;
        }
        return false;
      },
    },
    orginisationName: {
      type: String,
      required: function () {
        if (this.role === "orginisation") {
          return true;
        }
        return false;
      },
    },

    hospitalName: {
      type: String,
      required: function () {
        if (this.role === "hospital") {
          return true;
        }

        return false;
      },
    },

    email: {
      type: String,
      required: [true, "email is require"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Paswword is require"],
    },

    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is reuqire"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
