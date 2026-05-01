# 🎨 UI Components - Quick Reference Guide

## Common Copy-Paste Patterns

### 📌 Premium Button
```jsx
<button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105">
  Click Me
</button>
```

### 📌 Secondary Button
```jsx
<button className="px-8 py-3 border-2 border-cyan-500 text-cyan-300 font-bold rounded-lg hover:bg-cyan-500/10 transition-all">
  Secondary
</button>
```

### 📌 Glass Card
```jsx
<div className="bg-blue-900/20 backdrop-blur-md border border-blue-700/50 rounded-xl p-6 hover:border-cyan-500/80 transition-all">
  {/* Content */}
</div>
```

### 📌 Dark Gradient Card
```jsx
<div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-6">
  {/* Content */}
</div>
```

### 📌 Gradient Text
```jsx
<h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
  Gradient Text
</h1>
```

### 📌 Glow Badge
```jsx
<span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-bold text-white">
  Premium
</span>
```

### 📌 Score Circle - Excellent (90+)
```jsx
<div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center font-bold text-white text-xl shadow-lg">
  92
</div>
```

### 📌 Score Circle - Very Good (80-89)
```jsx
<div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center font-bold text-white text-xl shadow-lg">
  85
</div>
```

### 📌 Score Circle - Good (70-79)
```jsx
<div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-white text-xl shadow-lg">
  75
</div>
```

### 📌 Score Circle - Needs Improvement (<70)
```jsx
<div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center font-bold text-white text-xl shadow-lg">
  65
</div>
```

### 📌 Stat Box
```jsx
<div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 text-center">
  <p className="text-blue-400 text-sm font-medium">Interviews</p>
  <p className="text-2xl font-bold text-white">24</p>
</div>
```

### 📌 Achievement Badge (Unlocked)
```jsx
<div className="p-3 rounded-lg text-center bg-yellow-900/30 border border-yellow-700/50 cursor-pointer hover:shadow-lg hover:shadow-yellow-500/20 transition-all">
  <p className="text-2xl">🎯</p>
  <p className="text-xs text-blue-200 mt-1">First Interview</p>
</div>
```

### 📌 Achievement Badge (Locked)
```jsx
<div className="p-3 rounded-lg text-center bg-slate-800/30 border border-slate-700/30 opacity-50">
  <p className="text-2xl">🤖</p>
  <p className="text-xs text-blue-200 mt-1">AI Champion</p>
</div>
```

### 📌 Text with Icon
```jsx
<div className="flex items-center gap-3">
  <MdOutlineAI className="text-4xl text-cyan-400" />
  <div>
    <h3 className="text-white font-bold text-lg">Title</h3>
    <p className="text-blue-300">Description</p>
  </div>
</div>
```

### 📌 Hover Effect Card
```jsx
<div className="group relative bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-700/50 rounded-xl p-8 hover:border-cyan-500/80 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
  <div className="text-cyan-400 group-hover:scale-110 transition-transform">
    {/* Icon */}
  </div>
  {/* Content */}
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 rounded-xl transition-all"></div>
</div>
```

### 📌 Input Field
```jsx
<input
  type="text"
  placeholder="Enter text..."
  className="w-full px-4 py-3 bg-blue-900/20 border border-blue-700/50 rounded-lg text-white placeholder-blue-400/50 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
/>
```

### 📌 Tab Navigation
```jsx
<button
  onClick={() => setActiveTab('dashboard')}
  className={`px-4 py-2 rounded-lg font-medium transition-all ${
    activeTab === 'dashboard'
      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
      : 'text-blue-200 hover:text-blue-100 hover:bg-blue-900/30'
  }`}
>
  Dashboard
</button>
```

### 📌 User Avatar
```jsx
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-blue-500/50 transition-all">
  <span className="text-white font-bold">JD</span>
</div>
```

### 📌 Progress Bar
```jsx
<div className="w-full bg-blue-900/30 rounded-full h-2">
  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '75%'}}></div>
</div>
```

### 📌 Notification Toast
```jsx
<div className="fixed top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-lg shadow-lg shadow-emerald-500/50 flex items-center gap-3 z-50">
  <span>✓</span>
  <span>Success message here</span>
</div>
```

### 📌 Loading Spinner
```jsx
<div className="flex items-center justify-center p-4">
  <div className="animate-spin">
    <AiOutlineLoading3Quarters className="text-4xl text-cyan-400" />
  </div>
</div>
```

### 📌 Grid Layout (3 Columns)
```jsx
<div className="grid md:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

### 📌 Grid Layout (4 Columns)
```jsx
<div className="grid md:grid-cols-4 gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
</div>
```

### 📌 Flex Layout (Horizontal)
```jsx
<div className="flex items-center justify-between gap-4">
  <div>Left</div>
  <div>Right</div>
</div>
```

### 📌 Flex Layout (Vertical)
```jsx
<div className="flex flex-col gap-4">
  <div>Top</div>
  <div>Bottom</div>
</div>
```

### 📌 Sticky Header
```jsx
<header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-blue-900/30">
  {/* Header content */}
</header>
```

### 📌 Hero Section
```jsx
<section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 border border-blue-700/50 p-12">
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
  </div>
  <div className="relative z-10">
    {/* Content */}
  </div>
</section>
```

### 📌 Empty State
```jsx
<div className="text-center py-12">
  <MdOutlineAI className="text-6xl text-blue-400 mx-auto mb-4 opacity-50" />
  <h3 className="text-xl font-bold text-white mb-2">No Data Found</h3>
  <p className="text-blue-300">Start by creating your first interview</p>
