'use client';

import Head from "next/head";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { UserAuth } from "@/app/context/AuthContext";
import useRegistered from "@/hooks/useRegistered";
import useStudentEditProfile from "@/hooks/useStudentEditProfile";
import { ImCross } from "react-icons/im";
import Image from "next/image";

export default function Welcome_Page() {
  const { ManualUser } = UserAuth();
  const [register] = useRegistered();
  const [studentEditProfile] = useStudentEditProfile();
  const [matchedProfile, setMatchedProfile] = useState(null);

// Initially hidden
const [showDiscountModal, setShowDiscountModal] = useState(false);


  const [showJobEnquiry, setShowJobEnquiry] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const pathParts = pathname?.split("/");
  const pageType = pathParts?.[1];
  const pageId = pathParts?.[2];

  const currentTab = searchParams?.get("tab") || "profile";

  // Find logged-in user's profile
  useEffect(() => {
    if (studentEditProfile?.data?.length) {
      const profile = studentEditProfile.data.find(
        (p) => p.email === ManualUser?.email
      );
      setMatchedProfile(profile || null);
    }
  }, [studentEditProfile, ManualUser]);

  // Check if current user email exists in register table
  const MatchedEmail = register?.data?.find(
    (profile) => profile.email === ManualUser?.email
  );
  const isEmailMatched = !!MatchedEmail;

  // Redirect only if user is on the root Welcome_Page
  useEffect(() => {
    if (matchedProfile && isEmailMatched && (!pageType || !pageId)) {
      const { category, id, email } = matchedProfile;
      router.replace(`/${category}/${id}?tab=profile&email=${email}`);
    }
  }, [matchedProfile, isEmailMatched, router, pageType, pageId]);

  const hasProfileMatch = matchedProfile
    ? matchedProfile.category === pageType &&
    matchedProfile.id?.toString() === pageId
    : false;

  const showPage = isEmailMatched && hasProfileMatch;

  // Build hire requests after matchedProfile is available
  const allHireRequests = useMemo(() => {
    if (!matchedProfile) return [];

    return [
      { title: "Job Enquiry", link: "/job-enquiry", special: true, count: 15 },
      { title: "Job Post", link: "/JOBS", count: 8 },
      {
        title: "CV",
        link: `/${matchedProfile.category}/${matchedProfile.id}?tab=profile&email=${matchedProfile.email}`,
      },
      {
        title: "My Portfolio",
        link: `/${matchedProfile.category}/${matchedProfile.id}?tab=portfolio&email=${matchedProfile.email}`,
      },
      {
        title: "Achievements",
        link: `/${matchedProfile.category}/${matchedProfile.id}?tab=achievements&email=${matchedProfile.email}`,
      },
      {
        title: "Blog Post",
        link: `/${matchedProfile.category}/${matchedProfile.id}?tab=blog&email=${matchedProfile.email}`,
      },
      {
        title: "Course",
        link: `/${matchedProfile.category}/${matchedProfile.id}?tab=course&email=${matchedProfile.email}`,
      },
      {
        title: "Certificate",
        link: `/${matchedProfile.category}/${matchedProfile.id}?tab=certificate&email=${matchedProfile.email}`,
      },
      {
        title: "Pictures",
        link: `/${matchedProfile.category}/${matchedProfile.id}?tab=pictures&email=${matchedProfile.email}`,
      },
      {
        title: "Video",
        link: `/${matchedProfile.category}/${matchedProfile.id}?tab=video&email=${matchedProfile.email}`,
      },
      { title: "Study Abroad", link: "/StudyAbroad", special: true },
      { title: "Language Club", link: "/LanguageClub" },
      { title: "University", link: "/University" },
      { title: "Public Blog", link: "/CareerGuide" },
    ];
  }, [matchedProfile]);

  // Tabs content
  const renderTabContent = () => {
    switch (currentTab) {
      case "profile":
        return <p>This is your CV/Profile content.</p>;
      case "portfolio":
        return <p>This is your Portfolio content.</p>;
      case "achievements":
        return <p>This is your Achievements content.</p>;
      case "blog":
        return <p>This is your Blog Posts content.</p>;
      case "course":
        return <p>This is your Courses content.</p>;
      case "certificate":
        return <p>This is your Certificates content.</p>;
      case "pictures":
        return <p>This is your Pictures content.</p>;
      case "video":
        return <p>This is your Videos content.</p>;
      default:
        return <p>Welcome! Select a tab to view content.</p>;
    }
  };

  // Fake HR Data
  const hrData = [
    {
      hrName: "Alice Johnson",
      title: "Frontend Developer",
      country: "USA",
      whatsapp: "+1 9876543210",
      email: "alice.hr@example.com",
      message:
        "Looking for skilled React developers with 3+ years of experience...",
    },
    {
      hrName: "Mohammad Karim",
      title: "Backend Engineer",
      country: "Bangladesh",
      whatsapp: "+880 1712345678",
      email: "karim.hr@example.com",
      message: "Hiring Node.js backend engineers for remote projects...",
    },
  ];

  // Fake latest blogs
  const latestBlogs = [
    {
      id: 1,
      title: "Mastering React in 2025",
      description: "A quick guide...",
      link: "/blog/mastering-react-2025",
    },
    {
      id: 2,
      title: "Top 10 Freelancing Skills",
      description: "Wondering what skills...",
      link: "/blog/top-10-freelancing-skills",
    },
    {
      id: 3,
      title: "How to Build Your Portfolio",
      description: "Your portfolio is key...",
      link: "/blog/how-to-build-portfolio",
    },
    {
      id: 4,
      title: "Next.js 2025 Features",
      description: "What's new in Next.js...",
      link: "/blog/nextjs-2025",
    },
    {
      id: 5,
      title: "Freelancing Tips",
      description: "Best practices...",
      link: "/blog/freelancing-tips",
    },
  ];

  // 🔹 State for discount modal
  // const [showDiscountModal, setShowDiscountModal] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowDiscountModal(true);
  }, 5000); // 3000ms = 3 seconds delay

  return () => clearTimeout(timer); // cleanup if component unmounts
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentBlogIndex((prev) => (prev + 1) % latestBlogs.length);
  }, 5000); // Change blog every 5 seconds

  return () => clearInterval(interval);
}, [latestBlogs.length]);


  // 🔹 Discount Modal UI
  const DiscountModal = () => (
    <AnimatePresence>
      {showDiscountModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-6 w-[26rem] relative flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowDiscountModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
            >
              <ImCross />
            </button>

            {/* Person Image */}
            <div className="relative">
              <Image
                src="https://i.postimg.cc/q7zLbTbP/yf.jpg"
                alt="Person with discount"
                width={250}
                height={250}
                className="mb-4"
              />

              <motion.div
                className="absolute -top-3 right-3 bg-red-600 text-white font-bold text-xl px-4 py-2 rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                50% OFF
              </motion.div>
            </div>

            <p className="text-gray-700 text-center mt-2">
              Limited time offer! Don’t miss this chance
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

  );


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome Page</title>
      </Head>

      {/* 🔹 Show Discount Modal */}
      <DiscountModal />

      {/* Main Page Content */}
      <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center py-6 gap-10">
        {/* Hire Requests + Blogs side by side */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-start justify-between gap-6 px-4">
          {/* Hire Requests */}
          <div className="w-full lg:w-2/3 bg-[#17549A] rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-center text-white">
              Hire Requests
            </h2>
            {showJobEnquiry ? (
              <div className="relative">
                <button
                  onClick={() => setShowJobEnquiry(false)}
                  className="relative text-red-500 font-bold text-sm p-2 rounded-3xl border hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-300 bg-white"
                >
                  <ImCross />
                </button>
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden mt-5">
                  <thead className="bg-white">
                    <tr>
                      <th className="p-3 border">HR Name</th>
                      <th className="p-3 border">Title</th>
                      <th className="p-3 border">Country</th>
                      <th className="p-3 border">WhatsApp</th>
                      <th className="p-3 border">Email</th>
                      <th className="p-3 border">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hrData.map((row, i) => (
                      <tr
                        key={i}
                        className="text-center bg-white hover:bg-gray-50"
                      >
                        <td className="p-2 border">{row.hrName}</td>
                        <td className="p-2 border">{row.title}</td>
                        <td className="p-2 border">{row.country}</td>
                        <td className="p-2 border">{row.whatsapp}</td>
                        <td className="p-2 border">{row.email}</td>
                        <td className="p-2 border">
                          <button
                            onClick={() => setSelectedMessage(row.message)}
                            className="text-blue-600 hover:underline"
                          >
                            Read
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {selectedMessage && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white w-96 rounded-xl shadow-lg p-6 relative">
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
                      >
                        ✕
                      </button>
                      <h2 className="text-lg font-bold mb-3">HR Message</h2>
                      <p className="text-gray-700">{selectedMessage}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-5">
                {allHireRequests.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (item.special) setShowJobEnquiry(true);
                      else router.push(item.link);
                    }}
                    className="cursor-pointer block bg-white hover:bg-[#2CAAE1] hover:text-white duration-300 ease-in-out rounded-xl shadow-md p-4 border hover:shadow-lg transition flex justify-between items-center"
                  >
                    <h3 className="font-semibold text-lg ">{item.title}</h3>
                    {item.count !== undefined && (
                      <span className="text-sm  px-2 py-1 rounded-full text-white bg-red-500 font-bold">
                        {item.count}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Latest Blogs */}
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Latest Blogs
            </h2>
            <div className="relative h-[28rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={latestBlogs[currentBlogIndex].id}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-full"
                >
                  <div className="bg-gray-50 rounded-xl shadow-2xl p-4 border flex flex-col">
                    <img
                      src="https://i.postimg.cc/T3sSBgzD/ojuh.webp"
                      alt={latestBlogs[currentBlogIndex].title}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-lg font-semibold mb-2">
                      {latestBlogs[currentBlogIndex].title}
                    </h3>
                    <p className="text-gray-600 flex-grow">
                      {latestBlogs[currentBlogIndex].description}
                    </p>
                    <button
                      onClick={() =>
                        router.push(latestBlogs[currentBlogIndex].link)
                      }
                      className="mt-3 text-blue-600 font-medium hover:underline self-start"
                    >
                      Read More →
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center items-center">
              <Image
                width={400}
                height={400}
                src={
                  "https://i.postimg.cc/RCDdKpsx/Chat-GPT-Image-Sep-2-2025-11-58-27-AM.png"
                }
                className="w-full md:w-10/12 rounded-full "
                alt="Blog"
              />
            </div>
          </div>
        </div>

        {/* Personal Page with Tabs */}
        {showPage && (
          <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                "profile",
                "portfolio",
                "achievements",
                "blog",
                "course",
                "certificate",
                "pictures",
                "video",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-lg font-medium ${currentTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                    }`}
                  onClick={() =>
                    router.push(
                      `/${matchedProfile.category}/${matchedProfile.id}?tab=${tab}&email=${matchedProfile.email}`
                    )
                  }
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div>{renderTabContent()}</div>
          </div>
        )}
      </div>
    </>
  );
}
