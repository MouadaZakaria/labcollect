"use client";
import React, { useState } from "react";
import { FaSort, FaEllipsisV } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar";

const UsersPage = () => {
  const usersData = [
    {
      id: 1,
      name: "Ahmed Hamo",
      phone: "0623234533",
      location: "Casablanca",
      joined: "2010-10-02",
      role: "Admin",
    },
    {
      id: 2,
      name: "Amjad Jmo",
      phone: "0612123234",
      location: "Casablanca",
      joined: "2011-10-03",
      role: "Admin",
    },
    {
      id: 3,
      name: "Walid Wado",
      phone: "0632342349",
      location: "Marackech",
      joined: "2015-05-20",
      role: "Admin",
    },
    {
      id: 4,
      name: "Ihsan Hassan",
      phone: "0623283290",
      location: "Rabat",
      joined: "2015-07-14",
      role: "Sampler",
    },
  ];

  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleSelectUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const toggleDropdown = (id: number) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
      const matchesPhone = user.phone.includes(searchPhone);
      const matchesDate = filterDate ? user.joined === filterDate : true;
      const matchesRole = filterRole ? user.role === filterRole : true;
      return matchesSearch && matchesPhone && matchesDate && matchesRole;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.joined).getTime() - new Date(b.joined).getTime();
      } else {
        return new Date(b.joined).getTime() - new Date(a.joined).getTime();
      }
    });

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-24 flex-1 p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">User Management</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-6 w-full">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 bg-[#F7F5F3] border border-[#707070] rounded-lg"
          />
          <input
            type="text"
            placeholder="Search by phone"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            className="flex-1 px-4 py-2 bg-[#F7F5F3] border border-[#707070] rounded-lg"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 bg-[#F7F5F3] border border-[#707070] rounded-lg"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Sampler">Sampler</option>
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 bg-[#F7F5F3] border border-[#707070] rounded-lg"
          />
          <div className="relative">
            <button className="px-4 py-2 bg-[#F7F5F3] border border-[#707070] rounded-lg text-lg font-medium text-[#333333]">
              <FaEllipsisV />
            </button>
            {/* Dropdown for bulk actions */}
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => alert("Bulk delete selected users")}
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="w-full bg-[#F7F5F3] rounded-lg p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#DEDADA]">
                <th className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="py-2 px-4">Full Name</th>
                <th className="py-2 px-4">Phone Number</th>
                <th className="py-2 px-4">Location</th>
                <th className="py-2 px-4 flex items-center">
                  Joined
                  <button
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="ml-2 text-[#333333] hover:text-black"
                  >
                    <FaSort />
                  </button>
                </th>
                <th className="py-2 px-4">Permissions</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                    />
                  </td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.phone}</td>
                  <td className="py-2 px-4">{user.location}</td>
                  <td className="py-2 px-4">{user.joined}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        user.role === "Admin" ? "bg-[#E35A5A]" : "bg-[#025E86]"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-2 px-4 relative">
                    <button
                      className="text-[#333333] hover:text-black"
                      onClick={() => toggleDropdown(user.id)}
                    >
                      <FaEllipsisV />
                    </button>
                    {openDropdown === user.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => alert(`View user ${user.name}`)}
                        >
                          View
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => alert(`Edit user ${user.name}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => alert(`Delete user ${user.name}`)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;