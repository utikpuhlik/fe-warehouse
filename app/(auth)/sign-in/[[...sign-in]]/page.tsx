import { StarsBackground } from "@/components/ui/stars-background";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import { Loader } from "lucide-react";

export default function Page() {
  return (
    <StarsBackground className="flex aspect-16/9 items-center justify-center">
      <div className="h-screen flex items-center justify-center">
        <Suspense fallback={<Loader />}>
          <SignIn />
        </Suspense>
      </div>
    </StarsBackground>
  );
}
