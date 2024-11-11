import React, { useState } from 'react';
import {useTasks} from './useTasks';
import './App.css';

const App: React.FC = () => {
  const { tasks, addTask, removeTask } = useTasks();
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
          onClick={() => addTask({title, done: false})}
        />
      </div>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            <label><input type='checkbox' />{task.title}</label>
            <button onClick={() => removeTask(task)}>×</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
