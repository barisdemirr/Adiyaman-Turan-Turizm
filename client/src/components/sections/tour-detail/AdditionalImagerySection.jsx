import React from 'react';
import Image from 'next/image';

const AdditionalImagerySection = ({ photos }) => {


  return (
    <section className="max-w-container-max mx-auto px-4 md:px-6 mt-12 md:mt-24">
      <h2 className="font-h3 text-xl md:text-h3 mb-6 md:mb-8">Tour Gallery</h2>

      {/* Puzzle/Masonry Container */}
      <div className="columns-2 md:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
        {photos.map((image) => (
          <div key={image.id} className="break-inside-avoid">
            <Image
              className="w-full h-auto rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-zoom-in"
              alt={`Tour Image ${image.id + 1}`}
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${image.imageUrl}`}
              width={400}
              height={300}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 250px"
              quality={75}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdditionalImagerySection;