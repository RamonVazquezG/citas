import React from 'react'
import { toast } from 'react-toastify'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const Paciente = ({ paciente, setPaciente, setPacientes }) => {

    const { nombre, propietario, email, fecha, sintomas, id } = paciente

    const fechaFormateada = new Intl.DateTimeFormat('es-MX', {
        dateStyle: 'long',
    }).format(new Date(`${fecha}T00:00:00`))

    const handleDelete = () => {
        const confirmar = window.confirm(`¿Deseas eliminar el registro de ${nombre}?`)

        if (!confirmar) {
            return
        }

        setPacientes(prevPacientes => prevPacientes.filter(pacienteState => pacienteState.id !== id))
        toast.error('Paciente eliminado')
    }

    return (
        <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/60 shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
            <div className="h-1.5 w-full bg-linear-to-r from-cyan-400 via-blue-500 to-fuchsia-500" />

            <div className="p-5 sm:p-6">
                <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Paciente veterinario</p>
                        <h3 className="mt-2 text-2xl font-black text-white">{nombre}</h3>
                        <p className="mt-1 text-sm text-slate-400">Responsable: {propietario}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">🐾 Mascota</span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">🩺 Observación</span>
                        </div>
                    </div>

                    <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                        🐶 Registro activo
                    </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Correo electrónico</p>
                        <p className="mt-2 break-all text-sm font-medium text-slate-200 sm:text-base">{email}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Fecha de alta</p>
                        <p className="mt-2 text-sm font-medium text-slate-200 sm:text-base">{fechaFormateada}</p>
                    </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Síntomas</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">{sintomas}</p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/15"
                    onClick={() => setPaciente(paciente)}
                >
                    <PencilSquareIcon className="h-5 w-5" />
                    Editar
                </button>

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-rose-200 transition hover:border-rose-300/40 hover:bg-rose-400/15"
                    onClick={handleDelete}
                >
                    <TrashIcon className="h-5 w-5" />
                    Eliminar
                </button>
                </div>
            </div>
        </article>
    )
}

export default Paciente