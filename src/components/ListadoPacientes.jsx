import React from 'react'
import Paciente from "./Paciente"
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

const ListadoPacientes = ({ pacientes, setPacientes, setPaciente }) => {
    return (
        <section className="rounded-4xl border border-white/10 bg-white/8 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-6 lg:p-7">
            <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                        <ClipboardDocumentListIcon className="h-4 w-4" />
                        Agenda inteligente
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">🐱 Historial clínico</span>
                        <span className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">🦴 Seguimiento</span>
                    </div>
                    <h2 className="mt-4 text-3xl font-black text-white">Listado de pacientes</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300 sm:text-base">
                        Consulta, edita y mantiene visible la información clínica más importante.
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 text-left sm:text-right">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Total actual</p>
                    <p className="text-2xl font-black text-white">{pacientes.length}</p>
                </div>
            </div>

            {pacientes.length === 0 ? (
                <div className="flex min-h-95 flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-white/10 bg-slate-950/40 px-6 text-center">
                    <div className="mb-5 rounded-full bg-cyan-400/10 p-4 text-cyan-300">
                        <ClipboardDocumentListIcon className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-black text-white">Aún no hay pacientes</h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
                        Cuando registres una nueva cita, aquí aparecerán tarjetas claras y visuales para gestionar cada caso.
                    </p>
                    <div className="mt-5 flex gap-3 text-2xl opacity-70">
                        <span>🐾</span>
                        <span>🐶</span>
                        <span>🐱</span>
                    </div>
                </div>
                ) : (
                    <div className="custom-scrollbar max-h-195 space-y-4 overflow-y-auto pr-1">
                        {pacientes
                        .sort((a,b) => b.urgente - a.urgente)
                        .map((paciente) => (
                            <Paciente
                                key={paciente.id}
                                paciente={paciente}
                                setPaciente={setPaciente}
                                setPacientes={setPacientes}
                            />
                        ))}
                    </div>
                )
            }

        </section>
    )
}

export default ListadoPacientes