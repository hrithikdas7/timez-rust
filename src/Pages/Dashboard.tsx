import { useState } from "react";
import { Timer } from "../Widgets/Timer/Timer";
import { Input } from "../componnents/Input/Input";
import { ProjectList } from "../Widgets/ProjectList/ProjectList";
import { Button } from "../componnents/Button/Button";
import { TaskList } from "../Widgets/TaskList/TaskList";

type Task = {
  id: number;
  title: string;
  spent: string;
  estimated: string;
  exceeded: boolean;
  isActive: boolean;
};

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [activeProject, setActiveProject] = useState("promagic");

  const projects = [
    { id: "wac-pro", name: "WAC PRO - New", taskCount: 5 },
    {
      id: "promagic",
      name: "Promagic Photo Sharing App With Fac...",
      taskCount: 5,
    },
  ];

  const tasks: Task[] = [
    {
      id: 1,
      title: "Fix sharp Memory Overhead",
      spent: "9:14",
      estimated: "16:00",
      exceeded: false,
      isActive: false,
    },
    {
      id: 2,
      title: "Event and Analytics Widget Integration",
      spent: "5:37",
      estimated: "16:00",
      exceeded: false,
      isActive: true,
    },
    {
      id: 3,
      title: "Implement Gallery Feed API Integration",
      spent: "15:59",
      estimated: "16:00",
      exceeded: false,
      isActive: false,
    },
    {
      id: 4,
      title: "Event tab widget-handling and API integration",
      spent: "8:00",
      estimated: "8:00",
      exceeded: true,
      isActive: false,
    },
    {
      id: 5,
      title: "Ai code optimization react",
      spent: "15:56",
      estimated: "16:00",
      exceeded: false,
      isActive: false,
    },
  ];

  const activeTask = tasks.find((t) => t.isActive);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-[380px] bg-white border-r border-gray-200 flex flex-col px-6 py-8 shrink-0 max-xl:w-80 max-[900px]:w-[280px] max-[900px]:px-4 max-[900px]:py-6 max-md:w-full max-md:border-r-0 max-md:border-b max-md:px-4 max-md:py-5">
        <Timer />

        <div className="mb-6">
          <Input type="text" placeholder="Search Projects" />
        </div>

        <ProjectList
          projects={projects}
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 px-8 py-6 bg-white border-b border-gray-200">
          {/* <input className="flex-1 px-4 py-3 border border-gray-200 rounded-[10px] text-sm text-gray-900 bg-white transition-all duration-200 focus:outline-none focus:border-[#5A2A82] focus:ring-4 focus:ring-[#5A2A82]/10 placeholder:text-gray-400" /> */}
          <Input type="text" placeholder="Search task" />
          <Button variant="icon" size="lg">
            ⋮
          </Button>
        </div>

        {/* Task Group Header */}
        {activeTask && (
          <div className="flex items-center justify-between px-8 py-4 bg-[#5A2A82] text-white m-0">
            <span className="text-[15px] font-medium flex-1">
              {activeTask.title}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium whitespace-nowrap">
                {activeTask.spent} / {activeTask.estimated}
              </span>
              <Button variant="circular" size="md">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              </Button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <TaskList tasks={tasks} setSelectedTask={setSelectedTask}/>
        
      </div>
    </div>
  );
};

export default Dashboard;
