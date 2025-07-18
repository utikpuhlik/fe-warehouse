import {SignUp} from '@clerk/nextjs'
import {StarsBackground} from "@/components/ui/stars-background";

export default function Page() {
    return (
        <StarsBackground className="flex aspect-16/9 items-center justify-center">
            <div className="h-screen flex items-center justify-center">
                <SignUp/>
            </div>
        </StarsBackground>
    )
}