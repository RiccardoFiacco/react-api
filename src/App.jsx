import { Header } from "./components/header/Header";
import style from "./App.module.css";
import './App.css'

function App() {
  return (
    <div className={`d-flex flex-column ${style.vh100}`}>
      <Header />
      
    </div>
  )
}

export default App
