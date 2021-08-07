import './App.css';
import List from "./components/list"
import { useRef } from "react"

function App() {
  const app = useRef(null)
  return (
    <div className="App">
      <List app={app} />
    </div>
  );
}

export default App;
