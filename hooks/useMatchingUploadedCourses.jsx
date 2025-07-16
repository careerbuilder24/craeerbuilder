
import useRegistered from './useRegistered';
import useUploadedCourse from './useUploadedCourse';
import useStudentEditProfile from './useStudentEditProfile'
import { UserAuth } from '@/app/context/AuthContext';

export default function useMatchingUploadedCourses() {
    const [register] = useRegistered();
    const { UploadedCourse } = useUploadedCourse(); // Assuming UploadedCourse is an object with a 'data' array

  const [studentEditProfile] = useStudentEditProfile();
    const {  ManualUser } = UserAuth();

    // Get the latest registered user
    const latestRegisteredUser = register?.data?.[register?.data?.length - 1];


     const matchedStudentProfilesEmail = studentEditProfile?.data?.find(
  (profile) => profile.email === ManualUser?.email
);

   const matchedStudentProfiles = UploadedCourse?.data?.filter(
        (course) => course?.email === matchedStudentProfilesEmail?.email
    ) || [];




    return {
        matchedStudentProfiles,        // All matching courses (array)
        matchedStudentProfilesEmail    // First matching course (or null)
    };
}
