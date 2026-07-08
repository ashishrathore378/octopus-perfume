import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto min-h-[90vh] px-8 flex flex-col md:flex-row items-center justify-between">

        {/* Left Side */}
        <div className="max-w-xl z-10">
          <p className="text-yellow-400 uppercase tracking-[0.4em] mb-4">
            Premium Luxury Perfumes
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Wear Your
            <span className="text-yellow-400"> Signature</span>
          </h1>

          <p className="mt-8 text-gray-400 text-lg leading-8">
            Experience handcrafted luxury fragrances designed to leave
            an unforgettable impression.
          </p>

          <p className="mt-6 text-3xl font-bold text-yellow-400">
            Starting at ₹799
          </p>

          <div className="flex gap-4 mt-10">
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition">
              Shop Now
            </button>

            <button className="border border-yellow-400 px-8 py-4 rounded-full hover:bg-yellow-400 hover:text-black transition">
              Explore
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative mt-16 md:mt-0">
          <Image
            src="/images/perfume1.png"
            alt="Luxury Perfume"
            width={450}
            height={650}
            priority
            className="drop-shadow-[0_0_60px_rgba(255,215,0,0.35)]"
          />
        </div>

      </div>
    </section>
  );
}