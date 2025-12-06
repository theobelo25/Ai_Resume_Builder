"use client";
import { useResumeContext } from "@/context/resume";
import StepOne from "@/components/resume/step-one";
import StepTwo from "@/components/resume/step-two";
import StepThree from "@/components/resume/step-three";
import StepFour from "@/components/resume/step-four";
import StepFive from "@/components/resume/step-five";
import ResumeNav from "@/components/nav/resume-create-nav";
import PreviewCard from "@/components/cards/preview-card";

const EditPage = () => {
  const resumeContext = useResumeContext();
  const { step } = resumeContext;

  return (
    <div className="flex flex-col lg:flex-row justify-center w-full min-h-screen">
      <div className="flex flex-col lg:w-1/2 p-4 lg:order-last lg:justify-center lg:items-center">
        <PreviewCard />
      </div>
      <div className="flex flex-col lg:w-1/2 lg:order-first justify-center p-4">
        <ResumeNav />
        {step === 1 ? (
          <StepOne />
        ) : step === 2 ? (
          <StepTwo />
        ) : step === 3 ? (
          <StepThree />
        ) : step === 4 ? (
          <StepFour />
        ) : (
          <StepFive />
        )}
      </div>
    </div>
  );
};

export default EditPage;
