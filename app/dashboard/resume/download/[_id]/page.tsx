"use client";
import { Button } from "@/components/ui/button";
import { DownloadCloud, Printer, Share2 } from "lucide-react";
import { useEffect, useEffectEvent, useState } from "react";
import { useResumeContext } from "@/context/resume";
import { ResumeType } from "@/models/resume";
import ResumeCard from "@/components/cards/resume-card";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const DownloadPage = () => {
  const { resumes } = useResumeContext();
  const [currentResume, setCurrentResume] = useState<ResumeType | null>(null);

  const { _id } = useParams<{ _id: string }>();

  const getCurrentResume = useEffectEvent(() => {
    if (resumes.length > 0 && _id) {
      const serializedResumes = JSON.parse(JSON.stringify(resumes));
      const resume = serializedResumes.find((r: ResumeType) => r._id === _id);
      setCurrentResume(resume);
    }
  });

  useEffect(() => {
    getCurrentResume();
  }, [_id, resumes]);

  const printResume = () => {
    if (typeof window !== "undefined") {
      const newWindow = window.open(`/resume/${currentResume?._id}`, "_blank");

      if (newWindow)
        newWindow.onload = () => {
          setTimeout(() => {
            newWindow?.print();
          }, 300);
        };
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-5 my-20 overflow-auto">
      <div className="text-center w-full md:w-1/2">
        <h2 className="font-bold text-lg">
          Congrats! Your AI Powered resume is ready!
        </h2>
        <p>You can now download, print or share it with anyone.</p>

        <div className="flex justify-between py-20">
          <div className="flex flex-col items-center gap-4">
            <DownloadCloud size={80} />
            <Button onClick={printResume}>Download</Button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Printer size={80} />
            <Button onClick={printResume}>Print</Button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Share2 size={80} />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/resume/${currentResume?._id}`
                );
                toast.success("Link successfull copied to clipboard!");
              }}
            >
              Share
            </Button>
          </div>
        </div>
        {currentResume ? <ResumeCard resume={currentResume} /> : null}
      </div>
    </div>
  );
};

export default DownloadPage;
