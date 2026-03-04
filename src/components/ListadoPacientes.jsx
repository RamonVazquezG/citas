import React from 'react'
import Paciente from "./Paciente"

const ListadoPacientes = ({pacientes, setPaciente}) => {
    return (
        <div className="mb:w-1/2 lg:w-3/5 md:h-screen md:overflow-y-scroll">
            <h2 className="font-black text-3xl text-center">
                Listado Pacientes
            </h2>
            
            <p className="text-xl mt-5 mb-10 text-center">
                Administra tus {''}
                <span className="text-indigo-600 font-bold ">
                    Pacientes y Citas
                </span>
            </p>
            

            {pacientes.length === 0 ? (
                    <p className='text-center text-2xl'>No hay pacientes</p>
                )
                :(
                    pacientes.map((paciente) => (
                        <Paciente
                            key={paciente.id}
                            paciente={paciente}
                            setPaciente={setPaciente}
                        />
                    ))
                )
            }

        </div>
    )
}

export default ListadoPacientes