import React from "react";

function Gallery() {
  return (
    <div>
      <section className="text-gray-600 body-font bg-gray-900">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex w-full mb-20 flex-wrap">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-200 lg:w-1/3 lg:mb-0 mb-4">
              Why DAT is important!
            </h1>
            <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-gray-100 text-xl">
              What type of test is differential aptitude test? The DAT is a tool
              that measures your abilities and skills, such as verbal, numerical
              ability, abstract reasoning, mechanical reasoning and space
              relations. The DAT is used with adults looking at a wide range of
              career and planning options, including some industrial firms
            </p>
          </div>
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://t4.ftcdn.net/jpg/01/84/79/49/240_F_184794995_tRSaZ9Y8snW0xndL8KFn28IbPbIeDc7x.jpg"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://t4.ftcdn.net/jpg/04/09/46/77/240_F_409467739_x1reyEkc1GqpsxmyZpuG2APmcJpJsr0f.jpg"
                />
              </div>
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src="https://t4.ftcdn.net/jpg/04/32/75/61/240_F_432756107_nUjmwexUfjsCQAbCNeTwHO6GYH2SUHl8.jpg"
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src="https://t4.ftcdn.net/jpg/02/68/05/73/240_F_268057345_iJJyzOX3alh16KKql9xBvcYNR5o4T3D2.webp"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://t4.ftcdn.net/jpg/02/58/16/77/240_F_258167769_aBbscTUQUJrUsh9BZZhV4UojEmr3nVBE.jpg"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://t3.ftcdn.net/jpg/03/20/14/86/240_F_320148669_pbSkLHCHiG0roBarftTAg9fnC7qAXqvD.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Gallery;
