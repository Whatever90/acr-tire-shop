var mongoose = require("mongoose");
//

var userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Username is required"] },
    password: { type: String, required: [true, "Password is required"] }
  },
  { timestamps: true }
);

var Tire = mongoose.model("User", userSchema);
