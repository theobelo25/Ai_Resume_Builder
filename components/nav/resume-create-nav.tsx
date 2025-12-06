"use client";
import { useResumeContext } from "@/context/resume";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const ResumeNav = () => {
  const { step, setStep } = useResumeContext();

  const pathname = usePathname();
  const isEditPage = pathname.includes("/edit/");

  return (
    <nav className="flex justify-center items-center w-full py-4">
      <div className="flex space-x-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <Button
            key={item}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition hover:bg-primary hover: text-slate-200 ${
              step === item
                ? "bg-primary text-slate-200 dark:text-slate-800"
                : "bg-secondary text-gray-700 dark:text-gray-400"
            }`}
            onClick={() => setStep(item)}
            disabled={!isEditPage && step < item}
          >
            {item}
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default ResumeNav;
