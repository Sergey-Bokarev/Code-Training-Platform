import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";

export default function Home() {
  return (
    <main className="bg-dark-layer-2 min-h-screen">
      <Topbar />
      <h1 className="text-2x1 text-center text-gray-700 dark:text-gray-400 font-medium uppercase mt-10 mb-5">
        &ldquo; QUALITY OVER QUANTITY &rdquo;
      </h1>
      <div className="relative overflow-x-auto mx-auto px-6 pb-10">
        <ProblemsTable />
      </div>
    </main>
  )
}
