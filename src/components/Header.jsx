import React from 'react'
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/solid'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

const Header = ({ totalPacientes, modoEdicion }) => {
  return (
    <header className="mb-8 overflow-hidden rounded-4xl border border-white/10 bg-white/8 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-8 lg:mb-10 lg:p-10">
      <div className="pointer-events-none absolute right-8 top-6 hidden text-5xl opacity-10 lg:block">🐶</div>
      <div className="pointer-events-none absolute left-10 bottom-6 hidden text-4xl opacity-10 lg:block">🐱</div>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
            <SparklesIcon className="h-4 w-4" />
            Panel veterinario premium
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
              <ShieldCheckIcon className="h-4 w-4 text-emerald-300" />
              Clínica confiable
            </span>
            <span className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
              🐾 Atención integral
            </span>
            <span className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
              💉 Control clínico
            </span>
          </div>

          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl xl:text-6xl">
            Seguimiento de pacientes para una
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
              veterinaria moderna
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Gestiona citas, datos clínicos y observaciones en una experiencia elegante,
            clara y profesional diseñada para equipos que quieren transmitir confianza.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:w-90 lg:grid-cols-1 xl:w-105 xl:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-cyan-950/30">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Pacientes activos</p>
            <p className="mt-3 text-4xl font-black text-white">{totalPacientes}</p>
            <p className="mt-2 text-sm text-slate-400">
              {totalPacientes === 0 ? 'Empieza registrando tu primer paciente.' : 'Todo tu historial organizado en un solo lugar.'}
            </p>
            <div className="mt-4 flex gap-2 text-lg opacity-70">
              <span>🐾</span>
              <span>🩺</span>
              <span>🦴</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-slate-900/70 to-fuchsia-500/10 p-5 shadow-lg shadow-indigo-950/30">
            <div className="flex items-center gap-3 text-white">
              <HeartIcon className="h-8 w-8 text-rose-300" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Estado actual</p>
                <p className="text-lg font-bold">{modoEdicion ? 'Editando registro' : 'Listo para nuevas citas'}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              {modoEdicion ? 'Actualiza la ficha con precisión y guarda los cambios cuando termines.' : 'Captura datos completos con una interfaz rápida y visualmente limpia.'}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header