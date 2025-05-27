import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import DirectoryMapping from './components/DirectoryMapping';
import CheckBoxGroupList from './components/CheckBoxGroupList';

interface Task {
  id: number;
  name: string;
}

function App() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [task, setTask] = useState('');
  const [directory, setDirectory] = useState([
    {
      name: 'project',
      isFolder: true,
      isActive: false,
      children: [
        {
          name: 'public',
          isFolder: true,
          isActive: false,
          children: [
            {
              name: 'index.html',
              isFolder: false,
              isActive: false,
            },
            {
              name: 'favicon.ico',
              isFolder: false,
              isActive: false,
            },
          ],
        },
        {
          name: 'src',
          isFolder: true,
          isActive: false,
          children: [
            {
              name: 'index.css',
              isFolder: false,
              isActive: false,
            },
            {
              name: 'index.js',
              isFolder: false,
              isActive: false,
            },
            {
              name: 'scripts',
              isFolder: true,
              isActive: false,
              children: [
                {
                  name: 'about.js',
                  isFolder: false,
                  isActive: false,
                },
                {
                  name: 'home.js',
                  isFolder: false,
                  isActive: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'abc',
      isFolder: true,
      isActive: false,
      children: [
        {
          name: 'info.js',
          isFolder: false,
          isActive: false,
        },
        {
          name: 'Cool.js',
          isFolder: false,
          isActive: false,
        },
      ],
    },
  ]);

  const addToTaskList = () => {
    const id = taskList.length || 0;
    const newTask = {
      id: id + 1, // Use the current value of the ref
      name: task.trim(),
    };
    setTaskList([...taskList, newTask]);
    setTask('');
  };

  const removeItem = (id) => {
    setTaskList(taskList.filter((d) => d.id != id));
  };
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div>
        <ul>
          {taskList?.map((item) => (
            <div key={item.id}>
              <input type="checkbox" onClick={() => removeItem(item.id)} />
              {item.name}
            </div>
          ))}
        </ul>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input
          name="task"
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <button onClick={addToTaskList}>Add task</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <DirectoryMapping directory={directory} />
      <CheckBoxGroupList directory={directory} />
    </>
  );
}

export default App;
