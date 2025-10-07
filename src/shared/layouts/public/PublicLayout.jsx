import { Outlet } from "react-router-dom";
import Header from '../../../components/ui/Header';
import Footer from '../../../components/ui/Footer';
import WhatsAppButton from "../../components/WhatsappButton";

const PublicLayout = () => {

    return (
        <div className="">
            <Header />
            <Outlet />
            <WhatsAppButton />
            <Footer />
        </div>
    )
}

export default PublicLayout;
