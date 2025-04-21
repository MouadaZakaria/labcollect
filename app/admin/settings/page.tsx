import Sidebar from "@/components/Sidebar";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="flex">
    {/* Sidebar */}
    <Sidebar />
    {/* Main Content */}
    <div className="ml-24 flex-1 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <p className="mt-4 text-gray-700">Manage your settings here.</p>
    </div>
    </div>
  );
};

export default SettingsPage;