import useRegistered from './useRegistered';
import useUploadedCourse from './useUploadedCourse';

export default function useUserMatching() {
    const [register] = useRegistered(); // Array of registered users
    const { UploadedCourse } = useUploadedCourse(); // Array of uploaded courses

    // Optional: handle loading/error if your hooks provide them
    const loading = !register || !UploadedCourse;
    const error = null; // Set this properly based on your actual hooks if needed

    // Extract registered emails for easy lookup
    const registeredEmails = register?.data?.map(user => user.email);

    // Filter uploaded courses where the course email matches a registered email
    const matchedCourses = UploadedCourse?.data?.filter(course =>
        registeredEmails?.includes(course.email)
    );

    return {
        matchedCourses,
        loading,
        error
    };
}
