import Footer from "../(with-navbar)/componenets/Footer/Footer";
import Navbar from "../(with-navbar)/componenets/Navbar/Navbar";

// app/payment-cancel/page.js
export default function PaymentCancel() {
    return <>
        <Navbar />
        <h1 className="text-center text-3xl font-bold my-48">⚠️ Payment Cancelled</h1>
        <Footer />
    </>;
}
