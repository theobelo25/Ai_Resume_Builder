"use server";
import dbConnect from "../mongodb";
import Resume, { type ResumeType } from "@/models/resume";
import { currentUser } from "@clerk/nextjs/server";

export const saveResumeToDb = async (data: ResumeType & { _id?: string }) => {
  try {
    await dbConnect();

    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const { _id, ...rest } = data;

    const resume = await Resume.create({ ...rest, userEmail });

    return JSON.parse(JSON.stringify(resume));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getUserResumesFromDb = async () => {
  try {
    await dbConnect();

    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const resumes = await Resume.find({ userEmail });

    return JSON.parse(JSON.stringify(resumes));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getResumeFromDb = async (_id: string) => {
  try {
    await dbConnect();
    const resume = await Resume.findById(_id);
    return JSON.parse(JSON.stringify(resume));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const checkOwnership = async (_id: string) => {
  try {
    await dbConnect();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    if (!userEmail) throw new Error("User not found");
    const resume = await Resume.findById(_id);
    if (!resume) throw new Error("Resume not found");

    if (resume.userEmail !== userEmail) throw new Error("Unauthorized");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateResumeInDb = async (data: ResumeType) => {
  try {
    await dbConnect();
    const { _id, ...rest } = data;
    await checkOwnership(_id!);
    const resume = await Resume.findByIdAndUpdate(
      _id,
      { ...rest },
      { new: true }
    );

    return JSON.parse(JSON.stringify(resume));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateExperienceToDb = async (data: ResumeType) => {
  try {
    await dbConnect();
    const { _id, experience } = data;

    checkOwnership(_id!);

    const resume = await Resume.findByIdAndUpdate(
      _id,
      { experience },
      { new: true }
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateEducationToDb = async (data: ResumeType) => {
  try {
    await dbConnect();
    const { _id, education } = data;

    await checkOwnership(_id!);

    const resume = await Resume.findByIdAndUpdate(
      _id,
      { education },
      { new: true }
    );

    return JSON.parse(JSON.stringify(resume));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateSkillstoDB = async (data: ResumeType) => {
  try {
    await dbConnect();
    const { _id, skills } = data;

    await checkOwnership(_id!);

    const resume = await Resume.findByIdAndUpdate(
      _id,
      { skills },
      { new: true }
    );

    return JSON.parse(JSON.stringify(resume));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deleteResumeFromDb = async (_id: string) => {
  try {
    await dbConnect();
    await checkOwnership(_id!);
    const resume = await Resume.findByIdAndDelete(_id);
    return JSON.parse(JSON.stringify(resume));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
