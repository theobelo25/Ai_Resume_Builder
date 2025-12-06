import { getResumeFromDb } from "@/lib/actions/resume.actions";
import PersonalDetails from "@/components/preview/personal-details";
import Summary from "@/components/preview/summary";
import Experience from "@/components/preview/experience";
import Education from "@/components/preview/education";
import Skills from "@/components/preview/skills";
import { ResumeType } from "@/models/resume";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;
  const resume = await getResumeFromDb(_id);

  return {
    title: `${resume.name}'s Resume`,
    description: resume.summary,
    openGraph: {
      title: `${resume.name}'s Resume`,
      description: resume.summary,
      images: ["/logo.svg"],
    },
  };
}

const ResumePage = async ({ params }: { params: Promise<{ _id: string }> }) => {
  const { _id } = await params;
  const resume: ResumeType = await getResumeFromDb(_id);

  return (
    <div className="m-20">
      <PersonalDetails resume={resume} />
      <Summary resume={resume} />
      <Experience resume={resume} />
      <Education resume={resume} />
      <Skills resume={resume} print={true} />
    </div>
  );
};

export default ResumePage;
