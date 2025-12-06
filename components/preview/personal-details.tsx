import { ResumeType } from "@/models/resume";

const PersonalDetails = ({ resume }: { resume: ResumeType }) => {
  return (
    <div>
      <h2
        className="font-bold text-xl text-center"
        style={{ color: resume.themeColor! }}
      >
        {resume.name}
      </h2>
      <h2 className="text-center text-sm font-medium">{resume.job}</h2>
      <h2 className="text-center text-sm font-medium">{resume.address}</h2>
      <div className="flex justify-between">
        <h2 className="font-normal text-xs">{resume.phone}</h2>
        <h2 className="font-normal text-xs">{resume.userEmail}</h2>
      </div>
      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: resume.themeColor! }}
      />
    </div>
  );
};

export default PersonalDetails;
