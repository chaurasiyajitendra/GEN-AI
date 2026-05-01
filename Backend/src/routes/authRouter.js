const {Router} = require("express");
const authRoute = Router();
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");


/**
 * @router POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRoute.post("/register",authController.registerUser);

/**
 * @router POST /api/auth/login
 * @description login a existing user
 * @access Public
 */
authRoute.post("/login",authController.loginUser);

/**
 * @router GET /api/auth/login
 * @description logout a existing user and black List the token
 * @access Public
 */
authRoute.get("/logout",authController.logoutUser);

/**
 * @router GET /api/auth/profile
 * @description Get user data
 * @access Privet
 */
authRoute.get("/profile",authMiddleware.authUser,authController.profileUser)

/**
 * @router POST /api/auth/edit
 * @description upadte user profile 
 * @access Privet
 */
authRoute.post("/edit",authMiddleware.authUser,authController.updateUser)

/**
 * @router POST /api/auth/changepass
 * @description change user password
 * @access Privet
 */
authRoute.post("/changepass",authMiddleware.authUser,authController.changePassword);

module.exports = authRoute;