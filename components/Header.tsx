import Image from "next/image";
import Logo from "../public/images/Logo-2.png"
const Header = () => {
    return ( 
        <div className="flex items-center justify-center">
            <div className="">
                <Image src={Logo} alt="Logo" height={300} width={300}/>
            </div>
        
        </div>
     );
}
 
export default Header;