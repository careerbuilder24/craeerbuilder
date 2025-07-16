
import useRegistered from './useRegistered';
import useUploadedCourse from './useUploadedCourse';
import useStudentEditProfile from './useStudentEditProfile'
import { UserAuth } from '@/app/context/AuthContext';
import useSavedPortfolioSaved from './useSavedPortfolioSaved';


export default function useMatchingUploadedPortfolio() {
    const [register] = useRegistered();
    const { UploadedCourse } = useUploadedCourse(); // Assuming UploadedCourse is an object with a 'data' array
    const [studentSavedPortfolio] = useSavedPortfolioSaved();
    const [studentEditProfile] = useStudentEditProfile();
    const { ManualUser } = UserAuth();

    // Get the latest registered user
    const latestRegisteredUser = register?.data?.[register?.data?.length - 1];


    const matchedStudentProfilesEmail = studentSavedPortfolio?.data?.find(
        (profile) => profile.email === ManualUser?.email
    );

    const matchedStudentPortfolio = studentSavedPortfolio?.data?.filter(
        (course) => course?.email === matchedStudentProfilesEmail?.email
    ) || [];




    return {
        matchedStudentPortfolio,        // All matching courses (array)
        matchedStudentProfilesEmail    // First matching course (or null)
    };
}
