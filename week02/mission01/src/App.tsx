import './App.css'
import { useState } from 'react';

// 할 일이 어떻게 생겼는지 정의
interface Task {
  id: number;
  text: string;
}

function App() {
  const [toDo, setTodo] = useState<Task[]>([]);
  const [doneTask, setDoneTask] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>(''); // 입력창 관리 값

  // 입력창 타이핑할 때마다 inputValue 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  // 할 일 추가 처리 함수 (addTodo)
  const addTodo = () => {
    if (inputValue.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: inputValue
    };
    setTodo([...toDo, newTask]);
    setInputValue('');
  };

  // 할 일 상태 변경 (완료로 이동)
  const moveToDone = (task: Task) => {
    setTodo(toDo.filter((t) => t.id !== task.id));
    setDoneTask([...doneTask, task]);
  };

  // 완료된 할 일 삭제 함수
  const deleteDoneTask = (id: number) => {
    setDoneTask(doneTask.filter((t) => t.id !== id));
  };

  // 폼 제출 이벤트 (onSubmit으로 대체)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
  }

return (
    <>
      <div className='todo-container'>
        <h1 className='todo-container__header'>ARI'S TODO</h1>
        <form id='todo-form' className='todo-container__form' onSubmit={handleSubmit}>
          <input type='text' id='todo-input' className='todo-container__input' placeholder='할 일 입력' required 
                value={inputValue} onChange={handleChange} />
          <button type='submit' className='todo-container__button'>할 일 추가</button>
        </form>
        <div className='render-container'>
          <div className='render-container__section'>
            <h2 className='render-container__title'>할 일</h2>
            <ul id='todo-list' className='render-container__list'>
              {toDo.map((task) => (
                <li key={task.id} className='render-container__item'>
                  <span className='render-container__item-text'>{task.text}</span>
                  <button className='todo-container__button' onClick={() => moveToDone(task)}>완료</button>
                </li>
              ))}
            </ul>
          </div>
          <div className='render-container__section'>
            <h2 className='render-container__title'>완료</h2>
            <ul id='done-list' className='render-container__list'>
              {doneTask.map((task) => (
                <li key={task.id} className='render-container__item'>
                  <span className='render-container__item-text'>{task.text}</span>
                  <button className='render-container__item-button' onClick={() => deleteDoneTask(task.id)}>삭제</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App