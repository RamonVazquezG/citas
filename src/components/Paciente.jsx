import React from 'react'

const Paciente = ({paciente, setPaciente}) => {

    const {nombre, propietario, email, fecha, sintomas} = paciente

    return (
        <div className=' m-3 bg-white shadow-md px-5 py-10 rounded-xl'>
            <p className=' font-bold mb-3 text-gray-700 uppercase'>
                Nombre: {''}
                <span className=' font-normal normal-case'>{nombre}</span>
            </p>

            <p className=' font-bold mb-3 text-gray-700 uppercase'>
                Propietario: {''}
                <span className=' font-normal normal-case'>{propietario}</span>
            </p>

            <p className=' font-bold mb-3 text-gray-700 uppercase'>
                E-Mail: {''}
                <span className=' font-normal normal-case'>{email}</span>
            </p>

            <p className=' font-bold mb-3 text-gray-700 uppercase'>
                Fecha de Alta: {''}
                <span className=' font-normal normal-case'>{fecha}</span>
            </p>

            <p className=' font-bold mb-3 text-gray-700 uppercase'>
                Sintomas: {''}
                <span className=' font-normal normal-case'>{sintomas}</span>
            </p>

            <div className="flex justify-between mt-5">
                <button
                    type="button"
                    className="py-2 px-6 bg-indigo-600 text-white uppercase font-bold rounded-lg hover:bg-indigo-700"
                    onClick={() => setPaciente(paciente)}
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="py-2 px-6 bg-red-600 text-white uppercase font-bold rounded-lg hover:bg-red-700"
                    onClick={() => console.log('eliminar')}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Paciente