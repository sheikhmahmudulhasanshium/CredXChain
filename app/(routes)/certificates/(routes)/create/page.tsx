import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Body from "./components/body";

const CreateCertificate = () => {
    return ( 
        <main className={cn("flex flex-col  justify-between dark:bg-slate-500 min-h-max")}>
            <Header/>
            <Navbar/>
            <Separator orientation="horizontal" className="mt-4"/>
            <Body/>
            <Footer/>
        </main>
     );
}
 
export default CreateCertificate;