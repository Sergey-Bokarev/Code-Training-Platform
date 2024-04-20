import { useState } from "react";
import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState<boolean>(true);
  
  return (
    <main className="bg-dark-layer-2 min-h-screen">
      <Topbar />
      <h1 className="text-2x1 text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5">
        &ldquo; QUALITY OVER QUANTITY &rdquo;
      </h1>
      <div className="relative overflow-x-auto mx-auto px-6 pb-10">
        {loadingProblems && (
          <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
            {[...Array(10)].map((_, idx) => (
              <LoadingSkeleton key={`loading-skeleton-${idx}`} />
            ))}
          </div>
        )}
        <ProblemsTable loadingProblems={loadingProblems} setLoadingProblems={setLoadingProblems} />
      </div>
    </main>
  )
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <div className="sr-only">Loading...</div>
    </div>
  );
}
