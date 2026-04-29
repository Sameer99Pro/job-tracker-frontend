import { useNavigate } from "react-router-dom"


function Home() {
  const navigate = useNavigate()

  const features = [
    {
      icon: "📋",
      title: "Track Applications",
      desc: "Keep all your job applications organized in one place. Never lose track of where you applied."
    },
    {
      icon: "📊",
      title: "Visual Analytics",
      desc: "See your application stats at a glance with beautiful charts and status breakdowns."
    },
    {
      icon: "🔔",
      title: "Status Updates",
      desc: "Update application status from Applied to Interview to Offer — all in real time."
    },
    {
      icon: "🔍",
      title: "Smart Search",
      desc: "Quickly find any application by company name or job role with instant search."
    },
    {
      icon: "🔐",
      title: "Secure & Private",
      desc: "Your data is protected with JWT authentication. Only you can see your applications."
    },
    {
      icon: "⚡",
      title: "Fast & Simple",
      desc: "Clean, minimal interface built for speed. Add a new application in under 30 seconds."
    },
  ]

  const steps = [
    { step: "01", title: "Create Account", desc: "Sign up for free in seconds" },
    { step: "02", title: "Add Applications", desc: "Log every job you apply to" },
    { step: "03", title: "Track Progress", desc: "Update status as you hear back" },
    { step: "04", title: "Land the Job", desc: "Stay organized, stay ahead" },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
              JT
            </div>
            <h1 className="text-lg font-bold text-white">Job Tracker</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-gray-300 hover:text-white px-4 py-2 rounded-lg transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-block bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-indigo-600/30">
          🚀 Your Job Search Companion
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Track Every
          <span className="text-indigo-400"> Job Application</span>
          <br />Like a Pro
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          Stop losing track of where you applied. Job Tracker helps you organize,
          monitor, and analyze your entire job search in one beautiful dashboard.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate("/signup")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition text-sm"
          >
            Start Tracking Free →
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-xl font-semibold transition text-sm"
          >
            Login to Dashboard
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16">
          {[
            { value: "100%", label: "Free to use" },
            { value: "JWT", label: "Secure Auth" },
            { value: "∞", label: "Applications" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-indigo-400">{s.value}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Everything you need</h2>
            <p className="text-gray-400">Powerful features to supercharge your job search</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-indigo-500 transition duration-300"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">How it works</h2>
            <p className="text-gray-400">Get started in minutes — no setup required</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-3/4 w-1/2 h-px bg-gray-700"></div>
                )}
                <div className="w-16 h-16 bg-indigo-600/20 border border-indigo-600/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-400 font-bold text-lg">{s.step}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to organize your job search?
          </h2>
          <p className="text-indigo-200 mb-8">
            Join thousands of job seekers who use Job Tracker to land their dream job.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition text-sm"
          >
            Create Free Account →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white w-6 h-6 rounded flex items-center justify-center font-bold text-xs">
              JT
            </div>
            <span className="text-gray-400 text-sm">Job Tracker © 2025</span>
          </div>
          <p className="text-gray-500 text-sm">Built with React + Spring Boot</p>
        </div>
      </footer>

    </div>
  )
}

export default Home