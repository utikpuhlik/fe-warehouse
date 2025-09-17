import { SignIn } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Suspense } from "react";

import { StarsBackground } from "@/components/ui/stars-background";

export default function Page() {
  return (
    <StarsBackground className="aspect-16/9 flex items-center justify-center">
      <div className="flex h-screen items-center justify-center">
        <Suspense fallback={<Loader />}>
          <SignIn />
        </Suspense>
      </div>
    </StarsBackground>
  );
}
