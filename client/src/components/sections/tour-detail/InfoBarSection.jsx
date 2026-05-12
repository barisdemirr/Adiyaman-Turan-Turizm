import React from 'react';

const InfoBarSection = () => {
  const infoItems = [
    {
      icon: "schedule",
      label: "Duration",
      value: "Daily (14 Hours)",
    },
    {
      icon: "group",
      label: "Group Size",
      value: "12-15 Persons",
    },
    {
      icon: "translate",
      label: "Language",
      value: "TR / EN / DE",
    },
    {
      icon: "explore",
      label: "Difficulty",
      value: "Easy / Moderate",
    },
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 mt-4 md:mt-8">
      <hr className="border-slate-100 md:border-slate-200" />
      <div className="grid grid-cols-2 md:grid-cols-4 py-4 md:py-6 gap-x-2 gap-y-6 md:gap-8">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 md:gap-4 px-1">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container flex-shrink-0">
              <span className="material-symbols-outlined text-[20px] md:text-[24px]">{item.icon}</span>
            </div>
            <div>
              <p className="text-[10px] md:text-caption text-secondary uppercase tracking-tight md:tracking-normal">
                {item.label}
              </p>
              <p className="font-label-bold text-[12px] md:text-body-md leading-tight">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      <hr className="border-slate-100 md:border-slate-200" />
    </section>
  );
};

export default InfoBarSection;