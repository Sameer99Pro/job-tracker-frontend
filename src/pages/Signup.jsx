import { useState } from "react"
import { signup } from "../services/api"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"

function Signup() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signup(formData)
      toast.success("Account created! Login karo 🎉")
      navigate("/login")
    } catch (err) {
      console.log(err)
      setError("Email already registered")
      toast.error("Signup failed ❌")
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition placeholder-gray-500"

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">

      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
              JT
            </div>
            <h1 className="text-lg font-bold text-white">Job Tracker</h1>
          </Link>
          <Link to="/login" className="text-sm text-indigo-400 hover:text-indigo-300 transition">
            Already have account →
          </Link>
        </div>
      </nav>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create account</h2>
            <p className="text-gray-400 text-sm">Start tracking your job applications today</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Sameer Shaikh"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="sameer@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-50 mt-2"
              >
                {loading ? "Creating account..." : "Create Account →"}
              </button>

            </form>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Login here
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Signup