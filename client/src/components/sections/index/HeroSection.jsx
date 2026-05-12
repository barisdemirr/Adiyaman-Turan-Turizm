import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] md:h-[870px] min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Mount Nemrut stone heads at sunrise"
          className="w-full h-full object-cover object-center"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqntdXfVmWMTGk2kYf53PRtELTYEmgGi-ARDuAN3KT1kTpCaLLJs0PLy3_bne9qde5fNOmBC4psJhItW3AzoioF2aEJ3d9tnZMNrAELezsnpzGQuPOP_NHRzD9iIMXgythqydmvQ0Cqr7Hk9TORBq6UC0IZYzxAIx1sfF0yONQiw3FbNidE-MmF2NLeXLoOYTkNEps4kaWjXV_2n5qkWNrYo9lifdgJeCp9V5xSkvo5rno3JtUcV0s-1o8yBQpGLQ4Ur4UjROpzGVi"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 mb-4 md:mb-6 rounded-full bg-primary-container/90 backdrop-blur-sm text-on-primary-container font-label-bold text-[10px] md:text-caption tracking-widest uppercase">
          Premium Travel Experience
        </span>
        <h1 className="font-h1 text-3xl sm:text-4xl md:text-h1 text-white mb-4 md:mb-6 drop-shadow-lg leading-tight">
          Discover the Lands Where History Began
        </h1>
        <p className="text-sm md:text-body-lg text-white/90 mb-8 md:mb-10 max-w-2xl drop-shadow-md">
          Embark on unforgettable journeys through Adıyaman and beyond. Heritage, hospitality, and expert guides await
          you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            className="inline-flex items-center justify-center bg-primary text-on-primary font-label-bold text-sm md:text-label-bold px-8 py-3 md:py-4 rounded-full hover:bg-tertiary transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            href="#tours"
          >
            Explore Tours
            <span className="material-symbols-outlined ml-2 text-[18px] md:text-[20px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;