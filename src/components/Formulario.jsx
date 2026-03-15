// import React from 'react'
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { z } from 'zod';
import {
    CalendarDaysIcon,
    EnvelopeIcon,
    ExclamationCircleIcon,
    SparklesIcon,
    UserIcon,
    BugAntIcon,
} from "@heroicons/react/24/outline";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [especie, setEspecie] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [urgente, setUrgente] = useState(false);
    const [error, setError] = useState({});

    const notify = () => toast('Paciente Registrado');
    const notifyEdit = () => toast('Cambios Guardados');

    const inputBaseClasses = "mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition duration-200 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10";
    const labelBaseClasses = "mb-1 block text-sm font-semibold uppercase tracking-[0.2em] text-slate-300";
    const errorTextClasses = "mt-2 inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-1 text-sm text-rose-200";

    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre || '')
            setPropietario(paciente.propietario || '')
            setEmail(paciente.email || '')
            setFecha(paciente.fecha || '')
            setEspecie(paciente.especie || '')
            setSintomas(paciente.sintomas || '')
            setUrgente(paciente.urgente || false)
        }
    }, [paciente])

    const pacienteSchema = z.object({
        nombre: z
            .string()
            .min(3, "El nombre debe tener al menos 3 caracteres"),

        propietario: z
            .string()
            .min(5, "El propietario debe tener al menos 5 caracteres"),

        email: z
            .string()
            .email("El email no es válido"),

        fecha: z
            .string()
            .refine((value) => !isNaN(Date.parse(value)), {
                message: "La fecha no es válida",
            })
            .refine((value) => new Date(value) <= new Date(), {
                message: "La fecha no puede ser futura",
            }),

        especie: z
            .enum(["Perro", "Gato", "Conejo", "Ave", "Otro"], {
                message: "Campo obligatorio, por favor elija la especie de su mascota"
            }),

        sintomas: z
            .string()
            .min(10, "Describe los síntomas con al menos 10 caracteres"),
        urgente: z.boolean().optional(),
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        /* Ya no lo ocupamos, validación manual que vamos a reemplazar por Zod
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            console.log('Hay al menos un campo vacio')

            setError(true)
            return;
        } */

        /*
        const objetoPacientes = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }*/

        const resultado = pacienteSchema.safeParse({
            nombre,
            propietario,
            email,
            fecha,
            especie,
            sintomas,
            urgente
        });

        if (!resultado.success) {
            console.log(resultado.error.format());
            setError(resultado.error.format());
            return;
        }

        setError({})

        const objetoPaciente = resultado.data;


        if (paciente && paciente.id) {
            objetoPaciente.id = paciente.id
            const pacientesActualizados = pacientes.map(p => p.id === paciente.id ? objetoPaciente : p)
            setPacientes(pacientesActualizados)
            setPaciente({})
            notifyEdit()
        } else {
            objetoPaciente.id = Date.now().toString()
            setPacientes([...pacientes, objetoPaciente])
            notify()
        }

        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setEspecie('');
        setSintomas('');
        setUrgente(false);
    };

    const handleCancelar = () => {
        // Limpiar el paciente seleccionado
        setPaciente({});

        // Regresar campos a nada
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setEspecie('');
        setSintomas('');
        setUrgente(false);

        // Limpiar cualquier error que pueda aparecer
        setError({});
    };

    return (
        <section className="rounded-4xl border border-white/10 bg-white/8 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-6 lg:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                        <SparklesIcon className="h-4 w-4" />
                        Registro clínico
                    </div>
                    <h2 className="mt-4 text-3xl font-black text-white">{paciente?.id ? 'Actualizar paciente' : 'Nuevo paciente'}</h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                        Completa la ficha con información clara y bien estructurada para una atención más eficiente.
                    </p>
                </div>

                <div className="hidden rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 text-right sm:block">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Registros</p>
                    <p className="text-2xl font-black text-white">{pacientes.length}</p>
                </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="rounded-[1.5rem] border border-emerald-400/15 bg-emerald-400/5 px-4 py-3 text-sm leading-6 text-emerald-100">
                    <span className="mr-2">🐶</span>
                    Registra antecedentes y síntomas con lenguaje claro para agilizar la atención en consulta.
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                    <div>
                        <label className={labelBaseClasses} htmlFor="mascota">
                            <span className="mb-2 flex items-center gap-2 text-slate-300">
                                <UserIcon className="h-5 w-5 text-cyan-300" />
                                Nombre de la mascota
                            </span>
                        </label>
                        <input
                            type="text"
                            id="mascota"
                            placeholder="Ej. Luna"
                            className={inputBaseClasses}
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />

                        {error?.nombre?._errors[0] && (
                            <p className={errorTextClasses}>
                                <ExclamationCircleIcon className="h-4 w-4" />
                                {error.nombre._errors[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={labelBaseClasses} htmlFor="propietario">
                            <span className="mb-2 flex items-center gap-2 text-slate-300">
                                <UserIcon className="h-5 w-5 text-cyan-300" />
                                Nombre del propietario
                            </span>
                        </label>
                        <input
                            type="text"
                            id="propietario"
                            placeholder="Ej. Carlos Hernández"
                            className={inputBaseClasses}
                            value={propietario}
                            onChange={e => setPropietario(e.target.value)}
                        />

                        {error?.propietario?._errors[0] && (
                            <p className={errorTextClasses}>
                                <ExclamationCircleIcon className="h-4 w-4" />
                                {error.propietario._errors[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={labelBaseClasses} htmlFor="email">
                            <span className="mb-2 flex items-center gap-2 text-slate-300">
                                <EnvelopeIcon className="h-5 w-5 text-cyan-300" />
                                Correo electrónico
                            </span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="cliente@correo.com"
                            className={inputBaseClasses}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        {error?.email?._errors[0] && (
                            <p className={errorTextClasses}>
                                <ExclamationCircleIcon className="h-4 w-4" />
                                {error.email._errors[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={labelBaseClasses} htmlFor="alta">
                            <span className="mb-2 flex items-center gap-2 text-slate-300">
                                <CalendarDaysIcon className="h-5 w-5 text-cyan-300" />
                                Fecha de alta
                            </span>
                        </label>
                        <input
                            type="date"
                            id="alta"
                            className={inputBaseClasses}
                            value={fecha}
                            onChange={e => setFecha(e.target.value)}
                        />

                        {error?.fecha?._errors[0] && (
                            <p className={errorTextClasses}>
                                <ExclamationCircleIcon className="h-4 w-4" />
                                {error.fecha._errors[0]}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className={labelBaseClasses} htmlFor="especie">
                        <span className="mb-2 flex items-center gap-2 text-slate-300">
                            <BugAntIcon className="h-5 w-5 text-cyan-300" />
                            Especie
                        </span>
                    </label>
                    <select
                        type="text"
                        id="especie"
                        placeholder="Seleccione la especie de su mascota"
                        className={inputBaseClasses}
                        value={especie}
                        onChange={e => setEspecie(e.target.value)}
                    >
                        <option value="default">Seleccione una opción...</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Conejo">Conejo</option>
                        <option value="Ave">Ave</option>
                        <option value="Otro">Otro</option>
                    </select>

                    {error?.especie?._errors[0] && (
                        <p className={errorTextClasses}>
                            <ExclamationCircleIcon className="h-4 w-4" />
                            {error.especie._errors[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className={labelBaseClasses} htmlFor="sintomas">
                        Síntomas y observaciones
                    </label>
                    <textarea
                        id="sintomas"
                        rows="5"
                        placeholder="Describe signos clínicos, comportamientos o notas relevantes"
                        className={`${inputBaseClasses} resize-none`}
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />

                    {error?.sintomas?._errors[0] && (
                        <p className={errorTextClasses}>
                            <ExclamationCircleIcon className="h-4 w-4" />
                            {error.sintomas._errors[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className={labelBaseClasses} htmlFor="urgente">
                        <span className="mb-2 flex items-center gap-2 text-slate-300">
                            <ExclamationCircleIcon className="h-5 w-5 text-cyan-300" />
                            Urgente

                            <input
                                type="checkbox"
                                id="urgente"
                                onChange={e => setUrgente(e.target.checked)}
                                checked={urgente}
                                className="ml-3 h-5 w-5 rounded border border-white/10 bg-slate-950/60 text-cyan-400 focus:ring-cyan-400/20"
                            />
                        </span>
                    </label>
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">

                    {paciente?.id && (
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-red-400 via-red-500 to-red-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-slate-950 transition duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-cyan-500/20"
                            onClick={handleCancelar}
                        >
                            Cancelar
                        </button>
                    )}


                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500 px-6 py-3 text-sm font-bold uppercase tracking-[0.24em] text-slate-950 transition duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-cyan-500/20"
                    >
                        {paciente?.id ? 'Guardar cambios' : 'Agregar paciente'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Formulario