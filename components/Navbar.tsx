import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";

const Navbar = () => {
    return ( 
        <div className="flex flex-col ">
            <Separator orientation="horizontal" className="mb-4"/>
            <div className="  gap-0 sm:gap-1 md:gap-4 lg:gap-6 flex mr-6 justify-center items-center sm:justify-center md:justify-end lg:justify-end">
                <Button variant="ghost" size="default" asChild className="text-2xl hover:underline hover:underline-offset-4"><Link href="/home">Home</Link></Button>
                <Button variant="ghost" size="default" asChild className="text-2xl hover:underline hover:underline-offset-4"><Link href="/certificates">Certificates</Link></Button>

                <Button variant="ghost" size="default" asChild className="text-2xl hover:underline hover:underline-offset-4"><Link href="/sign-in">Sign-in</Link></Button>
                <Button variant="ghost" size="default" asChild className="text-2xl hover:underline hover:underline-offset-4"><Link href="/log-in">Log-in</Link></Button>
                <ModeToggle/>
            </div>
            
        </div>
     );
}
 
export default Navbar;