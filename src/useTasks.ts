import { useState, useEffect } from 'react';

export type Task = {
  title: string;
  done: boolean;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[] | undefined>();

  useEffect(() => {
    const tasksJson = localStorage.getItem("tasks");
    if (tasksJson) {
      setTasks(JSON.parse(tasksJson));
    } else {
      setTasks([
        {
          "title": "買い物",
          "done": true
        },
        {
          "title": "メール返信",
          "done": false
        },
        {
          "title": "レポート提出",
          "done": false
        }
      ]);
    }
  }, []);

  useEffect(() => {
    if (tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...(tasks ?? []), task]);
  };

  const removeTask = (task: Task) => {
    setTasks((tasks ?? []).filter(_ => _ !== task));
  };

	return {
    tasks: tasks ?? [],
    addTask,
    removeTask
  };
};
