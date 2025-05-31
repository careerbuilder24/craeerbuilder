// // useUserMatching.js
// import useAchievements from './useAchievements';
// import useRegistered from './useRegistered';
// import useStudentEditProfile from './useStudentEditProfile';

// export default function useUserMatching() {
//     const { Achievement, loading, error } = useAchievements();
//     const [register] = useRegistered();
//     const [studentEditProfile] = useStudentEditProfile();

//     console.log(Achievement)

//     const latestRegisteredUser = register?.data?.[register?.data?.length - 1];
//     const matchedStudent = studentEditProfile?.data?.find(
//         (profile) => profile.email === latestRegisteredUser?.email
//     );

//     return { latestRegisteredUser, matchedStudent };
// }
import { UserAuth } from '@/app/context/AuthContext';
import useAchievements from './useAchievements';
import useRegistered from './useRegistered';
import useStudentEditProfile from './useStudentEditProfile';

export default function useUserMatching() {
    const { Achievement, loading, error } = useAchievements();
    const [register] = useRegistered();
    const [studentEditProfile] = useStudentEditProfile();
     const {  ManualUser } = UserAuth();

    const latestRegisteredUser = register?.data?.[register?.data?.length - 1];
    // const matchedStudent = studentEditProfile?.data?.find(
    //     (profile) => profile.email === latestRegisteredUser?.email
    // );



    const matchedStudent = studentEditProfile?.data?.find(
  (profile) => profile.email === ManualUser?.email
);

    // Filter achievements by matching email
    const matchedAchievements = Achievement?.data?.filter(
        (achievement) => achievement.email === ManualUser?.email
    );


    
    return {
        latestRegisteredUser,
        matchedStudent,
        matchedAchievements,
        loading,
        error
    };
}
