import './App.css';
import { useState, useRef } from "react"
import Routes from "./routes"

function App() {
  const app = useRef(null)
  const [atBottom, setAtBottom] = useState(false)

  const handleScroll = () => {
    const bottom = (Math.ceil(app.current.clientHeight + app.current.scrollTop) === app.current.scrollHeight)
    if (bottom) { 
      setAtBottom(true)
    }
    else{
      setAtBottom(false)
    }
  }

  return (
    <div className="App" onScroll={() => handleScroll()} ref={app}>
      <Routes atBottom={atBottom}/>
    </div>
  );
}

export default App;