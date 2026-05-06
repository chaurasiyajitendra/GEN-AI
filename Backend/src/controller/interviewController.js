const pdfParse = require("pdf-parse")
const {generateInterviewReport,genrateResumePdf} =  require("../services/aiServices");
const interviewReportModel = require("../models/resume");
const userModel = require("../models/userModels");
const emailServices = require("../services/email");


async function genrateInterviweReportController(req,res) {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const {selfDescription,jobDescription} = req.body;

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    
    const interviewReoprt = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    });

    res.status(201).json({
        message:"Interview report genrate successfully .",
        interviewReoprt
    })
}

async function getInterviewByIdcontroller(req,res) {

    const {interviewId} =  req.params

    const interviewReport = await interviewReportModel.findOne({_id:interviewId,user:req.user.id})

    if(!interviewReport)
    {
        return res.status(404).json({
            message:"Interview report not found "
        })
    }

    res.status(201).json({
        message:"Interview Repost finde succesfully !!",
        interviewReport
    })

}

async function getAllInterview(req,res) {
    const interviewReports = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan -__v -updatedAt")

    res.status(201).json({
        message:"All interview report find successfully !!",
        interviewReports
    })
}

async function genrateResumePdfController(req,res) {
    
    const user = await userModel.findById(req.user.id);
    const {interviewReportId} = req.params
    const interviewReport = await interviewReportModel.findById(interviewReportId);

    if(!interviewReport)
    {
        return res.status(400).json({
            message:"Interview Report not found"
        })
    }

    const { resume,jobDescription,selfDescription} = interviewReport

    const pdfBuffer = await genrateResumePdf({resume,selfDescription,jobDescription})

    user.credit -= 100;
    await user.save() 

    await emailServices.sendResumeGeneratedEmail(user.email,user.name,pdfBuffer,interviewReportId)

    res.set({
        "Content-Type":"application/pdf",
        "Content-Disposition":`attachmet; filename=resume_${interviewReportId}.pdf`
    })


    res.send(pdfBuffer)
}

module.exports = {
    genrateInterviweReportController,
    getInterviewByIdcontroller,
    getAllInterview,
    genrateResumePdfController
}