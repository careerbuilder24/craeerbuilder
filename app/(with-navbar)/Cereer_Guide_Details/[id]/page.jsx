'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';
import { PiHandsClappingFill } from "react-icons/pi";
import { BiSolidDislike } from "react-icons/bi";
import Navbar from '../../componenets/Navbar/Navbar';
import Footer from '../../componenets/Footer/Footer';
import useCareerGuide from '@/hooks/useCareerGuide';
import { IoBookmarksOutline } from "react-icons/io5";
import { BsShare } from "react-icons/bs";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { TfiComments } from "react-icons/tfi";
import { IoReturnDownForwardOutline } from "react-icons/io5"
import { FaComment, FaCommentDots } from 'react-icons/fa';
import { PiChatCircleTextBold } from "react-icons/pi";
import { FaRegEyeSlash } from "react-icons/fa"; // Another icon for hidden state
import Chatbot from '../../componenets/chatBot/Chatbot';

export default function Page() {
    const [liked, setLiked] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [commented, setCommented] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [disliked, setDisliked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [text, setText] = useState('');
    // State to manage the posted reply text (frozen after clicking "Reply")
    const [postedText, setPostedText] = useState('');
    // State to manage whether the reply has been posted
    const [replyPosted, setReplyPosted] = useState(false);

    const [collapsedComments, setCollapsedComments] = useState({})
    const [dislikeCount, setDislikeCount] = useState(0);
    const [replyText, setReplyText] = useState({});
    const [visibleReplies, setVisibleReplies] = useState({});

 



    // Get the `id` from the URL using useParams
    const { id } = useParams();

    // Fetch career guide data and loading state
    const [CareerGuide, loading] = useCareerGuide();

    // Find the specific career guide item based on `id`
    const careerItem = CareerGuide?.find(item => item.id === Number(id));

    // Loading and error states
    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!careerItem) {
        return (
            <div>
                <p>Career item not found.</p>
            </div>
        );
    }

    // Handle Like Button click
    const handleLikeClick = () => {
        if (!liked) {
            setLikeCount(likeCount + 1);  // Increase like count
            setLiked(true);  // Set liked to true
        } else {
            setLikeCount(likeCount - 1);  // Decrease like count if already liked
            setLiked(false);  // Set liked to false
        }

        if (disliked) {
            setDisliked(false);  // Reset dislike if like is clicked
            setDislikeCount(dislikeCount - 1);  // Decrease dislike count
        }
    };

    // Handle Dislike Button click
    const handleDislikeClick = () => {
        if (!disliked) {
            setDislikeCount(dislikeCount + 1);  // Increase dislike count
            setDisliked(true);  // Set disliked to true
        } else {
            setDislikeCount(dislikeCount - 1);  // Decrease dislike count if already disliked
            setDisliked(false);  // Set disliked to false
        }

        if (liked) {
            setLiked(false);  // Reset like if dislike is clicked
            setLikeCount(likeCount - 1);  // Decrease like count
        }
    };

    const handleCommentClick = () => {
        setCommented(!commented);
        setCommentCount(commented ? commentCount - 1 : commentCount + 1); // Toggle count
    };



    const toggleMoreOptions = () => {
        setShowMoreOptions(!showMoreOptions);
    };




    // Toggle the expansion of the textarea
    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const handleCommentSubmit = () => {
        if (newComment.trim() === '') return;

        // Add the new comment to the list
        setComments([
            ...comments,
            { id: Date.now(), text: newComment, replies: [] }
        ]);
        setNewComment(''); // Clear the text area
        setIsExpanded(false); // Collapse the text area after submission
    };


    const handleReplyChange = (commentId, value) => {
        setReplyText((prev) => ({
            ...prev,
            [commentId]: value,
        }));
    };


    const handleReplySubmit = (commentId) => {
        const replyContent = replyText[commentId];
        if (replyContent.trim() === '') return;

        setComments(comments.map((comment) =>
            comment.id === commentId
                ? {
                    ...comment,
                    replies: [
                        ...comment.replies,
                        { id: Date.now(), text: replyContent },
                    ],
                }
                : comment
        ));

        // Clear the reply input after submitting
        setReplyText((prev) => ({
            ...prev,
            [commentId]: '', // Clear the reply input for this specific comment
        }));
    };

    // Toggle collapse state for replies
    const toggleCollapse = (commentId) => {
        setCollapsedComments((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId], // Toggle the collapse state for the specific comment
        }));
    };

    const calculateTimeAgo = (timestamp) => {
        const now = new Date();
        const diff = now - new Date(timestamp);
        const minutes = Math.floor(diff / 60000); // Difference in minutes
        const hours = Math.floor(diff / 3600000); // Difference in hours
        const days = Math.floor(diff / 86400000); // Difference in days

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
        return 'Just now';
    };



    // Function to toggle visibility of the text area for a specific reply
    const toggleTextAreaVisibility = (replyId) => {
        setVisibleReplies((prev) => ({
            ...prev,
            [replyId]: !prev[replyId], // Toggle the visibility for the clicked reply
        }));
    };


    // Handle change in textarea
    const handleTextChange = (event) => {
        setText(event.target.value);  // Update the text state as the user types
    };

    // Handle reply button click
    const handleReplyClick = () => {
        if (text.trim() !== '') {  // Ensure text isn't empty before posting
            setPostedText(text);  // Store the text as the posted reply
            setReplyPosted(true);  // Set replyPosted to true
        }
    };
    return (
        <>
            <Navbar />
            <main>
                <div className='lg:mt-24  mt-20'>
                    <section className="mb-12 bg-[#F1F2F4] py-10">
                        <div className="container mx-auto text-center">
                            <div className="flex flex-col md:flex-col lg:flex-row justify-between gap-5 ">


                                {/* Left Section - Category */}
                                <div className={`bg-white p-6 rounded-lg shadow-md w-full md:w-3/12 transition-all duration-300 h-[400px] sticky top-32 hidden lg:block`}>
                                    <div className='bg-[#17549A] p-2'>
                                        <h1 className="text-xl font-medium text-white">Blog Category</h1>
                                        <input
                                            type="text"
                                            className="mt-4 p-2 border border-gray-300 rounded-md w-full"
                                            placeholder="Enter category name"
                                        />
                                    </div>

                                    {/* Checkboxes for Categories */}
                                    {['Web Development', 'Web Design', 'Graphic Design', 'SEO', 'Digital Marketing'].map((category, index) => (
                                        <div className="flex gap-3 mt-1" key={index}>
                                            <input type="checkbox" name="category" id={`category-${index}`} />
                                            <label htmlFor={`category-${index}`} className="text-sm text-gray-700">
                                                {category} {/* Displaying the category name here */}
                                            </label>
                                        </div>
                                    ))}
                                </div>


                                {/*  Main Blog Content */}
                                <div className="p-3 w-full md:w-10/12 h-auto   bg-white py-5 ">
                                    {/* Main Heading */}
                                    <h1 className="text-4xl font-extrabold mr-36 mt-3.5">React Hooks to use</h1>

                                    {/* Main Blog Content */}
                                    <div className="container mx-auto">
                                        {/* Image Section */}
                                        <div className="flex flex-col items-center">
                                            <Image
                                                height={500}
                                                width={500}
                                                src={careerItem.image}
                                                className="rounded-lg w-full lg:w-8/12 h-full mt-3"
                                                alt={careerItem.title || 'Career Guide Image'}
                                            />

                                            {/* Link */}
                                            <h2 className="cursor-pointer text-green-900 hover:underline mt-2">https://react-hot-toast.com/docs</h2>
                                        </div>
                                    </div>

                                    {/* User Info Section */}
                                    <div className="mt-10 bg-white p-5 rounded-lg border-y container mx-auto">
                                        <div className="flex flex-col md:flex-row gap-4 items-center">
                                            {/* User Profile Image */}
                                            <img
                                                src="https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt="User Avatar"
                                                className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                                            />

                                            {/* User Info */}
                                            <div className="flex flex-col text-left flex-grow">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-bold">John Doe</h3>
                                                    <p className="text-green-800 cursor-pointer hover:underline">Follow</p>
                                                </div>
                                                <p className="text-sm text-gray-600">2min read | Dec 16, 2024</p>
                                            </div>

                                            {/* Right side icons section */}
                                            <div className="flex gap-4 items-center mt-4 md:mt-0">
                                                {/* Favorite Button */}
                                                <IoBookmarksOutline
                                                    size={20}
                                                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                                                    title="Bookmark"
                                                />

                                                {/* Share Button */}
                                                <BsShare
                                                    size={20}
                                                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                                                    title="Share"
                                                />

                                                {/* More Options Button */}
                                                <PiDotsThreeOutlineFill
                                                    size={20}
                                                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                                                    title="More options"
                                                    onClick={toggleMoreOptions}  // Toggling visibility of options
                                                />

                                                {/* More options section */}
                                                {showMoreOptions && (
                                                    <div className="mt-2 p-4 bg-gray-50 rounded-lg shadow-md absolute bottom-10 w-48 z-10">
                                                        <ul className="space-y-2">
                                                            <li className="cursor-pointer text-blue-600 hover:underline">Follow Author</li>
                                                            <li className="cursor-pointer text-red-600 hover:underline">Unfollow</li>
                                                            <li className="cursor-pointer text-yellow-600 hover:underline">Report</li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Like & Dislike Section - Centered */}
                                        <div className="flex justify-center gap-4 items-center mt-2">  {/* Changed mt-4 to mt-2 to reduce space */}
                                            {/* Like Button */}
                                            <PiHandsClappingFill
                                                onClick={handleLikeClick}
                                                size={20}
                                                className={`cursor-pointer ${liked ? 'text-[#17549A]' : 'text-gray-600'}`}
                                            />
                                            <p>{likeCount}</p>

                                            {/* Dislike Button */}
                                            <BiSolidDislike
                                                onClick={handleDislikeClick}
                                                size={20}
                                                className={`cursor-pointer ${disliked ? 'text-red-600' : 'text-gray-600'}`}
                                            />
                                            <p>{dislikeCount}</p>
                                            <TfiComments
                                                onClick={handleCommentClick}
                                                size={20}
                                                className={`cursor-pointer ${commented ? 'text-green-600' : 'text-gray-600'}`}  // Green when clicked
                                            />

                                            <p>{commentCount}</p>
                                        </div>
                                    </div>






                                    <div className="my-16 max-w-prose mx-auto px-4 ">
                                        <p className="font-serif  text-xl text-gray-800 leading-relaxed text-justify">
                                            Toast notifications are those little messages that briefly appear on a website or app to let you know something happened. Whether it’s a success message, an error alert, or a notification of some sort. In this blog, I’ll show you how to add these toast notifications to your Next.js application using the react-hot-toast library.
                                        </p>

                                        <p className='text-2xl font-extrabold text-left text-justify my-5'>Why Toast Notifications?</p>

                                        <p className="font-serif text-left text-justify text-xl text-gray-800 leading-relaxed my-5">
                                            Think of toast notifications as a polite tap on the shoulder, delivering information without causing any disruptions. They’re a user-friendly way to share updates and feedback.
                                        </p>

                                        <p className="font-serif text-left text-xl text-justify text-gray-800 leading-relaxed my-5">
                                            “Toast notifications are a common feature used by many big websites and applications. For instance, Gmail employs toast notifications to confirm the successful sending of emails. Twitter uses these notifications for new tweets, mentions, and direct messages. Many more brands like Facebook, GitHub, Slack, WhatsApp etc use toast notifications for delivering information”
                                        </p>

                                        <p className='text-2xl font-extrabold text-left my-5 text-justify'>Let’s Setup Our Next.js app for ‘react-hot-toast’</p>

                                        <p className="font-serif text-left text-xl text-gray-800 leading-relaxed my-5">
                                            We are going to see, when user clicks on a button, a toast of ‘you did it’ will appear on the screen.
                                        </p>

                                        <p className='text-2xl font-extrabold text-left my-10'>Step 1: Installing react-hot-toast</p>

                                        {/* The div around the last <p> tag with vertical line */}
                                        <div className="flex items-center">

                                            <p className="font-serif text-left text-xl text-gray-800 leading-relaxed my-5 pl-4 border-l-4 border-gray-600">
                                                npm install react-hot-toast
                                            </p>
                                        </div>


                                        <p className='text-2xl font-extrabold text-left my-5'>Step 2: Add toaster component above children in layout.js for app router.</p>

                                        <div className="flex items-center">

                                            <p className="font-serif text-left text-xl text-gray-800 leading-relaxed my-5 pl-4 border-l-4 border-gray-600">
                                                Note — added line 17 into the default layout.js file.
                                            </p>
                                        </div>



                                        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-10">
                                            <code>
                                                {/* Main Blog Content */}
                                                &lt;div className="container mx-auto"&gt;
                                                &lt;!-- Image Section --&gt;
                                                &lt;div className="flex flex-col items-center"&gt;
                                                &lt;Image
                                                height={500}
                                                width={500}
                                                src={careerItem.image}
                                                className="rounded-lg w-full lg:w-8/12 h-full mt-3"
                                                alt={careerItem.title || 'Career Guide Image'}
                                                /&gt;

                                                &lt;!-- Link --&gt;
                                                &lt;h2 className="cursor-pointer text-green-900 hover:underline mt-2"&gt;https://react-hot-toast.com/docs&lt;/h2&gt;
                                                &lt;/div&gt;
                                                &lt;/div&gt;

                                                &lt;!-- User Info Section --&gt;
                                                &lt;div className="mt-10 bg-white p-5 rounded-lg border-y container mx-auto"&gt;
                                                ...
                                                &lt;/div&gt;
                                            </code>
                                        </pre>

                                        <p className="font-serif text-left text-xl text-gray-800 leading-relaxed my-5 text-justify">
                                            <strong>Toster position —</strong> Toast position determines where on the screen toast notifications should appear. You can choose positions like top-right for a balanced view or bottom-left for less intrusiveness. The choice depends on your design and the level of attention you want to draw to notifications.
                                        </p>


                                        <p className='text-2xl font-extrabold text-left my-5'>Step 3: Displaying Toast Notifications</p>



                                        <div className="flex items-center">

                                            <p className="font-serif text-left text-justify text-xl text-gray-800 leading-relaxed my-5 pl-4 border-l-4 border-gray-600">
                                                Note — import toast.js (file where you are using toast, don’t get confused with the name) into our page.js (page.js is in the same folder with layout.js)
                                            </p>
                                        </div>







                                        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                                            <code>
                                                {`import { toast } from 'react-hot-toast';\n\nfunction MyComponent() {\n  const handleButtonClick = () => {\n    toast.success('You did it!'); // Displays a success message\n  };\n\n  return (\n    <div>\n      <button onClick={handleButtonClick}>Show Success Toast</button>\n    </div>\n  );\n}`}
                                            </code>
                                        </pre>

                                        <div className="flex items-center">

                                            <p className="font-serif text-left text-xl text-gray-800 leading-relaxed  pl-4 border-l-4 border-gray-600 my-10">
                                                Note — You can also customise and use different toast styles, refer official docs for that. <Link href={'https://react-hot-toast.com/docs'} className='hover:underline font-bold text-green-800'>https://react-hot-toast.com/docs</Link>
                                            </p>
                                        </div>

                                        <p className="font-serif text-left text-xl text-gray-800 leading-relaxed my-5 text-justify">
                                            Adding toast notifications to your Next.js app is an easy way to communicate with users without interrupting their experience. With react-hot-toast, you can make your website or app more user-friendly and interactive. Happy coding!
                                        </p>

                                        <p className="font-serif text-left text-xl text-gray-800 leading-relaxed my-5 font-bold">
                                            Follow me here —
                                        </p>

                                        <div className="font-serif text-left text-xl text-gray-800 leading-relaxed my-5">

                                            <strong>Twitter- </strong> <Link className='text-green-800 cursor-pointer hover:underline' href={'https://x.com/AbuYeahia240'}>https://x.com/AbuYeahia240</Link>
                                        </div>

                                        <div className="font-serif text-left text-xl text-gray-800 leading-relaxed my-5">
                                            <strong>Linkedin-</strong> <Link className='text-green-800 cursor-pointer hover:underline' href={'https://www.linkedin.com/in/abu-yeahia-b290931b9/'}>https://www.linkedin.com/in/abu-yeahia-b290931b9/</Link>
                                        </div>




                                        <div className="flex space-x-4 my-10">
                                            <div className='w-3/12 hover:text-[gray] hover:shadow-md h-10 bg-[#F2F2F2]  text-sm flex items-center justify-center rounded-2xl cursor-pointer'>
                                                <p className='text-center'>Toast</p>
                                            </div>
                                            <div className='w-3/12 hover:text-[gray] hover:shadow-md h-10 bg-[#F2F2F2]  text-sm flex items-center justify-center rounded-2xl cursor-pointer'>
                                                <p className='text-center'>Next.js</p>
                                            </div>
                                            <div className='w-3/12 hover:text-[gray] hover:shadow-md h-10 bg-[#F2F2F2]  text-sm flex items-center justify-center rounded-2xl cursor-pointer'>
                                                <p className='text-center'>JavaScript</p>
                                            </div>
                                            <div className='w-3/12 hover:text-[gray] hover:shadow-md h-10 bg-[#F2F2F2]  text-sm flex items-center justify-center rounded-2xl cursor-pointer'>
                                                <p className='text-center'>Technology</p>
                                            </div>
                                        </div>








                                        {/* again share option */}

                                        {/* User Info Section */}
                                        <div className="mt-10 bg-white p-5 rounded-lg border-y container mx-auto">
                                            <div className="flex flex-col md:flex-row lg:justify-between gap-4 items-center">

                                                {/* Like & Dislike Section - Centered */}
                                                <div className="flex justify-center gap-4 items-center mt-2">  {/* Changed mt-4 to mt-2 to reduce space */}
                                                    {/* Like Button */}
                                                    <PiHandsClappingFill
                                                        onClick={handleLikeClick}
                                                        size={20}
                                                        className={`cursor-pointer ${liked ? 'text-[#17549A]' : 'text-gray-600'}`}
                                                    />
                                                    <p>{likeCount}</p>

                                                    {/* Dislike Button */}
                                                    <BiSolidDislike
                                                        onClick={handleDislikeClick}
                                                        size={20}
                                                        className={`cursor-pointer ${disliked ? 'text-red-600' : 'text-gray-600'}`}
                                                    />
                                                    <p>{dislikeCount}</p>
                                                    <TfiComments
                                                        onClick={handleCommentClick}
                                                        size={20}
                                                        className={`cursor-pointer ${commented ? 'text-green-600' : 'text-gray-600'}`}  // Green when clicked
                                                    />

                                                    <p>{commentCount}</p>
                                                </div>



                                                {/* Right side icons section */}
                                                <div className="flex gap-4 items-center mt-4 md:mt-0">
                                                    {/* Favorite Button */}
                                                    <IoBookmarksOutline
                                                        size={20}
                                                        className="cursor-pointer text-gray-600 hover:text-gray-800"
                                                        title="Bookmark"
                                                    />

                                                    {/* Share Button */}
                                                    <BsShare
                                                        size={20}
                                                        className="cursor-pointer text-gray-600 hover:text-gray-800"
                                                        title="Share"
                                                    />




                                                </div>
                                            </div>




                                        </div>

                                        {/* prfile follow section */}
                                        <div className="flex flex-col md:flex-row lg:justify-between gap-4 items-center  mt-5">

                                            {/* Like & Dislike Section - Centered */}
                                            {/* User Profile Image */}
                                            <img
                                                src="https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                alt="User Avatar"
                                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                                            />

                                            {/* User Info */}
                                            <div className="flex flex-col text-left flex-grow ">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-bold">John Doe</h3>
                                                    {/* <p className="text-green-800 cursor-pointer hover:underline">Follow</p> */}
                                                </div>
                                                <p className="text-sm text-gray-600">Web Developer</p>
                                            </div>

                                            {/* Right side icons section */}



                                            <div className='w-16 hover:text-[gray] hover:shadow-md h-10 bg-[black] text-white  text-sm flex items-center justify-center rounded-2xl cursor-pointer'>
                                                <p className='text-center'>Follow</p>
                                            </div>

                                        </div>



                                        <div className=" w-full h-fit mt-10 ">
                                            <h3 className="text-2xl font-bold text-left">Responses ({comments.length})</h3>

                                            {/* Comment Input Area with Smooth Animation */}
                                            <div className="mt-6">
                                                <textarea
                                                    className={`w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out
                ${isExpanded ? 'h-32' : 'h-10'} 
                transform ${isExpanded ? 'scale-100' : 'scale-95'}`}
                                                    placeholder="Add a comment..."
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}  // Update new comment state
                                                    onClick={handleExpand}  // Toggle expand/collapse when clicked
                                                ></textarea>

                                                {/* Buttons to submit or cancel */}
                                                {isExpanded && (
                                                    <div className="flex justify-end mt-2 gap-5">
                                                        <button
                                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                                                            onClick={handleCommentSubmit} // Submit comment
                                                        >
                                                            Post Response
                                                        </button>

                                                        <button
                                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                            onClick={handleExpand} // Toggle collapse when clicked
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-4">
                                                {comments
                                                    .sort((a, b) => b.id - a.id) // Sort comments to display the latest first
                                                    .map((comment, index) => {
                                                        const isNewComment = index === 0; // The first comment after sorting is the most recent
                                                        return (
                                                            <div key={comment.id} className="flex gap-4 mt-4 p-4 bg-white   relative">
                                                                {/* Vertical Line for Parent Comment */}
                                                                <div className={`absolute left-0 top-0 w-[0.5px] bg-gray-300 transition-all duration-300 ${index === 0 ? 'h-full' : 'h-[calc(100%+10px)]'}`} />



                                                                <div className="flex flex-col w-full pl-12 relative">
                                                                    <div className="flex items-start gap-4">
                                                                        <img
                                                                            src="https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                                            alt="User Avatar"
                                                                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                                                                        />
                                                                        <div>
                                                                            <div className="flex items-center">
                                                                                <p className="font-bold">{comment.userName || 'John Doe'}</p>
                                                                                <span className="ml-2 text-xs text-gray-500">
                                                                                    {/* Display time ago */}
                                                                                    {calculateTimeAgo(comment.timestamp)}
                                                                                </span>
                                                                            </div>
                                                                            <p className="text-sm text-gray-700 text-justify">{comment.text}</p> {/* Justified text */}
                                                                        </div>




                                                                    </div>

                                                                    {/* Like & Dislike & comment Section - Centered */}
                                                                    <div className='flex gap-4 mt-2'>



                                                                        <div className="flex items-center  gap-1">
                                                                            <PiHandsClappingFill
                                                                                onClick={handleLikeClick}
                                                                                size={16}
                                                                                className={`cursor-pointer ${liked ? 'text-[#17549A]' : 'text-gray-600'}`}
                                                                            />
                                                                            <p className='text-xs'>{likeCount}</p>
                                                                        </div>

                                                                        {/* Dislike Button */}
                                                                        <div className="flex items-center gap-1">
                                                                            <BiSolidDislike
                                                                                onClick={handleDislikeClick}
                                                                                size={16}
                                                                                className={`cursor-pointer ${disliked ? 'text-red-600' : 'text-gray-600'}`}
                                                                            />
                                                                            <p className='text-xs'>{dislikeCount}</p>

                                                                        </div>

                                                                        {/* Button to collapse/expand replies */}
                                                                        <button
                                                                            className="text-blue-500  flex items-center gap-2"
                                                                            onClick={() => toggleCollapse(comment.id)}
                                                                        >
                                                                            {/* Toggle between 'Show Replies' and 'Hide Replies' with icons */}
                                                                            {collapsedComments[comment.id] ? (
                                                                                <>
                                                                                    <FaComment className="text-sm" /> {/* Icon for show replies */}
                                                                                    <p className='text-sm'>Replies</p>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <FaCommentDots className="text-sm" /> {/* Icon for hide replies */}
                                                                                    <p className='text-sm'> Hide</p>
                                                                                </>
                                                                            )}
                                                                        </button>

                                                                    </div>




                                                                    {/* Replies Section */}
                                                                    {!collapsedComments[comment.id] && (
                                                                        <div className="mt-4 pl-6">
                                                                            {comment.replies.map((reply, replyIndex) => {
                                                                                const depth = reply.depth || 0;
                                                                                const maxIndentLevel = 3;
                                                                                const indent = depth < maxIndentLevel ? (depth + 1) * 20 : 0;

                                                                                return (
                                                                                    <div
                                                                                        key={reply.id}
                                                                                        className="flex items-start gap-4 mt-2 p-2 relative "
                                                                                        style={{ paddingLeft: `${indent}px` }}
                                                                                    >
                                                                                        {/* Vertical Line for Reply */}
                                                                                        <div
                                                                                            className={`absolute left-0 top-0 w-[0.5px] bg-gray-300 transition-all duration-300 ${replyIndex === 0 ? 'h-full' : 'h-[calc(100%+10px)]'}`}
                                                                                        />
                                                                                        {/* User Avatar */}
                                                                                        <img
                                                                                            src="https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                                                            alt="User Avatar"
                                                                                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                                                                                        />


                                                                                        <div className="flex flex-col w-full">


                                                                                            <div className="flex items-center">
                                                                                                <p className="font-bold">{reply.userName || 'Jane Doe'}</p>
                                                                                                <span className="lg:ml-2 text-xs text-gray-500">
                                                                                                    {/* Display time ago for replies */}
                                                                                                    {calculateTimeAgo(reply.timestamp)}
                                                                                                </span>
                                                                                            </div>

                                                                                            <p className="text-sm text-gray-700 text-justify mt-1">{reply.text}</p> {/* Justified text */}
                                                                                            {reply.repliedTo && (
                                                                                                <p className="text-xs text-gray-500">
                                                                                                    Replied to {reply.repliedTo}
                                                                                                </p>
                                                                                            )}



                                                                                            {/* Like & Dislike & comment Section - Centered */}
                                                                                            <div className='flex gap-4 mt-2'>



                                                                                                <div className="flex items-center gap-1">
                                                                                                    <PiHandsClappingFill
                                                                                                        onClick={handleLikeClick}
                                                                                                        size={16}
                                                                                                        className={`cursor-pointer ${liked ? 'text-[#17549A]' : 'text-gray-600'}`}
                                                                                                    />
                                                                                                    <p className='text-xs'>{likeCount}</p>
                                                                                                </div>

                                                                                                {/* Dislike Button */}
                                                                                                <div className="flex items-center gap-1">
                                                                                                    <BiSolidDislike
                                                                                                        onClick={handleDislikeClick}
                                                                                                        size={16}
                                                                                                        className={`cursor-pointer ${disliked ? 'text-red-600' : 'text-gray-600'}`}
                                                                                                    />
                                                                                                    <p className='text-xs'>{dislikeCount}</p>

                                                                                                </div>
                                                                                                {/* Button to toggle visibility */}

                                                                                                <button
                                                                                                    onClick={() => toggleTextAreaVisibility(reply.id)}
                                                                                                    className="flex items-center gap-2"
                                                                                                >
                                                                                                    {visibleReplies[reply.id] ? (
                                                                                                        // <FaRegEyeSlash size={16} />

                                                                                                        <p className='text-blue-500 text-xs font-bold'>Reply</p>
                                                                                                    ) : (
                                                                                                        <p className='text-blue-500 text-xs font-bold'>Reply</p>
                                                                                                    )}
                                                                                                </button>
                                                                                            </div>




                                                                                            {visibleReplies[reply.id] && (
                                                                                                <>
                                                                                                    <textarea
                                                                                                        className="w-full p-2 border-2 border-gray-300 rounded-lg"
                                                                                                        placeholder="Reply..."

                                                                                                    ></textarea>
                                                                                                    <div className="flex justify-end mt-2">
                                                                                                        {/* Align button to the right */}
                                                                                                        <button
                                                                                                            className="px-2 py-1 text-sm bg-[#17549A] text-white rounded-lg transition-all ease-in-out duration-300 hover:bg-[#2CAAE1]"

                                                                                                        >
                                                                                                            Reply
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </>
                                                                                            )}






                                                                                            {/* nexted */}



                                                                                        </div>

                                                                                        {/* arrow icon */}
                                                                                        {replyIndex > 0 && (
                                                                                            <div className="absolute left-0 -top-4 flex items-center justify-center text-gray-500">
                                                                                                <div className="text-3xl">
                                                                                                    <IoReturnDownForwardOutline />
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                );
                                                                            })}

                                                                            {/* Reply Input Area */}
                                                                            <div className="mt-2 flex flex-col">
                                                                                <textarea
                                                                                    className="w-full p-2 border-2 border-gray-300 rounded-lg"
                                                                                    placeholder="Reply..."
                                                                                    value={replyText[comment.id] || ''}
                                                                                    onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                                                                                ></textarea>

                                                                                <div className="flex justify-end mt-2">
                                                                                    {/* Align button to the right */}
                                                                                    <button
                                                                                        className="px-2 py-1 text-sm bg-[#17549A] text-white rounded-lg transition-all ease-in-out duration-300 hover:bg-[#2CAAE1]"
                                                                                        onClick={() => handleReplySubmit(comment.id)}
                                                                                    >
                                                                                        Reply
                                                                                    </button>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    )}



                                                                </div>


                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        </div>




                                    </div>





                                </div>

                                {/* Right Section - Recent Top Blogs */}
                                <div className="bg-white rounded-lg shadow-lg w-full lg:w-4/12 h-[500px]  overflow-hidden">
                                    <h3 className="text-blue-600 text-center text-2xl font-semibold mb-6">Recent Top Blogs</h3>

                                    {/*Top Recent Blog List */}
                                    <div className="space-y-6 px-2 max-h-[400px] overflow-y-auto ">
                                        <div className="flex flex-col md:flex-row items-center gap-5 shadow-lg rounded-lg ">
                                            {/* Blog Image */}

                                            <Image
                                                height={300}
                                                width={300}
                                                src={careerItem.image}
                                                className="rounded-lg w-5/12 h-auto object-cover shadow-lg"
                                                alt={careerItem.title || 'Career Guide Image'}
                                            />


                                            {/* Blog Text */}


                                            <p className=" text-gray-600 line-clamp-4 text-xs text-left"> {/* Adding line-clamp for text overflow */}
                                                Lorem ipsum dolor Lorem ipsum dolor m dolor Lorem ipsum dolor,<Link href="#" className="text-blue-600 hover:underline  font-medium">Read more...</Link>
                                            </p>


                                        </div>
                                        <div className="flex flex-col md:flex-row items-center gap-5 shadow-lg rounded-lg">
                                            {/* Blog Image */}

                                            <Image
                                                height={300}
                                                width={300}
                                                src={careerItem.image}
                                                className="rounded-lg w-5/12 h-auto object-cover shadow-lg"
                                                alt={careerItem.title || 'Career Guide Image'}
                                            />


                                            {/* Blog Text */}


                                            <p className=" text-gray-600 line-clamp-4 text-xs text-left"> {/* Adding line-clamp for text overflow */}
                                                Lorem ipsum dolor Lorem ipsum dolor m dolor Lorem ipsum dolor,<Link href="#" className="text-blue-600 hover:underline  font-medium">Read more...</Link>
                                            </p>


                                        </div>
                                        <div className="flex flex-col md:flex-row items-center gap-5 shadow-lg rounded-lg">
                                            {/* Blog Image */}

                                            <Image
                                                height={300}
                                                width={300}
                                                src={careerItem.image}
                                                className="rounded-lg w-5/12 h-auto object-cover shadow-lg"
                                                alt={careerItem.title || 'Career Guide Image'}
                                            />


                                            {/* Blog Text */}


                                            <p className=" text-gray-600 line-clamp-4 text-xs text-left"> {/* Adding line-clamp for text overflow */}
                                                Lorem ipsum dolor Lorem ipsum dolor m dolor Lorem ipsum dolor,<Link href="#" className="text-blue-600 hover:underline  font-medium">Read more...</Link>
                                            </p>


                                        </div>
                                        <div className="flex flex-col md:flex-row items-center gap-5 shadow-lg rounded-lg">
                                            {/* Blog Image */}

                                            <Image
                                                height={300}
                                                width={300}
                                                src={careerItem.image}
                                                className="rounded-lg w-5/12 h-auto object-cover shadow-lg"
                                                alt={careerItem.title || 'Career Guide Image'}
                                            />


                                            {/* Blog Text */}


                                            <p className=" text-gray-600 line-clamp-4 text-xs text-left"> {/* Adding line-clamp for text overflow */}
                                                Lorem ipsum dolor Lorem ipsum dolor m dolor Lorem ipsum dolor,<Link href="#" className="text-blue-600 hover:underline  font-medium">Read more...</Link>
                                            </p>


                                        </div>
                                        <div className="flex flex-col md:flex-row items-center gap-5 shadow-lg rounded-lg">
                                            {/* Blog Image */}

                                            <Image
                                                height={300}
                                                width={300}
                                                src={careerItem.image}
                                                className="rounded-lg w-5/12 h-auto object-cover shadow-lg"
                                                alt={careerItem.title || 'Career Guide Image'}
                                            />


                                            {/* Blog Text */}


                                            <p className=" text-gray-600 line-clamp-4 text-xs text-left"> {/* Adding line-clamp for text overflow */}
                                                Lorem ipsum dolor Lorem ipsum dolor m dolor Lorem ipsum dolor,<Link href="#" className="text-blue-600 hover:underline  font-medium">Read more...</Link>
                                            </p>


                                        </div>
                                        <div className="flex flex-col md:flex-row items-center gap-5 shadow-lg rounded-lg">
                                            {/* Blog Image */}

                                            <Image
                                                height={300}
                                                width={300}
                                                src={careerItem.image}
                                                className="rounded-lg w-5/12 h-auto object-cover shadow-lg"
                                                alt={careerItem.title || 'Career Guide Image'}
                                            />


                                            {/* Blog Text */}


                                            <p className=" text-gray-600 line-clamp-4 text-xs text-left"> {/* Adding line-clamp for text overflow */}
                                                Lorem ipsum dolor Lorem ipsum dolor m dolor Lorem ipsum dolor,<Link href="#" className="text-blue-600 hover:underline  font-medium">Read more...</Link>
                                            </p>


                                        </div>


                                    </div>
                                </div>


                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
            <Chatbot />
        </>
    );
}
