import { db } from './firebase';
import { collection, doc, getDocs, query, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Task } from './useTasks';

export const getFirestoreTasks = async () => {
	const tasks = [] as Required<Task>[];
	(await getDocs(query(
		collection(db, "tasks"),
	))).forEach(doc => {
		tasks.push({
			id: doc.id,
			...doc.data()
		} as Required<Task>);
	});
	return tasks;
};

export const addFirestoreTask = async (task: Task) => {
	await addDoc(collection(db, "tasks"), task);
};

export const setFirestoreTaskDone = async (task: Required<Task>, done: boolean) => {
	await updateDoc(doc(db, "tasks", task.id), {
		title: task.title,
		done
	});
};

export const removeFirestoreTask = async (task: Required<Task>) => {
	await deleteDoc(doc(db, "tasks", task.id));
};
