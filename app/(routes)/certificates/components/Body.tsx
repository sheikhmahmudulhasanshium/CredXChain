import { Button } from "@/components/ui/button";
import Link from "next/link";
const CertificatesBody = () => {
    return ( 
        <div className="flex  py-16  justify-center items-center bg-gradient-to-tl from-blue-600 to bg-cyan-950 ">
            <div className="grid grid-cols-2 gap-4 ">
                <Button variant="default" size="lg" asChild><Link href="/certificates/create">Create Certificate </Link></Button>
                <Button variant="default" size="lg" asChild><Link href="/certificates/update">Update Certificate </Link></Button>
                <Button variant="default" size="lg" asChild><Link href="/certificates/verify">Verify Certificate </Link></Button>
                <Button variant="default" size="lg" asChild><Link href="/certificates/manage">Manage Certificate </Link></Button>
            </div>
        </div>
      );
}
 
export default CertificatesBody;