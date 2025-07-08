import Button from "../../../shared/Button";
import { Phone, ArrowRight } from "lucide-react";
const ButtonPhone = () => {
    return (
        <>
            <div className="flex ">
                <Button
                    info={"Contactanos"}
                    className=" flex bg-[#E7C873] hover:bg-yellow-300 text-black font-semibold px-4 py-3 rounded-xl"
                    onClick={() => console.log("hola")}
                    icon={<ArrowRight strokeWidth={1.25} />}
                />
            </div>

            <div className="flex flex-row font-semibold text-black justify-end md:pr-24">
                <div className="h-12 w-40 flex justify-center py-3 md:gap-5 gap-2">
                    <Phone strokeWidth={1.25} />+57 123456789
                </div>
            </div>
        </>
    );
}

export default ButtonPhone;