import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function About() {
  return (
    <>
      <Navbar />

      <div className="about-container max-w-4xl mx-auto mt-32 p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">About Schedule App</h2>

        <div className="about-content">
          <p className="mb-6">
            Schedule App is a comprehensive tool designed to help students, professionals, and anyone who needs to
            organize their time effectively. Our mission is to provide a simple yet powerful platform for managing
            schedules and tasks.
          </p>

          <div className="about-features">
            <h3 className="text-xl font-bold text-[#8a5a44] mb-4">Key Features</h3>

            <div className="feature-item mb-4">
              <h4 className="text-lg font-semibold">📚 Class Details Organizer</h4>
              <p>
                Store and access class information such as room numbers, teacher names, and subject details. Keep all
                your important information in one place for easy reference.
              </p>
            </div>

            <div className="feature-item mb-4">
              <h4 className="text-lg font-semibold">✅ Task Categorization</h4>
              <p>
                Label tasks as "Optional," "Urgent," or "Important" for better prioritization. This helps you focus on
                what matters most and ensures you never miss important deadlines.
              </p>
            </div>

            <div className="feature-item mb-4">
              <h4 className="text-lg font-semibold">🤵 Authentication</h4>
              <p>
                Login/Create Account for user to store their data so that they can use it on their other Devices with
                the same data they Stored. Your schedule follows you everywhere you go.
              </p>
            </div>

            <div className="feature-item mb-4">
              <h4 className="text-lg font-semibold">⏰ Deadline Notifications</h4>
              <p>
                Receive alerts for upcoming deadlines and priority adjustments. Stay on top of your tasks with timely
                reminders that help you manage your time effectively.
              </p>
            </div>

            <div className="feature-item mb-4">
              <h4 className="text-lg font-semibold">🔄 Cross-Device Synchronization</h4>
              <p>
                Access your schedule and tasks from any device with an internet connection. Your data is securely stored
                in the cloud and automatically synced across all your devices.
              </p>
            </div>
          </div>

          <div className="about-team mt-8">
            <h3 className="text-xl font-bold text-[#8a5a44] mb-4">Our Team</h3>
            <p>
              Schedule App was developed by Group 9 as part of a project to create tools that enhance productivity and
              organization. We're committed to continuous improvement and welcome your feedback.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

