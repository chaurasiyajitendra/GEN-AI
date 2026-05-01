# 🚀 Quick Start Guide - API Integration

## What's Already Built

### ✅ Complete UI Layout with:
- Professional Dark Blue gradient theme
- Dashboard with Hero section
- Trust-building elements (Enterprise AI, 99.9% Accuracy, 50K+ Users)
- 6 Advanced AI Features showcase
- Profile section with user stats, achievements, and settings
- Reports section with Interview Performance & Resume Analysis
- Responsive design for mobile/tablet/desktop
- Custom Tailwind CSS theme with animations

### 📁 Component Files Created
```
frontend/src/features/ai/
├── Pages/
│   └── Home.jsx ⭐ Main dashboard (fully styled)
├── components/
│   ├── Header.jsx (Navigation)
│   ├── HeroSection.jsx (Hero banner)
│   ├── TrustBadge.jsx (Trust badges)
│   ├── AIFeatureCard.jsx (Feature cards)
│   ├── ReportCard.jsx (Report display)
│   └── ProfileSidebar.jsx (User profile)
```

---

## 📊 Mock Data Structure (Ready for API)

### Current Mock Data in Home.jsx:

```javascript
const userStats = {
  name: 'John Developer',
  email: 'john@example.com',
  interviews: 24,
  reports: 18,
  streak: 12,
  credits: 450,
  tier: 'Premium',
  achievements: [
    { id: 1, name: 'First Interview', icon: '🎯', unlocked: true },
    // ... more achievements
  ]
}

const reports = [
  {
    id: 1,
    type: 'Interview Performance',
    title: 'Full Stack Developer Interview',
    score: 92,
    date: '2024-04-20',
    status: 'Excellent',
    insights: 'Outstanding technical knowledge'
  },
  // ... more reports
]
```

---

## 🔗 Integration Steps

### Step 1: Connect useInterview Hook

Open your `Interview.context.jsx` and create API calls:

```javascript
// In Interview.context.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const InterviewContext = createContext()

export function InterviewProvider({ children }) {
  const [userStats, setUserStats] = useState(null)
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch user stats
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true)
        const response = await axios.get('/api/user/stats')
        setUserStats(response.data)
      } catch (error) {
        console.error('Error fetching user stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserStats()
  }, [])

  // Fetch reports
  const fetchReports = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/reports')
      setReports(response.data)
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <InterviewContext.Provider value={{ userStats, reports, loading, fetchReports }}>
      {children}
    </InterviewContext.Provider>
  )
}

export function useInterview() {
  return useContext(InterviewContext)
}
```

### Step 2: Update Home.jsx to Use Context

```javascript
// Update imports
import { useInterview } from '../Interview.context'

// In Home component, add after useState:
const { userStats: contextUserStats, reports: contextReports } = useInterview()

// Use context data instead of mock:
const userStats = contextUserStats || {
  name: 'John Developer',
  // ... fallback mock data
}

const reports = contextReports.length > 0 ? contextReports : [
  // ... fallback mock data
]
```

### Step 3: Expected API Endpoints

Your backend should provide these endpoints:

```javascript
// GET /api/user/stats - User profile data
{
  name: string,
  email: string,
  interviews: number,
  reports: number,
  streak: number,
  credits: number,
  tier: string,
  achievements: Array
}

// GET /api/reports - All reports
[
  {
    id: number,
    type: string,
    title: string,
    score: number,
    date: string,
    status: string,
    insights: string
  },
  // ... more reports
]

// POST /api/interviews - Start new interview
{
  id: number,
  title: string,
  type: string,
  // ... interview config
}

// POST /api/resumes/upload - Upload resume
{
  id: number,
  filename: string,
  analysis: string,
  score: number
}
```

---

## 🔌 Backend API Setup (Node.js/Express)

### Create These Routes in `authRouter.js`:

```javascript
// GET user profile
router.get('/user/profile', authMiddleware, (req, res) => {
  // Return user stats
})

// GET user achievements
router.get('/user/achievements', authMiddleware, (req, res) => {
  // Return user achievements
})
```

### Create These Routes in `interviewRouter.js`:

```javascript
// GET all reports for user
router.get('/reports', authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id })
    res.json(reports)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET user stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const stats = {
      name: user.name,
      email: user.email,
      interviews: user.interviewCount,
      reports: user.reportCount,
      streak: user.streak,
      credits: user.credits,
      tier: user.tier,
      achievements: user.achievements
    }
    res.json(stats)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST start new interview
router.post('/start-interview', authMiddleware, async (req, res) => {
  const { title, type } = req.body
  try {
    const interview = new Interview({
      userId: req.user.id,
      title,
      type,
      status: 'in-progress',
      startTime: new Date()
    })
    await interview.save()
    res.json(interview)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
```

