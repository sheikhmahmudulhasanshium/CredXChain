import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Body = () => {
    return (
        <div className="flex  py-16  justify-center items-center bg-gradient-to-tl from-blue-600 to bg-cyan-950 px-8">
                <FAQ/>
        </div>
      );
}
 
export default Body;