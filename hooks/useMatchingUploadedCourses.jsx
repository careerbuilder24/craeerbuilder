import useStudentEditProfile from './useStudentEditProfile';
import useUploadedCourse from './useUploadedCourse';

export default function useUserMatching() {
  
    // const [register] = useRegistered();
    const [studentEditProfile] = useStudentEditProfile();
     const { UploadedCourse } = useUploadedCourse();

    const latestRegisteredUser = studentEditProfile?.data?.[studentEditProfile?.data?.length - 1];
    
    const matchedStudentProfiles = UploadedCourse?.data?.filter(
        (courses) => courses?.email === latestRegisteredUser?.email
    );
    const matchedStudentProfilesEmail = UploadedCourse?.data?.find(
        (courses) => courses?.email === latestRegisteredUser?.email
    );

 
    console.log(matchedStudentProfilesEmail)

    return {
       
        matchedStudentProfiles,
        matchedStudentProfilesEmail
        // loading,
        // error
    };
}
