"use client";

import { SearchDropdown } from "@/app/modules/search-dropdown/search-dropdown";

export default function Page() {
  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SearchDropdown />
      </div>
    </>
  );
}
