import Image from "next/image";
import Logo from "../public/images/Logo-2.png"
import { Separator} from "./ui/separator";
import { Button } from "./ui/button";
import Link from "next/link";
const Footer = () => {
    return ( 
        <div className="flex justify-center items-center dark:bg-slate-100 flex-col text-blue-950 dark:bg-opacity-5 bg-slate-200 bg-opacity-15">
            <div className=" flex px-6 sm:px-6 md:px-8 lg:px-12">
                <div className="grid grid-cols-2 justify-between space-x-8 pt-12 sm:space-x-8 md:space-x-10 lg:space-x-12 text-sm sm:text-base md:text-lg lg:text-lg">
                    <Image src={Logo} alt="Logo" />
                    <p className="text-justify flex">
                    CredX, utilizing Hyperledger Fabric, securely and efficiently handles certificate creation, management, and verification. Blockchain technology ensures tamper-proof issuance and an immutable credential record, enhancing privacy, reducing fraud, and streamlining verification while building trust among stakeholders.
                    </p>
                </div>
                
            </div>

            <div className="flex justify-evenly items-center space-x-1 sm:space-x-8 md:space-x-10 lg:space-x-12 pt-8 text-cyan-700 dark:text-black ">
                <Button variant="ghost" size="lg" className="text-lg" asChild><Link href="/terms-and-conditions">Terms & Conditions</Link></Button>
                <Button variant="ghost" size="lg" className="text-lg" asChild><Link href="/privacy-policy">Privacy Policy</Link></Button>
                <Button variant="ghost" size="lg" className="text-lg" asChild><Link href="/home">FAQ</Link></Button>
            </div>
            <Separator orientation="horizontal" className="my-8"/>
            
            <div className="flex justify-center items-center pb-2">
                &copy;2024 CredXChain, All right reserved
            </div>
        </div>
     );
}
 
export default Footer;