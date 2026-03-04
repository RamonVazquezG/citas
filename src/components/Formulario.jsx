// import React from 'react'
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { z } from 'zod';
import { AcademicCapIcon } from "@heroicons/react/24/outline";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState({});

    const notify = () => toast('Paciente Registrado');
    const notifyEdit = () => toast('Cambios Guardados');

    useEffect(() =>{
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre || '')
            setPropietario(paciente.propietario || '')
            setEmail(paciente.email || '')
            setFecha (paciente.fecha || '')
            setSintomas(paciente.sintomas || '')
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

        sintomas: z
            .string()
            .min(10, "Describe los síntomas con al menos 10 caracteres"),
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
            sintomas
        });

        if (!resultado.success) {
            console.log(resultado.error.format());
            setError(resultado.error.format());
            return;
        }

        setError(false)

        const objetoPaciente = resultado.data;
        

        if(paciente && paciente.id){
            objetoPaciente.id = paciente.id
            const pacientesActualizados = pacientes.map(p => p.id === paciente.id ? objetoPaciente : p)
            setPacientes(pacientesActualizados)
            setPaciente({})
            notifyEdit()
        } else {
            objetoPaciente.id = Date.now().toString()
            setPacientes( [...pacientes, objetoPaciente])
            notify()
        }

        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');

    };



    return (
        <div className="md:w-1/2 lg:w2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold ">Admistralos</span>
            </p>

            <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={handleSubmit}>


                <div className="mb-5">

                    <AcademicCapIcon className="h-6 w-6 text-gray-500" />

                    <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">
                        Nombre Mascota
                    </label>
                    <input
                        type="text"
                        id="mascota"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />

                    {error?.nombre?._errors[0] && (
                        <p className="text-red-500 text-sm">
                            {error.nombre._errors[0]}
                        </p>
                    )}

                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">
                        Nombre Propietario
                    </label>
                    <input
                        type="text"
                        id="propietario"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}


                    />

                    {error?.propietario?._errors[0] && (
                        <p className="text-red-500 text-sm">
                            {error.propietario._errors[0]}
                        </p>
                    )}

                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Dirección de email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}


                    />

                    {error?.email?._errors[0] && (
                        <p className="text-red-500 text-sm">
                            {error.email._errors[0]}
                        </p>
                    )}

                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">
                        Fecha de alta
                    </label>
                    <input
                        type="date"
                        id="alta"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}


                    />

                    {error?.fecha?._errors[0] && (
                        <p className="text-red-500 text-sm">
                            {error.fecha._errors[0]}
                        </p>
                    )}

                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">
                        Sintomas de la mascota
                    </label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}


                    />

                    {error?.sintomas?._errors[0] && (
                        <p className="text-red-500 text-sm">
                            {error.sintomas._errors[0]}
                        </p>
                    )}

                </div>

                <input
                    type="submit"
                    className=" bg-indigo-600 w-full p-3 text-white uppercase font-bold
           hover:bg-indigo-700 transition-all"
                    value="Agregar Paciente"
                />
            </form>
        </div>
    )
}

export default Formulario