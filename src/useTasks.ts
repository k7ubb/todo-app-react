import { useState, useEffect } from 'react';
import { getFirestoreTasks, addFirestoreTask, setFirestoreTaskDone, removeFirestoreTask } from './repository';

export type Task = {
  id?: string;
  title: string;
  done: boolean;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Required<Task>[]>([]);

  const update = async () => {
    setTasks(await getFirestoreTasks());
  };

  useEffect(() => {
    update();
  }, []);

  const addTask = async (task: Task) => {
    await addFirestoreTask(task);
    await update();
  };

  const removeTask = async (task: Required<Task>) => {
    await removeFirestoreTask(task);
    await update();
  };

  const setTaskDone = async(task: Required<Task>, done: boolean) => {
    await setFirestoreTaskDone(task, done);
    await update();
  };

	return {
    tasks,
    addTask,
    removeTask,
    setTaskDone
  };
};
