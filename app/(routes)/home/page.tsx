import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Body from "./components/Body";
import Navbar from "../../../components/Navbar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function Home() {
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
