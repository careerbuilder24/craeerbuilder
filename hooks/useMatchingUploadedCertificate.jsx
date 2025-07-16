
import { UserAuth } from '@/app/context/AuthContext';
// import useSavedPortfolioSaved from './useSavedPortfolioSaved';
import useCertificateUploaded from './useCertificateUploaded';


export default function useMatchingUploadedCertificate() {
    
    const {CertificateUploaded} = useCertificateUploaded();

    const { ManualUser } = UserAuth();

    const matchedStudentCertificateEmail = CertificateUploaded?.data?.find(
        (profile) => profile.email === ManualUser?.email
    );

    const matchedStudentCertificate = CertificateUploaded?.data?.filter(
        (course) => course?.email === matchedStudentCertificateEmail?.email
    ) || [];




    return {
        matchedStudentCertificate,        
        matchedStudentCertificateEmail    
    };
}
