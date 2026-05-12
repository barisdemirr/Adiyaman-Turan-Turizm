import React from 'react';

const NavLink = ({ href, title, isActive, onClick }) => {
  return (
    <a
      className={`${
        isActive
          ? "text-orange-600 border-b-2 border-orange-600 pb-1"
          : "text-slate-600 hover:text-orange-500 transition-colors"
      }`}
      href={href}
      onClick={onClick}
    >
      {title}
    </a>
  );
};

export default NavLink;




