import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addApplication } from "../services/api";
import toast from "react-hot-toast";

function AddApplication() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    companyName: "",
    jobRole: "",
    location: "",
    status: "Applied",
    jobPortal: "",
    appliedDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not logged in ❌");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await addApplication({
        ...formData,
        userId: user.id
      });

      toast.success("Application Added 🚀");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      toast.error("Error Adding Application ❌");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

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
        <Link
          to="/dashboard"
          className="text-sm text-indigo-600 hover:underline font-medium"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-lg">

          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-3xl mb-2">📋</p>
            <h2 className="text-2xl font-bold text-gray-800">Add New Application</h2>
            <p className="text-gray-400 text-sm mt-1">Track your job application journey</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Company + Role */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Company Name *</label>
                <input
                  name="companyName"
                  placeholder="e.g. Infosys"
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Job Role *</label>
                <input
                  name="jobRole"
                  placeholder="e.g. Java Developer"
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
                  placeholder="e.g. Hyderabad"
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Job Portal *</label>
                <select
                  name="jobPortal"
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
                placeholder="e.g. Interview scheduled on 20 Apr..."
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
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
                {loading ? "Saving..." : "Save Application"}
              </button>
            </div>

          </form>
          {/* Interview Date */}
<div>
  <label className={labelClass}>Interview Date (optional)</label>
  <input
    type="date"
    name="interviewDate"
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
    placeholder="e.g. Google Drive link"
    onChange={handleChange}
    className={inputClass}
  />
</div>
        </div>
      </div>

    </div>
  );
}

export default AddApplication;