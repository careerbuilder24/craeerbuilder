// 'use client';
// import React, { useEffect, useState } from 'react';

// export default function UploadedVideos({ student }) {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // fetch videos for this student
//   useEffect(() => {
//     if (!student?.email) return;

//     const fetchVideos = async () => {
//       try {
//         const res = await fetch(`/api/uploadVideo?email=${student.email}`);
//         const data = await res.json();

//         // ensure videos is always an array
//         if (res.ok) {
//           setVideos(Array.isArray(data.videos) ? data.videos : []);
//         } else {
//           console.error(data.message || 'Failed to fetch videos');
//         }
//       } catch (err) {
//         console.error('Error fetching videos:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, [student?.email]);

//   // safely build embed url
//   const getEmbedUrl = (videoUrl) => {
//     if (!videoUrl || typeof videoUrl !== 'string') return '';
//     const regExp =
//       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//     const match = videoUrl.match(regExp);
//     return match && match[2]
//       ? `https://www.youtube.com/embed/${match[2]}`
//       : '';
//   };

//   if (loading) {
//     return <p className="text-center">Loading videos...</p>;
//   }

//   if (!videos.length) {
//     return <p className="text-center">No videos uploaded yet.</p>;
//   }

//   return (
//     <div className="flex flex-wrap justify-center gap-6 w-full container mx-auto">
//       {videos.map((video, index) => {
//         // Handle both string and object shape
//         const url = typeof video === 'string' ? video : video.youtube_url;

//         return (
//           <div
//             key={index}
//             className="relative border border-gray-300 p-3 rounded-lg bg-white shadow-sm flex flex-col items-center"
//             style={{
//               flex: '0 0 28%', // ~3 per row
//               minWidth: '200px',
//             }}
//           >
//             <iframe
//               width="100%"
//               height="220"
//               src={getEmbedUrl(url)}
//               title={`video-${index}`}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
'use client';
import React, { useEffect, useState, useMemo } from 'react';
import useStudentEditProfile from '@/hooks/useStudentEditProfile';
import Image from 'next/image';

export default function UploadedVideos({ student }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentEditProfile] = useStudentEditProfile();


  // Find current student data
  const studentData = useMemo(() => {
    if (!studentEditProfile?.data || !student) return null;
    return studentEditProfile.data.find(
      s =>
        s.id === student.id ||
        s.email?.trim()?.toLowerCase() === student.email?.trim()?.toLowerCase()
    );
  }, [studentEditProfile, student]);

  // fetch videos for this student
  useEffect(() => {
    if (!student?.email) return;

    const fetchVideos = async () => {
      try {
        const res = await fetch(`/api/uploadVideo?email=${student.email}`);
        const data = await res.json();

        if (res.ok) {
          setVideos(Array.isArray(data.videos) ? data.videos : []);
        } else {
          console.error(data.message || 'Failed to fetch videos');
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [student?.email]);

  // safely build embed url
  const getEmbedUrl = (videoUrl) => {
    if (!videoUrl || typeof videoUrl !== 'string') return '';
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    return match && match[2]
      ? `https://www.youtube.com/embed/${match[2]}`
      : '';
  };
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
  // Render restricted view if not accepted
  const isRestricted = !studentData || studentData.status !== 'accepted';

  return isRestricted ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md text-center">
        <Image
          src="https://i.postimg.cc/NFcfNNkr/logo.jpg"
          alt="Restricted"
          width={300}
          height={300}
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800">Access Restricted</h2>
        <p className="text-gray-600 mt-2">
          This student's videos are only visible after admin approval.
        </p>
        <p className="text-gray-500 mt-1">
          (Status: {studentData?.status || 'pending'})
        </p>
      </div>
    </div>
  ) : loading ? (
    <p className="text-center">Loading videos...</p>
  ) : !videos.length ? (
    <p className="text-center">No videos uploaded yet.</p>
  ) : (
    <div className="flex flex-wrap justify-center gap-6 w-full container mx-auto">
      {videos.map((video, index) => {
        const url = typeof video === 'string' ? video : video.youtube_url;

        return (
          <div
            key={index}
            className="relative border border-gray-300 p-3 rounded-lg bg-white shadow-sm flex flex-col items-center"
            style={{ flex: '0 0 28%', minWidth: '200px' }}
          >
            <iframe
              width="100%"
              height="220"
              src={getEmbedUrl(url)}
              title={`video-${index}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      })}
    </div>
  );
}
