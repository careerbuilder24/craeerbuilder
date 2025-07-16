
import { UserAuth } from '@/app/context/AuthContext';
// import useSavedPortfolioSaved from './useSavedPortfolioSaved';
// import useCertificateUploaded from './useCertificateUploaded';
import useUploadedImage from './useUploadedImage';


export default function useMatchingUploadedImage() {
    
    const {UploadedImage} = useUploadedImage();

    const { ManualUser } = UserAuth();

    const matchedStudentImagesUploaded = UploadedImage?.data?.find(
        (profile) => profile.email === ManualUser?.email
    );

    const matchedStudentImageUploaded = UploadedImage?.data?.filter(
        (course) => course?.email === matchedStudentImagesUploaded?.email
    ) || [];




    return {
        matchedStudentImageUploaded,        
       
    };
}
