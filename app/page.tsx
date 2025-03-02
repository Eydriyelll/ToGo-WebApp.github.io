import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import HomeSchedule from "@/components/home-schedule"
import HomeTasks from "@/components/home-tasks"
import UserWelcome from "@/components/user-welcome"

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <h1>Organize Your Schedule Efficiently</h1>
          <p>Plan, manage, and track your tasks with ease.</p>
          <Link
            href="/schedule"
            className="btn bg-[#8a5a44] hover:bg-[#774936] text-white px-7 py-3 rounded-md inline-block"
          >
            Get Started
          </Link>
        </section>

        {/* User Welcome Section - Client Component */}
        <UserWelcome />

        {/* Highlighted Tasks Section - Client Component */}
        <section className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Recent Tasks</h2>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <HomeTasks />
          </div>
          <Link
            href="/tasks"
            className="btn bg-primary hover:bg-[#774936] text-white px-5 py-2 rounded-md inline-block mt-6"
          >
            View All Tasks
          </Link>
        </section>

        {/* Schedule Section - Client Component */}
        <section className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Your Weekly Schedule</h2>
          <div className="bg-card p-6 rounded-lg shadow-md overflow-x-auto">
            <HomeSchedule />
          </div>
          <Link
            href="/schedule"
            className="btn bg-primary hover:bg-[#774936] text-white px-5 py-2 rounded-md inline-block mt-6"
          >
            Edit Schedule
          </Link>
        </section>

        {/* Features Section */}
        <section className="features max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <div className="feature-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="feature">
              <h3 className="text-xl font-semibold text-[#8a5a44] mb-3">📚 Class Details Organizer</h3>
              <p>Store and access class information such as room numbers, teacher names, and subject details.</p>
            </div>
            <div className="feature">
              <h3 className="text-xl font-semibold text-[#8a5a44] mb-3">✅ Task Categorization</h3>
              <p>Label tasks as "Optional," "Urgent," or "Important" for better prioritization.</p>
            </div>
            <div className="feature">
              <h3 className="text-xl font-semibold text-[#8a5a44] mb-3">🤵 Authentication</h3>
              <p>
                Login/Create Account for user to store their data so that they can use it on their other Devices with
                the same data they Stored.
              </p>
            </div>
            <div className="feature">
              <h3 className="text-xl font-semibold text-[#8a5a44] mb-3">⏰ Deadline Notifications</h3>
              <p>Receive alerts for upcoming deadlines and priority adjustments.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}


