// import React, { Suspense, useMemo, useState, useEffect } from "react";
// import HelmetHead from "@/app/HelmetHead/HelmetHead";
// import useUsers from "../../../../../hooks/useEmailsData";
// import Swal from "sweetalert2";
// import "./managerUsers.css";
// import AdminFooter from "@/app/(with-navbar)/componenets/Admin Footer/AdminFooter";

// const UserRow = React.memo(({ user, index, handleDelete, handleMakeAdmin, makingAdmin }) => (
//   <tr key={user.email} className={index % 2 === 0 ? "even-row" : "odd-row"}>
//     <td>{index + 1}</td>
//     <td>{user.name || "N/A"}</td>
//     <td>{user.email}</td>
//     <td>
//       {user.power === "Admin" ? (
//         <span className="admin-badge">Admin</span>
//       ) : (
//         <button
//           className="make-admin-btn"
//           onClick={() => handleMakeAdmin(user.email)}
//           disabled={makingAdmin[user.email]} // Disable if clicked
//         >
//           {makingAdmin[user.email] ? "Making Admin..." : "Make Admin"}
//         </button>
//       )}
//     </td>
//     <td>
//       <button className="delete-btn" onClick={() => handleDelete(user.email)}>
//         Delete
//       </button>
//     </td>
//   </tr>
// ));

// const ManageUsers = () => {
//   const fetchedUsers = useUsers(); // Fetch users initially
//   const [users, setUsers] = useState([]); // Local state for users
//   const [makingAdmin, setMakingAdmin] = useState({}); // Track clicked buttons

//   useEffect(() => {
//     setUsers(fetchedUsers); // Update local users state when fetched

//     // Check sessionStorage for users that should be marked as admin
//     const adminUsers = JSON.parse(sessionStorage.getItem("adminUsers")) || [];
//     setUsers(prevUsers =>
//       prevUsers.map(user =>
//         adminUsers.includes(user.email) ? { ...user, power: "Admin" } : user
//       )
//     );
//   }, [fetchedUsers]);

//   // const handleDelete = (userEmail) => {
//   //   Swal.fire({
//   //     title: "Are you sure?",
//   //     text: "You won't be able to revert this!",
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonText: "Delete",
//   //     cancelButtonText: "Cancel",
//   //     confirmButtonColor: "#d33",
//   //     cancelButtonColor: "#3085d6",
//   //   }).then((result) => {
//   //     if (result.isConfirmed) {
//   //       console.log(`User with email: ${userEmail} deleted`);
//   //       Swal.fire("Deleted!", "The user has been deleted.", "success");
//   //     }
//   //   });
//   // };


//   // Update ManageUsers.jsx to handle delete request
//   const handleDelete = async (userEmail) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Delete",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await fetch("/api/makeAdmin", {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email: userEmail }),
//           });

//           const data = await response.json();

//           if (response.ok) {
//             setUsers((prevUsers) => prevUsers.filter((user) => user.email !== userEmail));

//             const adminUsers = JSON.parse(sessionStorage.getItem("adminUsers")) || [];
//             const updatedAdmins = adminUsers.filter(email => email !== userEmail);
//             sessionStorage.setItem("adminUsers", JSON.stringify(updatedAdmins));

//             Swal.fire("Deleted!", "The user has been deleted.", "success");
//           } else {
//             Swal.fire("Error!", data.message, "error");
//           }
//         } catch (error) {
//           console.error("Error deleting user:", error);
//           Swal.fire("Error!", "Something went wrong.", "error");
//         }
//       }
//     });
//   };



//   const handleMakeAdmin = async (userEmail) => {
//     setMakingAdmin((prev) => ({ ...prev, [userEmail]: true })); // Disable button

//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to make this user an Admin?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Make Admin",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const payload = { email: userEmail, role: "Admin" };
//           const response = await fetch("/api/makeAdmin", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload),
//           });

//           const data = await response.json();

//           if (response.ok) {
//             // Update local users and sessionStorage
//             setUsers((prevUsers) =>
//               prevUsers.map((user) =>
//                 user.email === userEmail ? { ...user, power: "Admin" } : user
//               )
//             );

//             // Save the email to sessionStorage
//             const adminUsers = JSON.parse(sessionStorage.getItem("adminUsers")) || [];
//             if (!adminUsers.includes(userEmail)) {
//               adminUsers.push(userEmail);
//               sessionStorage.setItem("adminUsers", JSON.stringify(adminUsers));
//             }

//             Swal.fire("Success!", "The user is now an Admin.", "success");
//           } else {
//             Swal.fire("Error!", data.message, "error");
//           }
//         } catch (error) {
//           console.error("Error updating role:", error);
//           Swal.fire("Error!", "Something went wrong.", "error");
//         }
//       }
//       setMakingAdmin((prev) => ({ ...prev, [userEmail]: false })); // Re-enable if canceled
//     });
//   };

