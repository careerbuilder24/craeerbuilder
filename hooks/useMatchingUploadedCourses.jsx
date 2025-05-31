// const [studentEditProfile] = useStudentEditProfile();
// import useRegistered from './useRegistered';
// import useStudentEditProfile from './useStudentEditProfile';
// import useUploadedCourse from './useUploadedCourse';

// export default function useUserMatching() {
  
//     const [register] = useRegistered();
//      const { UploadedCourse } = useUploadedCourse();

//     const latestRegisteredUser = register?.data?.[register?.data?.length - 1];
    
//     const matchedStudentProfiles = UploadedCourse?.data?.filter(
//         (courses) => courses?.email === latestRegisteredUser?.email
//     );
//     const matchedStudentProfilesEmail = UploadedCourse?.data?.find(
//         (courses) => courses?.email === latestRegisteredUser?.email
//     );

 
//     console.log(matchedStudentProfilesEmail)

//     return {
       
//         matchedStudentProfiles,
//         matchedStudentProfilesEmail
//         // loading,
//         // error
//     };
// }
import useRegistered from './useRegistered';
import useUploadedCourse from './useUploadedCourse';
import useStudentEditProfile from './useStudentEditProfile'
import { UserAuth } from '@/app/context/AuthContext';

export default function useUserMatching() {
    const [register] = useRegistered();
    const { UploadedCourse } = useUploadedCourse(); // Assuming UploadedCourse is an object with a 'data' array

  const [studentEditProfile] = useStudentEditProfile();
    const {  ManualUser } = UserAuth();

    // Get the latest registered user
    const latestRegisteredUser = register?.data?.[register?.data?.length - 1];

    // Find all uploaded courses matching the latest user's email
 
    // Optional: Find just the first matched course
    // const matchedStudentProfilesEmail = matchedStudentProfiles[0] || null;

    // console.log(StudentEditProfile, "student")

    //   const matchedStudentProfilesEmail = studentEditProfile?.data?.find(
    //     (course) => course?.email === latestRegisteredUser?.email
    // ) || [];

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
