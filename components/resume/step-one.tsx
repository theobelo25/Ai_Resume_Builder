"use client";
import { HexColorPicker } from "react-colorful";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useResumeContext } from "@/context/resume";
import { useUser, SignInButton } from "@clerk/nextjs";
import { ChangeEvent, MouseEvent } from "react";

const StepOne = () => {
  const { resume, setResume, updateResume, setStep } = useResumeContext();
  const { isSignedIn } = useUser();

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateResume();
    setStep(2);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setResume((prevState) => {
      const updatedResume = { ...prevState, [name]: value };

      localStorage.setItem("resume", JSON.stringify(updatedResume));

      return updatedResume;
    });
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Personal Information</h2>
      <Input
        name="name"
        className="mb-3"
        onChange={handleChange}
        value={resume.name!}
        placeholder="Your name"
        type="text"
        autoFocus
        required
      />
      <Input
        name="job"
        className="mb-3"
        onChange={handleChange}
        value={resume.job!}
        placeholder="Job title"
        type="text"
        autoFocus
        required
      />
      <Input
        name="address"
        className="mb-3"
        onChange={handleChange}
        value={resume.address!}
        placeholder="Address"
        type="text"
        autoFocus
        required
      />
      <Input
        name="phone"
        className="mb-3"
        onChange={handleChange}
        value={resume.phone!}
        placeholder="Phone number"
        type="text"
        autoFocus
        required
      />
      <Input
        name="userEmail"
        className="mb-3"
        onChange={handleChange}
        value={resume.userEmail!}
        placeholder="Email"
        type="email"
        autoFocus
        required
      />
      {!isSignedIn ? (
        <SignInButton>
          <Button>Sign in to Save</Button>
        </SignInButton>
      ) : (
        <div className="flex justify-between">
          <HexColorPicker
            color={resume.themeColor!}
            onChange={(themeColor) => setResume({ ...resume, themeColor })}
          />
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default StepOne;
