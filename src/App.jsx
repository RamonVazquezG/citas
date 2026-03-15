import Header from "./components/Header.jsx"
import ListadoPacientes from "./components/ListadoPacientes.jsx"
import Formulario from "./components/Formulario.jsx"
import { useState, useEffect } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {

  const [pacientes, setPacientes] = useState(() => {
    try {
      const stored = localStorage.getItem('pacientes')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error al leer localStorage', error)
      return []
    }
  })
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    try {
      localStorage.setItem('pacientes', JSON.stringify(pacientes))
    } catch (error) {
      console.error('Error al guardar en localStorage', error)
    }
  }, [pacientes])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute left-8 top-32 hidden rotate-[-12deg] text-6xl opacity-10 lg:block">🐾</div>
        <div className="absolute bottom-24 right-12 hidden rotate-[18deg] text-7xl opacity-10 xl:block">🐾</div>
        <div className="absolute right-1/4 top-1/2 hidden text-5xl opacity-10 lg:block">🦴</div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2400}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <Header
          cantidadPerros={pacientes.filter(p => p.especie === 'Perro').length}
          cantidadGatos={pacientes.filter(p => p.especie === 'Gato').length}
          cantidadConejos={pacientes.filter(p => p.especie === 'Conejo').length}
          cantidadAves={pacientes.filter(p => p.especie === 'Ave').length}
          cantidadOtros={pacientes.filter(p => p.especie === 'Otro').length}
          cantidadUrgentes={pacientes.filter(p => p.urgente === true).length}
          totalPacientes={pacientes.length}
          modoEdicion={Boolean(paciente?.id)}
        />

        <section className="mb-6 grid gap-4 md:grid-cols-3 xl:mb-8">
          <article className="vet-badge-panel rounded-[1.5rem] border border-cyan-400/15 bg-slate-900/65 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Bienestar animal</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Diseño inspirado en clínica veterinaria con señales visuales de confianza, cuidado y orden.</p>
          </article>

          <article className="vet-badge-panel rounded-[1.5rem] border border-emerald-400/15 bg-slate-900/65 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">Consulta clara</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Tarjetas limpias, fondos clínicos y detalles decorativos ligados al entorno veterinario.</p>
          </article>

          <article className="vet-badge-panel rounded-[1.5rem] border border-fuchsia-400/15 bg-slate-900/65 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-fuchsia-300">Atención premium</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Una experiencia más cálida para transmitir profesionalismo en cada interacción.</p>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] xl:gap-8">
          <Formulario
            pacientes={pacientes}
            setPacientes={setPacientes}
            paciente={paciente}
            setPaciente={setPaciente}
          />

          <ListadoPacientes
            pacientes={pacientes}
            setPacientes={setPacientes}
            setPaciente={setPaciente}
          />
        </section>
      </div>
    </main>
  )
}

export default App
