const expressAsyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const User = require("../model/User");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    console.log("token", token);
    try {
      if (token) {
        const decodedUser = jwt.verify(token, process.env.JWT_KEY);
        // find the user with the token
        const user = await User.findById(decodedUser?.id);
        console.log(user);
        // attach the user to the request object
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired");
    }
  } else {
    throw new Error("There is no token attached");
  }
});

module.exports = authMiddleware;
