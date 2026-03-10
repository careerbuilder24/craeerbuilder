
'use client';
import React, { useState } from 'react';
import useAllUniversityAbroad from '../../../../../hooks/useAllUniversityAbroad';

export default function AllAddAbroadUniversity() {
    const { AddAbroadUniversity, loading, error } = useAllUniversityAbroad();
    const [expandedId, setExpandedId] = useState(null);



    const toggleExpand = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    // Loading state
    if (loading || !AddAbroadUniversity) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }


    console.log(AddAbroadUniversity)
    return (
        <div className="p-6 flex justify-center">
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    All Abroad Universities
                </h2>

                <div className="flex flex-col gap-6">
                    {AddAbroadUniversity.map((uni) => (
                        <div
                            key={uni.id}
                            className="border rounded-lg shadow hover:shadow-lg transition bg-white cursor-pointer p-5"
                            onClick={() => toggleExpand(uni.id)}
                        >
                            {/* Header row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={uni.logo}
                                        alt={`${uni.name} logo`}
                                        className="w-12 h-12 rounded-full object-cover border"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">{uni.name}</h3>
                                        <p className="text-yellow-600 text-sm font-medium">
                                            ⭐ {uni.review}
                                        </p>
                                    </div>
                                </div>

                                <span className="text-blue-600 text-sm font-medium">
                                    {expandedId === uni.id ? '▲ Hide Details' : '▼ View Details'}
                                </span>
                            </div>

                            {/* Collapsible Section */}
                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedId === uni.id ? 'max-h-[600px] mt-3' : 'max-h-0'
                                    }`}
                            >
                                <div className="border-t pt-3 text-sm text-gray-700">
                                    <p>
                                        <span className="font-medium">Country:</span> {uni.country}
                                    </p>
                                    <p>
                                        <span className="font-medium">Tuition:</span> {uni.tuition}
                                    </p>

                                    {uni.mainImage && (
                                        <img
                                            src={uni.mainImage}
                                            alt={uni.name}
                                            className="w-full h-48 object-cover rounded-md mt-3"
                                        />
                                    )}

                                    {/* Show Sections if any */}
                                    {uni.sections && uni.sections.length > 0 && (
                                        <div className="mt-3">
                                            <h4 className="font-semibold mb-2">Sections:</h4>
                                            <ul className="list-disc ml-5 space-y-1">
                                                {uni.sections.map((section, idx) => (
                                                    <li key={idx}>
                                                        {section.title && <strong>{section.title}</strong>}
                                                        {section.description && (
                                                            <p>{section.description}</p>
                                                        )}
                                                        {section.image && (
                                                            <img
                                                                src={section.image}
                                                                alt={section.title || 'Section Image'}
                                                                className="w-full h-32 object-cover rounded-md mt-1"
                                                            />
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

