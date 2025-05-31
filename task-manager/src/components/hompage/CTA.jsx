export default function CTA() {
  return (
    <section className="bg-blue-600 py-16 text-center text-white px-4">
      <h2 className="text-3xl font-bold mb-4">
        Ready to organize your workflow?
      </h2>
      <p className="mb-6 text-lg">
        Sign up today and start managing your tasks more efficiently.
      </p>
      <a
        href="/signup"
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
      >
        Get Started for Free
      </a>
    </section>
  );
}
