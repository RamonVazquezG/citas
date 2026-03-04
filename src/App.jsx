import Header from "./components/Header.jsx"
import ListadoPacientes from "./components/ListadoPacientes.jsx"
import Formulario from "./components/Formulario.jsx"
import {useState} from "react"
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  return (
    <>
      < ToastContainer />
      <Header />
      <div className="flex">
        <Formulario 
          pacientes = {pacientes}
          setPacientes = {setPacientes}
          paciente = {paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes 
          pacientes = {pacientes}
          setPaciente = {setPaciente}
        />
      </div>
    </>
  )
}

export default App
