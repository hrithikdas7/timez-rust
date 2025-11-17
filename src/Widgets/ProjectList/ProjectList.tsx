import { SetStateAction, Dispatch } from "react";

interface Project {
  id: string;
  taskCount: number;
  name: string;
}

interface ProjectListProps {
  projects: Project[];
  activeProject: string;
  setActiveProject: Dispatch<SetStateAction<string>>;
}

export const ProjectList = ({
  projects,
  activeProject,
  setActiveProject,
}: ProjectListProps) => {
  return (
    <div className="flex flex-col gap-3 max-md:flex-row max-md:overflow-x-auto">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`flex items-center justify-between px-[18px] py-4 rounded-[10px] cursor-pointer transition-all duration-200 border ${
            activeProject === project.id
              ? "bg-[#5A2A82] shadow-md border-transparent"
              : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
          } max-md:min-w-[200px]`}
          onClick={() => setActiveProject(project.id)}
        >
          <span
            className={`text-[15px] font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-60 max-[900px]:max-w-[180px] ${
              activeProject === project.id ? "text-white" : "text-gray-900"
            }`}
          >
            {project.name}
          </span>
          <span
            className={`min-w-8 h-7 flex items-center justify-center rounded-full text-[13px] font-semibold px-2.5 ${
              activeProject === project.id
                ? "bg-white/25 text-white"
                : "bg-[#5A2A82] text-white"
            }`}
          >
            {project.taskCount}
          </span>
        </div>
      ))}
    </div>
  );
};
