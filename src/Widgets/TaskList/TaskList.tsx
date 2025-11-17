import { Dispatch, SetStateAction } from "react";
import { Button } from "../../componnents/Button/Button";

interface TaskListProps {
  tasks: Tasks[];
  setSelectedTask: Dispatch<SetStateAction<string>>;
}

type Tasks = {
  id: number;
  title: string;
  spent: string;
  estimated: string;
  isActive: boolean;
  exceeded: boolean;
};

export const TaskList = ({ tasks, setSelectedTask }: TaskListProps) => {
  return (
    <div className="flex-1 overflow-y-auto bg-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-center justify-between px-8 py-[18px] border-b border-gray-200 cursor-pointer transition-all duration-150 ${
            task.isActive ? "bg-transparent" : "hover:bg-gray-50"
          }`}
          onClick={() => setSelectedTask(task.title)}
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-[15px] font-normal text-gray-900">
              {task.title}
            </span>
            {task.exceeded && (
              <span className="px-2.5 py-1 bg-[#B93939] text-white rounded-md text-xs font-semibold whitespace-nowrap">
                Time Exceeded
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
              {task.spent} / {task.estimated}
            </span>
            <Button variant="play" size="sm">
              ▶
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
