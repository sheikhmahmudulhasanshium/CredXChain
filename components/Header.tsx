import Image from "next/image";
import Logo from "../public/images/Logo-2.png"
import Link from "next/link";
const Header = () => {
    return ( 
        <div className="flex items-center justify-center">
            <Link href="/">
                <Image src={Logo} alt="Logo" height={300} width={300}/>
            </Link>
        
        </div>
     );
}
 
export default Header;