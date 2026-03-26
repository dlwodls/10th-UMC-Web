import './App.css'
import Todo from './components/Todo';



// 할 일이 어떻게 생겼는지 정의
interface Task {
  id: number;
  text: string;
}

function App() {
  return <Todo />;
}

export default App