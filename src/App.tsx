import React, { useState } from 'react';
import {useTasks} from './useTasks';
import './App.css';

const App: React.FC = () => {
  const {
    tasks,
    addTask,
    removeTask,
    setTaskDone,
  } = useTasks();
  const [title, setTitle] = useState('');

  return (
    <>
      <div className='form'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='button'
          value='追加'
          onClick={async () => {
            await addTask({title, done: false});
            setTitle('');
          }}
        />
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type='checkbox'
                checked={task.done}
                onChange={async (e) => await setTaskDone(task, e.target.checked)}
              />
              {task.title}
            </label>
            <button onClick={async () => await removeTask(task)}>×</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
