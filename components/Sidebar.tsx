"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaTachometerAlt, FaUsers, FaTasks, FaClipboardList, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const [selected, setSelected] = useState<string>("");

  const menuItems = [
    { href: "/admin/dashboard", icon: <FaTachometerAlt size={24} />, label: "Dashboard" },
    { href: "/admin/users", icon: <FaUsers size={24} />, label: "Users" },
    { href: "/admin/tasks", icon: <FaTasks size={24} />, label: "Tasks" },
    { href: "/admin/clients", icon: <FaClipboardList size={24} />, label: "Clients" },
  ];

  return (
    <div className="w-24 h-screen bg-[#F7F5F3] border-r border-[#B8B8B8] fixed top-0 left-0 z-50 flex flex-col items-center">
      {/* Logo */}
      <div className="w-12 h-12 mt-6 rounded-full flex items-center justify-center overflow-hidden">
        <img
          src="/Logo1.svg"
          alt="Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Divider */}
      <div className="w-14 border-t border-[#BDBDBD] mt-8"></div>

      {/* Menu Items */}
      <div className="flex flex-col items-center mt-4 space-y-6">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setSelected(item.href)}
            className="relative group"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full ${
                selected === item.href ? "bg-[#E5E5E5]" : "hover:bg-[#E5E5E5]"
              }`}
            >
              {item.icon}
            </div>
            {/* Tooltip */}
            <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Footer Section */}
      <div className="mt-auto mb-4 w-full flex flex-col items-center">
        {/* Divider */}
        <div className="w-14 border-t border-[#BDBDBD] mb-4"></div>

        {/* Settings Icon */}
        <Link
          href="/admin/settings"
          onClick={() => setSelected("/admin/settings")}
          className="relative group mb-4"
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${
              selected === "/admin/settings" ? "bg-[#E5E5E5]" : "hover:bg-[#E5E5E5]"
            }`}
          >
            <FaCog size={24} />
          </div>
          {/* Tooltip */}
          <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100">
            Settings
          </span>
        </Link>

        {/* Profile Icon */}
        <Link
          href="/admin/profile"
          onClick={() => setSelected("/admin/profile")}
          className="relative group"
        >
          <div
            className={`w-12 h-12 rounded-full overflow-hidden cursor-pointer ${
              selected === "/admin/profile" ? "bg-[#E5E5E5]" : "hover:bg-[#E5E5E5]"
            }`}
          >
            <img
              src="/assets/profile1.jpg"
              alt="Footer Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Tooltip */}
          <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100">
            Profile
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