</div>
```

### 📌 Modal/Dialog Background
```jsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-gradient-to-br from-slate-900 to-blue-900 border border-blue-700/50 rounded-xl p-8 max-w-md w-full mx-4">
    {/* Modal content */}
  </div>
</div>
```

### 📌 Divider Line
```jsx
<div className="h-px bg-gradient-to-r from-blue-700/0 via-blue-700/50 to-blue-700/0"></div>
```

### 📌 Badge Success
```jsx
<span className="inline-block px-3 py-1 bg-emerald-900/30 border border-emerald-700/50 rounded-full text-xs font-bold text-emerald-300">
  Completed
</span>
```

### 📌 Badge Warning
```jsx
<span className="inline-block px-3 py-1 bg-yellow-900/30 border border-yellow-700/50 rounded-full text-xs font-bold text-yellow-300">
  In Progress
</span>
```

### 📌 Badge Error
```jsx
<span className="inline-block px-3 py-1 bg-red-900/30 border border-red-700/50 rounded-full text-xs font-bold text-red-300">
  Failed
</span>
```

---

## 🎨 Color Palette Quick Reference

### Primary Colors
```
Blue Primary:     #0ea5e9 (Cyan 500)
Blue Secondary:   #3b82f6 (Blue 500)
Dark Background:  #0f172a (Slate 950)
```

### Accent Colors
```
Purple:    #9333ea
Pink:      #ec4899
Green:     #10b981
Yellow:    #f59e0b
Red:       #ef4444
```

### Opacity Variations
```
/10   (10%)
/20   (20%)
/30   (30%)
/50   (50%)
/75   (75%)
/90   (90%)
```

### Example Usage
```jsx
bg-blue-500          // Full color
bg-blue-500/50       // 50% opacity
bg-blue-900/30       // Dark blue, 30% opacity
hover:bg-blue-500    // On hover
```

---

## 📱 Responsive Classes

### Hidden/Shown by Breakpoint
```jsx
hidden              // Always hidden
sm:hidden           // Hidden on small screens
md:hidden           // Hidden on medium screens
lg:block            // Show on large screens
```

### Column Adjustments
```jsx
grid-cols-1         // 1 column (mobile)
md:grid-cols-2      // 2 columns (tablet)
lg:grid-cols-3      // 3 columns (desktop)
xl:grid-cols-4      // 4 columns (extra large)
```

---

## ⚡ Common Hover Effects

### Hover Scale
```jsx
hover:scale-105     // Scale up 5%
hover:scale-110     // Scale up 10%
transition-all      // Smooth animation
```

### Hover Shadow
```jsx
hover:shadow-lg                    // Large shadow
hover:shadow-blue-500/50          // Shadow with blue color
hover:shadow-lg hover:shadow-cyan-500/50  // Combined
```

### Hover Color
```jsx
hover:bg-blue-900/30   // Change background
hover:text-cyan-300    // Change text color
hover:border-cyan-500  // Change border
```

---

## 🔄 State Management Pattern

### Tab Switching
```jsx
const [activeTab, setActiveTab] = useState('dashboard')

// Button
<button onClick={() => setActiveTab('dashboard')}>Dashboard</button>

// Conditional Render
{activeTab === 'dashboard' && <DashboardContent />}
{activeTab === 'reports' && <ReportsContent />}
```

### Toggle
```jsx
const [showProfile, setShowProfile] = useState(false)

// Button
<button onClick={() => setShowProfile(!showProfile)}>Toggle</button>

// Conditional Display
{showProfile && <ProfileSidebar />}
```

---

## 🎯 Typography Classes

```jsx
text-xs      // Extra small
text-sm      // Small
text-base    // Normal
text-lg      // Large
text-xl      // Extra large
text-2xl     // 2x large
text-3xl     // 3x large
text-4xl     // 4x large
text-5xl     // 5x large

font-light   // 300
font-normal  // 400
font-medium  // 500
font-bold    // 700
```

---

## 📏 Spacing Reference

```jsx
p-1   → 4px padding
p-2   → 8px padding
p-4   → 16px padding
p-6   → 24px padding
p-8   → 32px padding
p-12  → 48px padding

gap-2 → 8px gap
gap-4 → 16px gap
gap-6 → 24px gap
```

---

## ✅ Quick Customization Checklist

- [ ] Change `from-blue-500` to other colors
- [ ] Adjust `p-6` for different padding
- [ ] Modify `w-16` and `h-16` for sizes
- [ ] Change text colors with `text-*`
- [ ] Update rounded corners `rounded-lg`
- [ ] Adjust shadows `shadow-lg`

---

## 🚀 Performance Tips

1. Use `hover:scale-105` instead of custom transforms
2. Prefer `transition-all` for smooth animations
3. Use `backdrop-blur-md` for glass effects
4. Keep shadows reasonable size
5. Use opacity (/50) for subtle effects
6. Memoize frequently re-rendered components

---

## 📞 Import Icons

```jsx
import { 
  MdOutlineAI,
  MdAssignment,
  MdVerifiedUser,
  MdStorefront 
} from 'react-icons/md'

import { 
  FiBriefcase, 
  FiTrendingUp, 
  FiAward, 
  FiSettings, 
  FiLogOut 
} from 'react-icons/fi'

import { 
  BsLightbulb, 
  BsBarChart, 
  BsGear 
} from 'react-icons/bs'

import { 
  AiOutlineLoading3Quarters 
} from 'react-icons/ai'
```

---

**Print this page and keep it handy for quick reference!** 🎨
