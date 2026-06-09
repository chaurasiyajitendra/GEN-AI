const  { GoogleGenAI } = require("@google/genai");
const {z, json} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");
const puppeteer = require("puppeteer");


const interviewReportSchema = z.object({
    title: z.string().describe("The job role title, e.g., Junior React Developer"),
    
    matchScore: z.number().int().min(0).max(100).describe("Integer score 0-100 based on resume and JD alignment"),
    
    technicalQuestions: z.array(z.object({
        question: z.string().describe("Specific technical question based on candidate's tech stack"),
        intention: z.string().describe("Why the interviewer is asking this (e.g., to check deep understanding of Hooks)"),
        answer: z.string().describe("Ideal answer with key technical points to cover")
    })).describe("List of relevant technical interview questions"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("Situation-based or soft-skill question"),
        intention: z.string().describe("To assess culture fit, problem solving, or leadership"),
        answer: z.string().describe("How to structure the response using STAR method")
    })).describe("List of behavioral/HR questions"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("Missing or weak skill found in candidate's profile"),
        severity: z.enum(["low", "medium", "high"]).describe("Importance of this gap for the specific role")
    })).describe("Analysis of what the candidate is lacking"),

    preparationPlan: z.array(z.object({
        day: z.number().int().describe("Day number (1, 2, 3...)"),
        focus: z.string().describe("Main topic for the day"),
        tasks: z.array(z.string()).describe("Specific actionable tasks like 'Solve 5 LeetCode problems on Arrays'")
    })).describe("A structured day-wise study roadmap")
});

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEN_API_KEY
});



async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `
You are a Senior Technical Recruiter.

Your task is to analyze the candidate data and generate a structured Interview Report.

-----------------------------
CANDIDATE DATA:
Resume: ${JSON.stringify(resume)}
Self Introduction: ${JSON.stringify(selfDescription)}
Job Description: ${JSON.stringify(jobDescription)}
-----------------------------

STRICT RULES (VERY IMPORTANT):

1. Return ONLY valid JSON. No explanation, no extra text, no markdown.

2. Follow this EXACT structure:

{
  "title": string,
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": string[]
    }
  ]
}

3. DO NOT:
- Change key names
- Add extra fields
- Skip any field
- Return text outside JSON

4. Ensure:
- matchScore is between 0-100
- Minimum 10 items in each array
- preparationPlan must be day-wise (Day 1, Day 2,to Day 7 etc.)

5. Language: Professional hinglish

GENERATE THE RESPONSE NOW.
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })
    
    return JSON.parse(response.text)
}


async function genratePdfFromHtml(htmlContent) {
    let browser = null;
    try {
        browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process'
            ],
            headless: true,
            // 🌟 Render ko batayega ki agar cache dir defined hai toh wahan se auto-pick kare
            cacheDirectory: '/opt/render/.cache/puppeteer'
        });

        const page = await browser.newPage();
        await page.setContent(htmlContent, { 
            waitUntil: "networkidle0",
            timeout: 30000 
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "20mm", bottom: "20mm", left: "10mm", right: "10mm" }
        });

        return pdfBuffer;

    } catch (error) {
        console.error("Error in Puppeteer PDF generation:", error);
        throw error;
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
}

async function genrateResumePdf({resume,selfDescription,jobDescription}) {

  const resumePdfSchema = z.object({
          html: z.string().describe("The HTML content of the CV which can be converted to PDF using any library like puppeteer")
      })

  const prompt = `Generate CV for a candidate with the following details:
                      Resume: ${resume}
                      Self Description: ${selfDescription}
                      Job Description: ${jobDescription}

                      the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                      The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                      The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                      you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                      The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                      The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                      IMPORTANT:
                      - Return ONLY raw HTML
                      - Do NOT return JSON
                      - Do NOT use markdown or \`\`\`
                      - HTML should be complete (<html>, <head>, <body>)
                  `

  const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      generationConfig: {
          responseMimeType: "application/json",
          responseSchema: zodToJsonSchema(resumePdfSchema),
      }
  })

  let jsonContenct = response.text

  jsonContenct = jsonContenct.replace(/```html|```/g, "").trim();

  const pdfBuffer = await genratePdfFromHtml(jsonContenct)

  return pdfBuffer 
}


module.exports = {generateInterviewReport,genrateResumePdf}