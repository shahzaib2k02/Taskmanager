export default function Hero() {
  return (
    <section className="bg-blue-50 py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800">
            Manage Your Tasks Effortlessly
          </h1>
          <p className="mt-4 text-lg text-blue-600 max-w-md">
            Create, assign, and track tasks with ease — all in one place.
          </p>
          <div className="mt-6">
            <a
              href="/signup"
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="mb-8 md:mb-0 md:w-1/2">
          <img
            src="/hero-image.jpg" // Replace with your actual path
            alt="Task management illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
