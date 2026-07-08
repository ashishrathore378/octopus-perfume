export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-bold text-yellow-400 tracking-[0.3em]">
          OCTOPUS
        </h2>

        <p className="text-gray-400 mt-4 max-w-lg">
          Premium luxury perfumes crafted for confidence,
          elegance and unforgettable moments.
        </p>

        <div className="flex gap-8 mt-8 text-gray-300">
          <a href="#" className="hover:text-yellow-400">
            Privacy Policy
          </a>

          <a href="#" className="hover:text-yellow-400">
            Terms
          </a>

          <a href="#" className="hover:text-yellow-400">
            Contact
          </a>
        </div>

        <p className="mt-10 text-gray-500 text-sm">
          © 2026 OCTOPUS. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}