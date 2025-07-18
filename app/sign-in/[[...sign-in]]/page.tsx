import { StarsBackground } from "@/components/ui/stars-background";
import {SignIn} from "@clerk/nextjs";

export default function Page() {

    return (
        <StarsBackground className="flex aspect-16/9 items-center justify-center">
            <div className="h-screen flex items-center justify-center">
                <SignIn/>
            </div>
        </StarsBackground>
    )
}