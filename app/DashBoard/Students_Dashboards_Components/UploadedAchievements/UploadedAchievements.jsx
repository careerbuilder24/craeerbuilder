import { useState } from "react";

const UploadedAchievements = () => {
    // Sample data for demonstration
    const achievements = [
        {
            title: "Best Developer Award",
            image: "https://i.postimg.cc/wMRQ7FyQ/efogh.png",
            date: "2025-05-01",
        },
        {
            title: "Hackathon Winner",
            image: "https://i.postimg.cc/wMRQ7FyQ/efogh.png",
            date: "2025-04-15",
        },
    ];

    // state managements





    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Uploaded Achievements</h2>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">Image</th>
                            <th className="border px-4 py-2">Achievement Title</th>
                            <th className="border px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {achievements.map((achievement, index) => (
                            <tr key={index} className="text-center">
                                <td className="border px-4 py-2">
                                    <img
                                        src={achievement.image}
                                        alt={achievement.title}
                                        className="w-20 h-20 object-cover mx-auto"
                                    />
                                </td>
                                <td className="border px-4 py-2">{achievement.title}</td>
                                <td className="border px-4 py-2">{achievement.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UploadedAchievements;
