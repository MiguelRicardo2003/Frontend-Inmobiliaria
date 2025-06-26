import { useState } from "react";

const useSection1 = () => {
    const [section1, setSection1] = useState(true);

    return{
        section1,
        setSection1
    }
}

export default useSection1;