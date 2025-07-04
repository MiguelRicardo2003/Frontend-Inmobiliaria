import { Outlet } from "react-router-dom";
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';



const publicLayout = () => {

    return (
        <div className="">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default publicLayout;