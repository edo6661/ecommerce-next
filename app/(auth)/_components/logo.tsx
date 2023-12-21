import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";


const font = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const Logo = () => {
    return (
        <div className={cn("fl-col-center gap-4", font.className)}>
            <div className="bg-white rounded-full p-2">
                <Image src='/logo.png' alt="logo" height={80} width={80} />
            </div>
            <div className="fl-col-center">
                <h1 className="text-xl font-semibold">Mugishop <span className="text-muted-foreground">&#8506;</span></h1>
                <p className="text-sm text-muted-foreground">Shoppy!</p>
            </div>
        </div>
    )
}