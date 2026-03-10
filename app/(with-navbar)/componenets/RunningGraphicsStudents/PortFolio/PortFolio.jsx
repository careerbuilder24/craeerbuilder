
'use client';
import useRegistered from "@/hooks/useRegistered";
import useStudentEditProfile from "@/hooks/useStudentEditProfile";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";

export default function PortFolio({ matchedStudentPortfolio, student }) {
    const [register] = useRegistered(); // registered users
    const registeredUsers = register?.data || [];
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [studentEditProfile] = useStudentEditProfile();
      const [loading, setLoading] = useState(true);

    // Find current student from studentEditProfile
    const studentData = useMemo(() => {
        if (!studentEditProfile?.data || !student) return null;
        return studentEditProfile.data.find(
            s =>
                s.id === student.id ||
                s.email?.trim()?.toLowerCase() === student.email?.trim()?.toLowerCase()
        );
    }, [studentEditProfile, student]);

      // Simulate loading until studentData is ready
      useEffect(() => {
        if (studentData) {
          setLoading(false);
        }
      }, [studentData]);

      if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="loader mb-4 border-4 border-blue-500 border-dashed rounded-full w-12 h-12 animate-spin mx-auto"></div>
          <p className="text-gray-600 text-lg">Loading student CV...</p>
        </div>
      </div>
    );
  }

    // If pending or denied, show restricted message
    if (!studentData || studentData.status !== 'accepted') {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded-xl p-6 max-w-md text-center">
                    <Image
                        src="https://i.postimg.cc/NFcfNNkr/logo.jpg"
                        alt="Restricted"
                        width={300}
                        height={300}
                        className="mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Access Restricted
                    </h2>
                    <p className="text-gray-600 mt-2">
                        This student's detailed information is only visible after admin approval.
                    </p>
                    <p className=" mt-1 text-red-500">
                        (Status: {studentData?.status || 'pending'})
                    </p>
                </div>
            </div>
        );
    }

    // Filter portfolio items to include only portfolios of registered users
    const filteredPortfolio = matchedStudentPortfolio?.filter(item =>
        registeredUsers.some(user =>
            user.email?.trim().toLowerCase() === item.email?.trim().toLowerCase()
        )
    );

    // If accepted but no portfolio exists
    if (!filteredPortfolio || filteredPortfolio.length === 0) {
        return (
            <div className="flex justify-center items-center p-6">
                <p className="text-center text-gray-500">
                    Portfolio is restricted or not available for this student.
                </p>
            </div>
        );
    }

    // Truncate long descriptions
    const truncateText = (text, wordLimit = 30) => {
        const words = text?.split(" ") || [];
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(" ") + "...";
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center text-[#17549A]">
                Portfolios
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
                {filteredPortfolio.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden w-full transition hover:shadow-lg"
                    >
                        <img
                            src={item.file}
                            alt={item.portfolioTitle}
                            className="w-full h-auto object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{item.portfolioTitle}</h2>
                            <p className="text-gray-600">
                                {truncateText(item.description)}{" "}
                                {item.description?.split(" ").length > 30 && (
                                    <button
                                        onClick={() => setSelectedDescription(item.description)}
                                        className="text-blue-500 underline ml-1"
                                    >
                                        Read More
                                    </button>
                                )}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                <strong>Category:</strong> {item.category}
                            </p>
                            {item.webPortfolioLink && (
                                <p className="text-sm text-gray-500 break-all">
                                    <strong>Link:</strong>{" "}
                                    <a
                                        href={item.webPortfolioLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        {item.webPortfolioLink}
                                    </a>
                                </p>
                            )}
                            <p className="text-sm text-gray-400 mt-2">
                                <strong>Date:</strong>{" "}
                                {new Date(item.date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedDescription && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setSelectedDescription(null)}
                >
                    <div
                        className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedDescription(null)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                        >
                            ✖
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Full Description</h2>
                        <p className="text-gray-700">{selectedDescription}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
