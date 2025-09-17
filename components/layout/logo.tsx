import { GlobeAltIcon } from "@heroicons/react/24/outline";

import { lusitana } from "@/app/ui/fonts";

export default function Logo() {
  return (
    <div className={`${lusitana.className} flex items-center justify-center text-white transition-all duration-300`}>
      <GlobeAltIcon className="h-14 w-14 rotate-[15deg] transition-all duration-300 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8" />
      <p className="text-3xl font-bold transition-all duration-300 group-data-[collapsible=icon]:hidden md:text-5xl">
        TCF
      </p>
    </div>
  );
}
