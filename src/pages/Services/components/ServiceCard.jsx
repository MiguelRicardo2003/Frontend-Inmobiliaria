import React from "react";

const ServiceCard = ({ icon, title, description, colorClass }) => (
  <div
    className={`relative bg-white rounded-[20px] border-2 ${colorClass} p-6 flex gap-6 items-center min-h-[150px]`}
  >
    <div
      className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${colorClass} bg-opacity-20`}
    >
      {icon}
    </div>
    <div className="flex flex-col justify-center">
      <h3 className="text-lg font-bold text-black mb-1 leading-snug text-center md:text-left">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed text-center md:text-left">
        {description}
      </p>
    </div>
  </div>
);

export default ServiceCard; 