//   const userRows = useMemo(
//     () => users.map((user, index) => (
//       <UserRow
//         key={user.email}
//         user={user}
//         index={index}
//         handleDelete={handleDelete}
//         handleMakeAdmin={handleMakeAdmin}
//         makingAdmin={makingAdmin} // Pass button state
//       />
//     )),
//     [users, makingAdmin]
//   );
// console.log(users)
//   return (
//     <>
//       <HelmetHead
//         title="Manage Users | Admin Panel"
//         description="Manage user roles and delete users in an admin panel. Now fully responsive and SEO-optimized."
//         keywords="user management, admin panel, responsive table, roles"
//         author="Your Name"
//         logoImage="/favicon.ico"
//       />

//       <div className="manage-users-container">
//         <h1 className="title">Total Users: {users.length}</h1>
//         <div className="table-responsive max-w-7xl container mx-auto">
//           <table className="user-table">
//             <thead>
//               <tr>
//                 <th>No</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Power</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>{userRows}</tbody>
//           </table>
//         </div>
//       </div>
//       <AdminFooter />
//     </>
//   );
// };

// export default ManageUsers;
'use client';

import React, { Suspense, useMemo, useState, useEffect } from "react";
import HelmetHead from "@/app/HelmetHead/HelmetHead";
import useUsers from "../../../../../hooks/useEmailsData";
import Swal from "sweetalert2";
import AdminFooter from "@/app/(with-navbar)/componenets/Admin Footer/AdminFooter";
import Image from "next/image";

const UserRow = React.memo(({ user, index, handleDelete, handleMakeAdmin, makingAdmin }) => (
  <tr className="bg-white hover:bg-gray-100 rounded-lg transition-all text-center">
    <td className="p-2">{index + 1}</td>
    <td className="flex items-center gap-2 p-2">
      <Image
        src={user.photo || "/default.png"}
        width={35}
        height={35}
        alt={user.name}
        className="rounded-full object-cover"
      />
      <span>{user.name || "N/A"}</span>
    </td>
    <td className="p-2">{user.email}</td>
    <td className="p-2">
      {user.power === "Admin" ? (
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">Admin</span>
      ) : (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600 transition disabled:opacity-50"
          onClick={() => handleMakeAdmin(user.email)}
          disabled={makingAdmin[user.email]}
        >
          {makingAdmin[user.email] ? "Making Admin..." : "Make Admin"}
        </button>
      )}
    </td>
    <td className="p-2">
      <button
        className="bg-red-500 text-white px-3 py-1 rounded-full text-xs hover:bg-red-600 transition"
        onClick={() => handleDelete(user.email)}
      >
        Delete
      </button>
    </td>
  </tr>
));

export default function ManageUsers() {
  const fetchedUsers = useUsers();
  const [users, setUsers] = useState([]);
  const [makingAdmin, setMakingAdmin] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setUsers(fetchedUsers);

    const adminUsers = JSON.parse(sessionStorage.getItem("adminUsers")) || [];
    setUsers(prev =>
      prev.map(user =>
        adminUsers.includes(user.email) ? { ...user, power: "Admin" } : user
      )
    );
  }, [fetchedUsers]);

  const handleDelete = async (userEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch("/api/makeAdmin", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail }),
          });
          const data = await response.json();
          if (response.ok) {
            setUsers(prev => prev.filter(u => u.email !== userEmail));
            const adminUsers = JSON.parse(sessionStorage.getItem("adminUsers")) || [];
            sessionStorage.setItem(
              "adminUsers",
              JSON.stringify(adminUsers.filter(email => email !== userEmail))
            );
            Swal.fire("Deleted!", "The user has been deleted.", "success");
          } else Swal.fire("Error!", data.message, "error");
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleMakeAdmin = async (userEmail) => {
    setMakingAdmin(prev => ({ ...prev, [userEmail]: true }));

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to make this user an Admin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Make Admin",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch("/api/makeAdmin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, role: "Admin" }),
          });
          const data = await response.json();
          if (response.ok) {
            setUsers(prev =>
              prev.map(u => (u.email === userEmail ? { ...u, power: "Admin" } : u))
            );
            const adminUsers = JSON.parse(sessionStorage.getItem("adminUsers")) || [];
            if (!adminUsers.includes(userEmail)) {
              adminUsers.push(userEmail);
              sessionStorage.setItem("adminUsers", JSON.stringify(adminUsers));
            }
            Swal.fire("Success!", "The user is now an Admin.", "success");
          } else Swal.fire("Error!", data.message, "error");
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
      setMakingAdmin(prev => ({ ...prev, [userEmail]: false }));
    });
  };

  const filteredUsers = users.filter(
    u =>
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userRows = useMemo(() =>
    filteredUsers.map((user, index) => (
      <UserRow
        key={user.email}
        user={user}
        index={index}
        handleDelete={handleDelete}
        handleMakeAdmin={handleMakeAdmin}
        makingAdmin={makingAdmin}
      />
    )), [filteredUsers, makingAdmin]
  );

  return (
    <>
      <HelmetHead
        title="Manage Users | Admin Panel"
        description="Manage user roles and delete users in an admin panel."
      />

      <div className="bg-white p-6 rounded-xl shadow-md max-w-7xl mx-auto my-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-3 py-1 rounded-md text-sm focus:ring-2 focus:ring-[#17549A] outline-none"
          />
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead className="text-center text-gray-600">
              <tr>
                <th className="p-2">No</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Power</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {userRows.length > 0 ? userRows : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminFooter />
    </>
  );
}
