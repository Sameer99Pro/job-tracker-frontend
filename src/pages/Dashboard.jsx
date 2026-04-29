import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getUserApplications, deleteApplication } from "../services/api"
import toast from "react-hot-toast"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = ["#6366f1", "#facc15", "#22c55e", "#ef4444"]

function Dashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")
  const [deleteId, setDeleteId] = useState(null)
  const [search, setSearch] = useState("")

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const chartData = [
    { name: "Applied", value: applications.filter(a => a.status === "Applied").length },
    { name: "Interview", value: applications.filter(a => a.status === "Interview").length },
    { name: "Offer", value: applications.filter(a => a.status === "Offer").length },
    { name: "Rejected", value: applications.filter(a => a.status === "Rejected").length },
  ].filter(item => item.value > 0)

  useEffect(() => {
    if (!user) { navigate("/login"); return }
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const res = await getUserApplications(user.id)
      setApplications(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const [scrolled, setScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 20)
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  const handleDelete = (id) => setDeleteId(id)

  const confirmDelete = async () => {
    try {
      await deleteApplication(deleteId)
      setApplications(prev => prev.filter(app => app.id !== deleteId))
      toast.success("Deleted!")
      setDeleteId(null)
    } catch {
      toast.error("Delete failed ❌")
    }
  }

  const handleEdit = (app) => {
    navigate(`/edit/${app.id}`)
  }

  const statusColors = {
    Applied: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    Interview: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    Offer: "bg-green-500/20 text-green-400 border border-green-500/30",
    Rejected: "bg-red-500/20 text-red-400 border border-red-500/30",
  }

  const filters = ["All", "Applied", "Interview", "Offer", "Rejected"]

  const filtered = applications.filter(app => {
    const matchesFilter = filter === "All" || app.status === filter
    const matchesSearch =
      app.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      app.jobRole?.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = [
    { label: "Total Applied", value: applications.length, color: "text-indigo-400", bg: "bg-indigo-500/10 border border-indigo-500/20" },
    { label: "Interviews", value: applications.filter(a => a.status === "Interview").length, color: "text-yellow-400", bg: "bg-yellow-500/10 border border-yellow-500/20" },
    { label: "Offers", value: applications.filter(a => a.status === "Offer").length, color: "text-green-400", bg: "bg-green-500/10 border border-green-500/20" },
    { label: "Rejected", value: applications.filter(a => a.status === "Rejected").length, color: "text-red-400", bg: "bg-red-500/10 border border-red-500/20" },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Navbar */}
     <nav className={`border-b border-gray-800 px-4 py-3 sticky top-0 z-50 transition-all duration-300 ${
  scrolled
    ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/20'
    : 'bg-gray-900'
}`}>
  <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">JT</div>
            <h1 className="text-lg font-bold text-white">Job Tracker</h1>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
  <input
    type="text"
    placeholder="Search company or role..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-80 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
  />
</div>

          <div className="flex items-center gap-2">
  <div className="w-8 h-8 bg-indigo-600/30 text-indigo-400 rounded-full flex items-center justify-center font-semibold text-sm border border-indigo-500/30">
    {user?.fullName?.charAt(0).toUpperCase()}
  </div>
  {/* Name sirf desktop pe dikhega */}
  <span className="hidden md:block text-sm text-gray-300">{user?.fullName}</span>
  <button
    onClick={handleLogout}
    className="text-sm bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition"
  >
    Logout
  </button>
</div>
        </div>
        

      </nav>

      {/* Main */}
      <div className="max-w-6xl mx-auto w-full px-4 py-6 flex-1">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-1">Welcome back, {user?.fullName}! 👋</h2>
          <p className="text-indigo-200 text-sm">Track your job applications and stay organized.</p>
        </div>

        {/* Upcoming Interviews */}
{applications.filter(a => a.interviewDate).length > 0 && (
  <div className="bg-gray-900 border border-yellow-500/30 rounded-2xl p-6 mb-8">
    <h2 className="text-lg font-semibold text-yellow-400 mb-4">
      🗓️ Upcoming Interviews
    </h2>
    <div className="flex flex-col gap-3">
      {applications
        .filter(a => a.interviewDate)
        .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate))
        .map(app => (
          <div key={app.id} className="flex justify-between items-center bg-gray-800 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg flex items-center justify-center font-bold text-xs">
                {app.companyName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{app.companyName}</p>
                <p className="text-gray-400 text-xs">{app.jobRole}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-yellow-400 text-sm font-semibold">{app.interviewDate}</p>
              <p className="text-gray-500 text-xs">Interview</p>
            </div>
          </div>
        ))}
    </div>
  </div>
)}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className={`${s.bg} p-5 rounded-xl text-center`}>
              <p className="text-gray-400 text-xs font-medium mb-1">{s.label}</p>
              <h2 className={`text-3xl font-bold ${s.color}`}>{s.value}</h2>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-200">
            Application Status Overview
          </h2>
          {chartData.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No data to show yet</p>
          ) : (
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                    stroke="none"
                    isAnimationActive={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[["Applied", "Interview", "Offer", "Rejected"].indexOf(entry.name)]}
                        style={{ outline: "none" }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }}
                    cursor={false}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-200">My Applications</h2>
          <button
            onClick={() => navigate("/add")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            + Add Application
          </button>
        </div>

        {/* Mobile Search */}
<div className="md:hidden mb-4">
  <input
    type="text"
    placeholder="Search company or role..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
  />
</div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-2xl border border-dashed border-gray-700">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-gray-300 font-medium">No applications found</p>
            <p className="text-gray-500 text-sm mt-1">Click "+ Add Application" to get started</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((app, index) => (
  <div
    key={app.id}
    style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
    className="animate-fadeInUp bg-gray-900 border border-gray-800 rounded-xl p-5 flex justify-between items-center hover:border-gray-600 transition"
  >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-lg flex items-center justify-center font-bold text-sm">
                    {app.companyName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{app.companyName}</h3>
                    <p className="text-gray-400 text-sm">{app.jobRole} • {app.location}</p>
  <p className="text-gray-600 text-xs mt-0.5">{app.appliedDate} • {app.jobPortal}</p>

  {app.resumeLink && (
    <a
      href={app.resumeLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-400 text-xs hover:underline mt-0.5 inline-block"
    >
      📄 View Resume
    </a>
  )}
</div>
                </div>
                <div className="flex gap-3 items-center">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                  <button onClick={() => handleEdit(app)} className="text-sm text-indigo-400 hover:text-indigo-300">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(app.id)} className="text-sm text-red-400 hover:text-red-300">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
<footer className="mt-16">
  {/* Top gradient line */}
  <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>

  <div className="bg-gray-900 px-6 py-10">
    <div className="max-w-6xl mx-auto">

      {/* Main footer content */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Left — Branding */}
        <div className="text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-500/30">
              JT
            </div>
            <span className="text-white font-bold text-xl">Job Tracker</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs">
            Your personal job search companion — stay organized, stay ahead.
          </p>
        </div>

        {/* Center — Stats */}
        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-400">{applications.length}</p>
            <p className="text-gray-500 text-xs mt-1">Total Applied</p>
          </div>
          <div className="w-px bg-gray-700"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {applications.filter(a => a.status === "Interview").length}
            </p>
            <p className="text-gray-500 text-xs mt-1">Interviews</p>
          </div>
          <div className="w-px bg-gray-700"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {applications.filter(a => a.status === "Offer").length}
            </p>
            <p className="text-gray-500 text-xs mt-1">Offers</p>
          </div>
        </div>

        {/* Right — User */}
        <div className="text-center md:text-right">
          <div className="flex items-center gap-3 justify-center md:justify-end mb-2">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{user?.fullName}</p>
              <p className="text-gray-500 text-xs">{user?.email}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-gray-600 text-xs">
          © 2025 <span className="text-indigo-400 font-medium">Job Tracker</span> — All rights reserved
        </p>
        <p className="text-gray-600 text-xs flex items-center gap-1">
          Made with <span className="text-red-400">❤️</span> to land the <span className="text-indigo-400 font-medium">dream job</span>
        </p>
      </div>

    </div>
  </div>
</footer>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl w-80 text-center">
            <p className="text-4xl mb-3">🗑️</p>
            <h2 className="text-lg font-bold text-white mb-2">Delete Application?</h2>
            <p className="text-gray-400 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setDeleteId(null)} className="bg-gray-800 text-gray-300 px-5 py-2 rounded-lg text-sm hover:bg-gray-700 transition">
                Cancel
              </button>
              <button onClick={confirmDelete} className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-red-700 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard