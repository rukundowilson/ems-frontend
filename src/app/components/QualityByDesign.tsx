import React from 'react';

export default function QualityByDesign() {
  return (
    <section className="w-full bg-white py-16 lg:py-24 px-6">
      <div className="max-w-7xl mx-auto lg:px-25">
        <div className="grid lg:grid-cols-2 gap-0 items-center ">

          {/* Left: Text content */}
          <div className="order-2 lg:order-1">
            <div className="max-w-md lg:max-w-lg">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Quality by design
              </p>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Safe and secure
              </h3>

              <div className="w-14 h-[2px] bg-gray-200 mb-6"></div>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
                We're setting the highest quality and safety standards for the
                industry. Plus, your information is protected at every step and
                your satisfaction is always guaranteed. The result convenient
                and affordable online care you can trust.
              </p>

              <div className="h-0.5 w-12 bg-gray-200"></div>
            </div>
          </div>

          {/* Right: Circular image with arc */}
          <div className="order-1 lg:order-2">
            <div className="relative flex justify-center lg:justify-end lg:-ml-20">

              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden bg-white shadow-[0_25px_40px_rgba(16,24,40,0.15)]">
                <img
                  src="https://images.ctfassets.net/jxiqobw4rz6v/1PCX6Qs9resA4g9oeePy2M/85f7d548bca141785d3b3472e247c015/IMG_circle_quality-by-design_692_2x-70.webp"
                  alt="Mother and child hugging"
                  className="w-full h-full object-cover"
                />

                {/* Decorative purple arc */}
                <svg
                  className="absolute -top-4 -right-6 w-48 h-48 lg:w-56 lg:h-56 pointer-events-none"
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="#7c3aed"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray="140 565"
                    transform="rotate(-45 100 100)"
                  />
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}