
import { UserAuth } from '@/app/context/AuthContext';
// import useSavedPortfolioSaved from './useSavedPortfolioSaved';
// import useCertificateUploaded from './useCertificateUploaded';
// import useUploadedImage from './useUploadedImage';
import usePublishedBlogs from './usePublishedBlogs';


export default function useMatchingUploadedBlog() {
    
    const {publishedBlogs} = usePublishedBlogs();

    const { ManualUser } = UserAuth();

    const matchedStudentUploadedBlog = publishedBlogs?.find(
        (profile) => profile.email === ManualUser?.email
    );

    const matchedStudentUploadedBlogs = publishedBlogs?.filter(
        (course) => course?.email === matchedStudentUploadedBlog?.email
    ) || [];




    return {
        matchedStudentUploadedBlogs,        
       
    };
}
