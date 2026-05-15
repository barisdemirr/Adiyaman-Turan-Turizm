import React from 'react';

const DescriptionSection = ({ description, extras }) => {
  return (
    <section className="lg:col-span-2">
      <div className="space-y-4 md:space-y-6 text-sm md:text-body-lg text-secondary leading-relaxed">
        <p>
          {description}
        </p>
      </div>

      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {extras.map((extra, index) => (
          <div key={index} className="p-5 md:p-6 bg-surface-container-low rounded-xl border border-outline-variant">
            <h4 className="font-h4 text-base md:text-h4 mb-1 md:mb-2">{extra.title}</h4>
            <p className="text-xs md:text-body-sm text-secondary leading-normal">
              {extra.description}
            </p>
          </div>
        ))}
        </div>
    </section>
  );
};

export default DescriptionSection;