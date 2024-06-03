import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import Navbar from "../../../components/Navbar";
import { Separator } from "@/components/ui/separator";
import Body from "./components/Body";
import Footer from "@/components/Footer";

const CertificatesPage = () => {
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
 
export default CertificatesPage;