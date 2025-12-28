import React from "react";
import TaskCard from "./TaskCard";

const BoardView = ({ tasks }) => {
  // Grouper les tâches par stage
  const todoTasks = tasks?.filter(task => task.stage === "todo") || [];
  const inProgressTasks = tasks?.filter(task => task.stage === "in progress") || [];
  const completedTasks = tasks?.filter(task => task.stage === "completed") || [];

  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      {/* Colonne TODO */}
      <div className='space-y-4'>
        {todoTasks.map((task, index) => (
          <TaskCard task={task} key={task._id || index} />
        ))}
      </div>

      {/* Colonne IN PROGRESS */}
      <div className='space-y-4'>
        {inProgressTasks.map((task, index) => (
          <TaskCard task={task} key={task._id || index} />
        ))}
      </div>

      {/* Colonne COMPLETED */}
      <div className='space-y-4'>
        {completedTasks.map((task, index) => (
          <TaskCard task={task} key={task._id || index} />
        ))}
      </div>
    </div>
  );
};

export default BoardView;