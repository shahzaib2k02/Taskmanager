import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left side: Copyright */}
        <p className="text-sm text-gray-600 text-center md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} ShahzaibHussainMirza. All rights
          reserved.
        </p>

        {/* Right side: Social Links */}
        <div className="flex space-x-6 text-gray-800">
          <a
            href="https://github.com/shahzaib2k02"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-blue-600 transition"
          >
            <FaGithub size={24} />
          </a>

          <a
            href="https://www.linkedin.com/in/shahzaib-mirza/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-600 transition"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