---

## 🎯 Integration Checklist

### Phase 1: Data Connection
- [ ] Create API endpoints in backend
- [ ] Update Interview.context.jsx with API calls
- [ ] Connect Home.jsx to context
- [ ] Test data fetching

### Phase 2: User Actions
- [ ] Implement "Start Interview" button
- [ ] Implement "Upload Resume" button
- [ ] Implement "View Details" button
- [ ] Add loading states

### Phase 3: Real Features
- [ ] Connect to AI Services (aiServices.js)
- [ ] Implement real interview recording
- [ ] Implement real resume analysis
- [ ] Generate real reports

### Phase 4: Polish
- [ ] Add error handling
- [ ] Add success notifications
- [ ] Add loading skeletons
- [ ] Add animations

---

## 📝 Example: Integrating "Start Interview"

### 1. Update Header Button:

```javascript
// In Header.jsx or Home.jsx
const handleStartInterview = async () => {
  try {
    const response = await axios.post('/api/interviews/start-interview', {
      title: 'Mock Interview',
      type: 'Technical'
    })
    // Navigate to interview page
    navigate(`/interview/${response.data.id}`)
  } catch (error) {
    console.error('Error starting interview:', error)
  }
}

<button onClick={handleStartInterview} className="btn-premium">
  Start Interview
</button>
```

### 2. Create Interview Page:

```javascript
// frontend/src/features/ai/Pages/Interview.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Interview = () => {
  const { id } = useParams()
  const [interview, setInterview] = useState(null)

  useEffect(() => {
    // Fetch interview details
    // Start AI recording
    // Initialize real-time feedback
  }, [id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Interview UI */}
    </div>
  )
}

export default Interview
```

---

## 🎨 Customization Options

### Change Theme Colors:

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        900: '#0c2d6b', // Change dark blue
        500: '#0ea5e9', // Change cyan
      }
    }
  }
}
```

### Modify Layout:

In components, change grid columns:
```javascript
// From 3 columns to 2:
<div className="grid md:grid-cols-2 gap-6">
```

---

## 🚀 Testing the UI

### Test Dashboard:
1. View all sections rendering
2. Check responsive on mobile/tablet
3. Test tab switching (Dashboard ↔ Reports)
4. Test profile sidebar toggle

### Test Reports:
1. Verify score color coding
2. Check report card hover effects
3. Test expanded vs compact view
4. Verify date formatting

### Test Profile:
1. Check user info display
2. Verify achievement badges
3. Test settings buttons
4. Check stats display

---

## 📚 Backend Models Required

### User Model Update:
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  interviewCount: Number,
  reportCount: Number,
  streak: Number,
  credits: Number,
  tier: String, // 'Free', 'Premium', 'Pro'
  achievements: [
    {
      id: Number,
      name: String,
      icon: String,
      unlocked: Boolean
    }
  ]
}
```

### Report Model:
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String, // 'Interview Performance' or 'Resume Analysis'
  title: String,
  score: Number,
  date: Date,
  status: String,
  insights: String,
  details: Object
}
```

---

## 🔄 Workflow

```
1. User Logs In
   ↓
2. Home Page Loads
   ↓
3. Context Fetches User Data
   ↓
4. Home.jsx Displays Data
   ↓
5. User Clicks "Start Interview"
   ↓
6. API Creates Interview Record
   ↓
7. Navigate to Interview Page
   ↓
8. AI Processes Interview
   ↓
9. Generate Report
   ↓
10. Update Reports List
```

---

## ✅ Success Checklist

- [x] UI Layout Complete
- [x] Components Modularized
- [x] Theme Configured
- [x] Responsive Design
- [ ] API Endpoints Created
- [ ] Context Updated with Real Data
- [ ] Error Handling Added
- [ ] Loading States Implemented
- [ ] Real Interview Feature Built
- [ ] Reports Generated
- [ ] Notifications Added
- [ ] Deployment Ready

---

## 📞 Need Help?

1. Check `DESIGN_DOCUMENTATION.md` for component details
2. Check `LAYOUT_STRUCTURE.md` for layout info
3. Refer to `Interview.context.jsx` for context pattern
4. Follow component examples in `Home.jsx`

---

**Status**: UI Complete - Ready for Backend Integration  
**Next**: Connect to real APIs and implement features
