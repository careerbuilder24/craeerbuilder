import Footer from "../(with-navbar)/componenets/Footer/Footer";
import Navbar from "../(with-navbar)/componenets/Navbar/Navbar";

// app/payment-fail/page.js
export default function PaymentFail() {
    return <>
        <Navbar />
        <h1 className="text-center text-3xl font-bold my-48">❌ Payment Failed</h1>
        <Footer />
    </>;
}


