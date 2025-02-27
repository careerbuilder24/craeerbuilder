import React, { Suspense, useMemo, useState, useEffect } from "react";
import HelmetHead from "@/app/HelmetHead/HelmetHead"; 
import useUsers from "../../../../../hooks/useEmailsData"; 
import Swal from "sweetalert2"; 
import "./managerUsers.css";

const UserRow = React.memo(({ user, index, handleDelete, handleMakeAdmin, makingAdmin }) => (
  <tr key={user.email} className={index % 2 === 0 ? "even-row" : "odd-row"}>
    <td>{index + 1}</td>
    <td>{user.name || "N/A"}</td>
    <td>{user.email}</td>
    <td>
      {user.power === "Admin" ? (
        <span className="admin-badge">Admin</span>
      ) : (
        <button 
          className="make-admin-btn" 
          onClick={() => handleMakeAdmin(user.email)}
          disabled={makingAdmin[user.email]} // Disable if clicked
        >
          {makingAdmin[user.email] ? "Making Admin..." : "Make Admin"}
        </button>
      )}
    </td>
    <td>
      <button className="delete-btn" onClick={() => handleDelete(user.email)}>
        Delete
      </button>
    </td>
  </tr>
));

const ManageUsers = () => {
  const fetchedUsers = useUsers(); // Fetch users initially
  const [users, setUsers] = useState([]); // Local state for users
  const [makingAdmin, setMakingAdmin] = useState({}); // Track clicked buttons

  useEffect(() => {
    setUsers(fetchedUsers); // Update local users state when fetched

    // Check sessionStorage for users that should be marked as admin
    const adminUsers = JSON.parse(sessionStorage.getItem("adminUsers")) || [];
    setUsers(prevUsers =>
      prevUsers.map(user => 
        adminUsers.includes(user.email) ? { ...user, power: "Admin" } : user
      )
    );
  }, [fetchedUsers]);

  // const handleDelete = (userEmail) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Delete",
  //     cancelButtonText: "Cancel",
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       console.log(`User with email: ${userEmail} deleted`);
  //       Swal.fire("Deleted!", "The user has been deleted.", "success");
  //     }
  //   });
  // };


  // Update ManageUsers.jsx to handle delete request
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
        const response = await fetch("https://careers-builder2.vercel.app/api/makeAdmin", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userEmail }),
        });

        const data = await response.json();

        if (response.ok) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.email !== userEmail));
          
          const adminUsers = JSON.parse(sessionStorage.getItem("adminUsers")) || [];
          const updatedAdmins = adminUsers.filter(email => email !== userEmail);
          sessionStorage.setItem("adminUsers", JSON.stringify(updatedAdmins));

          Swal.fire("Deleted!", "The user has been deleted.", "success");
        } else {
          Swal.fire("Error!", data.message, "error");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  });
};



  const handleMakeAdmin = async (userEmail) => {
    setMakingAdmin((prev) => ({ ...prev, [userEmail]: true })); // Disable button

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
          const payload = { email: userEmail, role: "Admin" };
          const response = await fetch("/api/makeAdmin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (response.ok) {
            // Update local users and sessionStorage
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.email === userEmail ? { ...user, power: "Admin" } : user
              )
            );

            // Save the email to sessionStorage
            const adminUsers = JSON.parse(sessionStorage.getItem("adminUsers")) || [];
            if (!adminUsers.includes(userEmail)) {
              adminUsers.push(userEmail);
              sessionStorage.setItem("adminUsers", JSON.stringify(adminUsers));
            }

            Swal.fire("Success!", "The user is now an Admin.", "success");
          } else {
            Swal.fire("Error!", data.message, "error");
          }
        } catch (error) {
          console.error("Error updating role:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
      setMakingAdmin((prev) => ({ ...prev, [userEmail]: false })); // Re-enable if canceled
    });
  };

  const userRows = useMemo(
    () => users.map((user, index) => (
      <UserRow 
        key={user.email} 
        user={user} 
        index={index} 
        handleDelete={handleDelete} 
        handleMakeAdmin={handleMakeAdmin}
        makingAdmin={makingAdmin} // Pass button state
      />
    )),
    [users, makingAdmin]
  );

  return (
    <>
      <HelmetHead
        title="Manage Users | Admin Panel"
        description="Manage user roles and delete users in an admin panel. Now fully responsive and SEO-optimized."
        keywords="user management, admin panel, responsive table, roles"
        author="Your Name"
        logoImage="/favicon.ico"
      />

      <div className="manage-users-container">
        <h1 className="title">Total Users: {users.length}</h1>
        <div className="table-responsive">
          <table className="user-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Power</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{userRows}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
