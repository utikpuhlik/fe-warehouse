import { lusitana } from "@/app/ui/fonts";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
      // className="flex flex-row items-center leading-none text-white"
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">TCF</p>
    </div>
  );
}
