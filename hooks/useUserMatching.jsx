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
import useAchievements from './useAchievements';
import useRegistered from './useRegistered';
import useStudentEditProfile from './useStudentEditProfile';

export default function useUserMatching() {
    const { Achievement, loading, error } = useAchievements();
    const [register] = useRegistered();
    const [studentEditProfile] = useStudentEditProfile();

    const latestRegisteredUser = register?.data?.[register?.data?.length - 1];
    const matchedStudent = studentEditProfile?.data?.find(
        (profile) => profile.email === latestRegisteredUser?.email
    );

    // Filter achievements by matching email
    const matchedAchievements = Achievement?.data?.filter(
        (achievement) => achievement.email === latestRegisteredUser?.email
    );

    return {
        latestRegisteredUser,
        matchedStudent,
        matchedAchievements,
        loading,
        error
    };
}
