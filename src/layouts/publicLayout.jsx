import { Outlet } from "react-router-dom";
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import WhatsAppButton from "../components/share/whatsappButton";

const publicLayout = () => {

    return (
        <div className="">
            <Header />
            <Outlet />
            <WhatsAppButton />
            <Footer />
        </div>
    )
}

export default publicLayout;