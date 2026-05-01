import { useContext } from "react"
import {getAllInterviewReports,generateInterviewReport,getInterviewReportById,genrateNewResumeByAi} from "../services/interview.api"
import { InterviewContext } from "../Interview.context"

export const useInterview = ()=>{

    const context = useContext(InterviewContext);

    if(!context)
    {
        throw new Error ("useInterview msut be use in interview Provider")
    }

    const {loading,setLoading,report,setReport,reports,setReports } = context;
    
    const genrateReport = async ({jobDescription,selfDescription,resumeFile})=>{
        setLoading(true)

        let res = null
        try {
            res = await generateInterviewReport({jobDescription,selfDescription,resumeFile})
            setReport(res.interviewReport)
            return res.interviewReport
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
        return res.interviewReport
    }

    const getReportById = async (interviewId) =>{
        setLoading(true)
        let res = null
        try{
             res = await getInterviewReportById(interviewId)
            setReport(res.interviewReport)
        }catch(err)
        {
            console.log(err);
            
        }finally{
            setLoading(false)
        }
        return res.interviewReport  
    }

    const getAllReports = async () =>{
        setLoading(true)
        let res = null
        try {
             res = await getAllInterviewReports()
            setReports(res.interviewReport)
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
        return res.interviewReports
    }

    const getResume = async (interviewReportId) =>{
        setLoading(true)
        let res = null
        try {
             res = await genrateNewResumeByAi({interviewReportId}) 
             const url = window.URL.createObjectURL(new Blob([res],{type:"application/pdf"}));
             const link = document.createElement("a");
             link.href = url;
             link.setAttribute("download",`resume_${interviewReportId}.pdf`);
             document.body.appendChild(link);
             link.click(); 
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
        return res
    }

    return{
        loading,
        report,
        reports,
        genrateReport,
        getReportById,
        getAllReports,
        getResume
    }
}