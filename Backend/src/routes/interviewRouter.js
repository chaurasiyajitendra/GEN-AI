const {Router} = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const interviwRouter = Router()
const upload = require("../middleware/fileUploadMiddleware");
const interviewController = require("../controller/interviewController");


/**
 * @route POST /api/inter
 * @description generate new interview report on the basic of user self description, resume pdf and job description
 * @access private
 */
interviwRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.genrateInterviweReportController);

/**
 * @route GET/api/inter/report/:interviewId
 * @description get interview report by interview ID.
 * @access private
 */
interviwRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewByIdcontroller);


/**
 * @route GET /api/inter
 * @description get all interview reports of logged in user.
 * @access private
 */
interviwRouter.get("/",authMiddleware.authUser,interviewController.getAllInterview);

/**
 * @route GET /api/inter/resume/pdf/:interviewReportId
 * @description download resume pdf of interview report by interview report ID.
 * @access private
 */
interviwRouter.post("/resume/pdf/:interviewReportId",authMiddleware.authUser,interviewController.genrateResumePdfController); 




module.exports =  interviwRouter 