// import useAchievements from "@/hooks/useAchievements";
// import useRegistered from "@/hooks/useRegistered";
// import useStudentEditProfile from "@/hooks/useStudentEditProfile";
// import useUserMatching from "@/hooks/useUserMatching";

// const UploadedAchievements = () => {
//     // state managements
  
//     const {matchedAchievements} = useUserMatching();
 
//     console.log(matchedAchievements); 
//     // console.log(matchedStudent.email); 




//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             <h2 className="text-2xl font-bold mb-4">Uploaded Achievements</h2>
//             {/* if (loading) return <p className="text-center">Loading...</p>;
//             if (error) return <p className="text-center text-red-500">Error: {error}</p>; */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full table-auto border border-gray-300">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="border px-4 py-2">Image</th>
//                             <th className="border px-4 py-2">Achievement Title</th>
//                             <th className="border px-4 py-2">Time</th>
//                             <th className="border px-4 py-2">Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {matchedAchievements?.map((achievement, index) => (
//                             <tr key={index} className="text-center">
//                                 <td className="border px-4 py-2">
//                                     <img
//                                         src={achievement.image_url}
//                                         alt={achievement.text}
//                                         className="w-20 h-20 object-cover mx-auto"
//                                     />
//                                 </td>
//                                 <td className="border px-4 py-2">{achievement.text}</td>
//                                 <td className="border px-4 py-2">{achievement.time}</td>
//                                 <td className="border px-4 py-2">
//                                     {new Date(achievement.date).toLocaleDateString()}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UploadedAchievements;
import Swal from "sweetalert2";
import useUserMatching from "@/hooks/useUserMatching";
import { useState } from "react";

const UploadedAchievements = () => {
  const { matchedAchievements } = useUserMatching();
  const [achievements, setAchievements] = useState([]);





//   const handleDeleteClick = (achievement) => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "Do you really want to delete this achievement?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33",
//     cancelButtonColor: "#3085d6",
//     confirmButtonText: "Yes, delete it!",
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       try {
//         const res = await fetch("/api/achievements", {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ id: achievement.id }),
//         });

//         const data = await res.json();

//         if (data.success) {
//           Swal.fire("Deleted!", "The achievement has been deleted.", "success");
//           // OPTIONAL: Refetch or remove from local list
//         } else {
//           Swal.fire("Error!", data.message, "error");
//         }
//       } catch (error) {
//         Swal.fire("Error!", "Something went wrong", "error");
//       }
//     }
//   });
// };
const handleDeleteClick = (achievement) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this achievement?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      // 👇 Optimistically remove the achievement from UI
      setAchievements((prev) =>
        prev.filter((item) => item.id !== achievement.id)
      );

      try {
        const res = await fetch("/api/achievements", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: achievement.id }),
        });

        const data = await res.json();

        if (!data.success) {
          // If delete failed, re-add the achievement
          setAchievements((prev) => [...prev, achievement]);
          Swal.fire("Error!", data.message, "error");
        } else {
          Swal.fire("Deleted!", "The achievement has been deleted.", "success");
        }
      } catch (error) {
        // Revert UI and show error
        setAchievements((prev) => [...prev, achievement]);
        Swal.fire("Error!", "Something went wrong", "error");
      }
    }
  });
};


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Uploaded Achievements</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Achievement Title</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matchedAchievements?.map((achievement, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">
                  <img
                    src={achievement.image_url}
                    alt={achievement.text}
                    className="w-20 h-20 object-cover mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">{achievement.text}</td>
                <td className="border px-4 py-2">{achievement.time}</td>
                <td className="border px-4 py-2">
                  {new Date(achievement.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteClick(achievement)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadedAchievements;
