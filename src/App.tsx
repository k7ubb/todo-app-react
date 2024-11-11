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
          onClick={() => {
            addTask({title, done: false});
            setTitle('');
          }}
        />
      </div>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            <label>
              <input
                type='checkbox'
                checked={task.done}
                onChange={(e) => setTaskDone(task, e.target.checked)}
              />
              {task.title}
            </label>
            <button onClick={() => removeTask(task)}>×</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
