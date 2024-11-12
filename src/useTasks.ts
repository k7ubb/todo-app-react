import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, doc, getDocs, query, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export type Task = {
  id?: string;
  title: string;
  done: boolean;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Required<Task>[]>([]);

  const update = async () => {
    const tasks_ = [] as Required<Task>[];
    (await getDocs(query(
      collection(db, "tasks"),
    ))).forEach(doc => {
      tasks_.push({
        id: doc.id,
        ...doc.data()
      } as Required<Task>);
    });
    setTasks(tasks_);
  };

  useEffect(() => {
    update();
  }, []);

  const addTask = async (task: Task) => {
    await addDoc(collection(db, "tasks"), task);
    await update();
  };

  const removeTask = async (task: Required<Task>) => {
    await deleteDoc(doc(db, "tasks", task.id));
    await update();
  };

  const setTaskDone = async(task: Required<Task>, done: boolean) => {
    await updateDoc(doc(db, "tasks", task.id), {
      title: task.title,
      done
    });
    await update();
  };

	return {
    tasks,
    addTask,
    removeTask,
    setTaskDone
  };
};
