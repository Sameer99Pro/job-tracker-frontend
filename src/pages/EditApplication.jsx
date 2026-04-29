import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { getUserApplications, updateApplication } from "../services/api"
import toast from "react-hot-toast"

function EditApplication() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const [formData, setFormData] = useState({
    companyName: "",
    jobRole: "",
    location: "",
    status: "Applied",
    jobPortal: "",
    appliedDate: "",
    notes: "",
    interviewDate: "",
    resumeLink: "", 
  })

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!user) { navigate("/login"); return }
    fetchApplication()
  }, [])

  const fetchApplication = async () => {
    try {
      const res = await getUserApplications(user.id)
      const app = res.data.find(a => a.id === parseInt(id))
      if (!app) {
        toast.error("Application not found")
        navigate("/dashboard")
        return
      }
      setFormData({
        companyName: app.companyName || "",
        jobRole: app.jobRole || "",
        location: app.location || "",
        status: app.status || "Applied",
        jobPortal: app.jobPortal || "",
        appliedDate: app.appliedDate || "",
        notes: app.notes || "",
        interviewDate: app.interviewDate || "",
        resumeLink: app.resumeLink || "",  
      })
    } catch (err) {
      console.log(err)
      toast.error("Failed to load application")
    } finally {
      setFetching(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateApplication(id, {
        ...formData,
        userId: user.id
      })
      toast.success("Application updated! ✅")
      navigate("/dashboard")
    } catch (err) {
      console.log(err)
      toast.error("Update failed ❌")
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
            JT
          </div>
          <h1 className="text-lg font-bold text-indigo-600">Job Tracker</h1>
        </div>
        <Link to="/dashboard" className="text-sm text-indigo-600 hover:underline font-medium">
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-lg">

          <div className="text-center mb-6">
            <p className="text-3xl mb-2">✏️</p>
            <h2 className="text-2xl font-bold text-gray-800">Edit Application</h2>
            <p className="text-gray-400 text-sm mt-1">Update your application details</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Company + Role */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Company Name *</label>
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Job Role *</label>
                <input
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Location + Portal */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Location *</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Job Portal</label>
                <select
                  name="jobPortal"
                  value={formData.jobPortal}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select portal</option>
                  <option>LinkedIn</option>
                  <option>Naukri</option>
                  <option>Indeed</option>
                  <option>Company Website</option>
                  <option>Referral</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Status + Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Applied Date *</label>
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className={labelClass}>Notes (optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Interview Date */}
<div>
  <label className={labelClass}>Interview Date (optional)</label>
  <input
    type="date"
    name="interviewDate"
    value={formData.interviewDate || ""}
    onChange={handleChange}
    className={inputClass}
  />
</div>

{/* Resume Link */}
<div>
  <label className={labelClass}>Resume Link (optional)</label>
  <input
    type="text"
    name="resumeLink"
    value={formData.resumeLink || ""}
    placeholder="e.g. Google Drive link"
    onChange={handleChange}
    className={inputClass}
  />
</div>

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-sm font-semibold transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Update Application"}
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  )
}

export default EditApplication