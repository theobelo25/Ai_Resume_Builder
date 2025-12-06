"use client";
import { useResumeContext } from "@/context/resume";
import SkeletonCard from "@/components/cards/skeleton-card";
import ResumeCard from "@/components/cards/resume-card";
import { type ResumeType } from "@/models/resume";

const Dashboard = () => {
  const { resumes } = useResumeContext();

  if (resumes.length === 0) {
    return (
      <div>
        <p className="text-center my-5">Loading...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
      {resumes.map((resume) => (
        <ResumeCard key={(resume as ResumeType)._id} resume={resume} />
      ))}
    </div>
  );
};

export default Dashboard;
