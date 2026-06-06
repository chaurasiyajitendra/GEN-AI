import axios from "axios"

const api = axios.create({
    baseURL: "https://gen-backend-sepia.vercel.app",
    withCredentials:true
})

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile}) =>{

    const formData = new FormData()
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    formData.append("resume",resumeFile)

    const response = await api.post("/api/inter/",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    });
    
    return response.data
}

export const getInterviewReportById = async (interviewId) =>{
    const res = await api.get(`/api/inter/report/${interviewId}`)

    return res.data
}

export const getAllInterviewReports = async () =>{
    const res = await api.get("/api/inter");

    return res.data
}

export const genrateNewResumeByAi = async ({interviewReportId}) =>{

    const response = await api.post(`/api/inter/resume/pdf/${interviewReportId}`,null,{
        responseType:"blob"
    });

    return response.data
}