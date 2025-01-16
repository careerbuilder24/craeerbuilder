import React, { Suspense, useMemo } from "react";
import HelmetHead from "@/app/HelmetHead/HelmetHead"; // Ensure the path is correct
import useUsers from '../../../../../hooks/useUsers'; // Importing the custom hook
import Swal from "sweetalert2"; // Import SweetAlert2
import "./managerUsers.css";

// Lazy load the table rows to optimize rendering
const UserRow = React.memo(({ user, index, handleDelete, handleMakeAdmin }) => (
  <tr key={user.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
    <td>{index + 1}</td>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>
      {user.power === "Admin" ? (
        <span className="admin-badge">Admin</span>
      ) : (
        <button className="make-admin-btn" onClick={() => handleMakeAdmin(user.id)}>
          Make Admin
        </button>
      )}
    </td>
    <td>
      <button className="delete-btn" onClick={() => handleDelete(user.id)}>
        Delete
      </button>
    </td>
  </tr>
));

const ManageUsers = () => {
  const users = useUsers(); // Fetch users data using the custom hook

  // Handle delete action with SweetAlert confirmation
  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform your delete logic here
        console.log(`User with ID: ${userId} deleted`);
        // After deleting, show a success message
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  // Handle make admin action with SweetAlert confirmation
  const handleMakeAdmin = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to make this user an Admin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Make Admin",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform your make admin logic here
        console.log(`User with ID: ${userId} is now an Admin`);
        // After making admin, show a success message
        Swal.fire("Success!", "The user is now an Admin.", "success");
      }
    });
  };

  const userRows = useMemo(
    () => users.map((user, index) => (
      <UserRow 
        key={user.id} 
        user={user} 
        index={index} 
        handleDelete={handleDelete} 
        handleMakeAdmin={handleMakeAdmin}
      />
    )),
    [users]
  );

  return (
    <>
      {/* HelmetHead for SEO and Favicon */}
      <HelmetHead
        title="Manage Users | Admin Panel"
        description="Manage user roles and delete users in an admin panel. Now fully responsive and SEO-optimized."
        keywords="user management, admin panel, responsive table, roles"
        author="Your Name"
        logoImage="/favicon.ico"  // Ensure the favicon is located in the public directory
      />

      {/* Main Container */}
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
