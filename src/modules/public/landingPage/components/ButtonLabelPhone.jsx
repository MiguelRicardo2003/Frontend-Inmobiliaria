import { Link } from "react-router-dom";
import Button from "../../../../components/ui/Button";
import { Phone, ArrowRight } from "lucide-react";

const ButtonLabelPhone = () => {
    return (
        <div className="flex items-center justify-center lg:justify-start gap-6 md:gap-16 lg:gap-24">
            <Link to="/contact" >
                <Button
                    variant="secondary"
                    size="md"
                    className="font-semibold px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    icon={ArrowRight}
                    iconPosition="right"
                >
                    Contáctanos
                </Button>
            </Link>
            <div className="flex items-center font-semibold text-black">
                <Phone strokeWidth={1.25} className="mr-2" />+57 123456789
            </div>
        </div>
    );
}

export default ButtonLabelPhone;