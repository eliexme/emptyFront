import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddExercise() {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState()
    const [imagen, setImagen] = useState()
    const [video, setVideo] = useState()
    const [notas, setNotas] = useState()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5005/exercise/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, imagen, video, notas })
        })

        if(response.status === 201 || response.status === 304){
            navigate('/exervenue')
        }
    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre del ejercicio</label>
                <input name='nombre' onChange={(e)=>setNombre(e.target.value)}/>
            </div>

            <div>
                <label>Imagen</label>
                <input name='imagen' onChange={(e)=>setImagen(e.target.value)}/>
            </div>

            <div>
                <label>Video</label>
                <input name='video' onChange={(e)=>setVideo(e.target.value)}/>
            </div>

            <div>
                <label>Notas</label>
                <input name='notas' onChange={(e)=>setNotas(e.target.value)}/>
            </div>

            <button type='submit'>Añadir</button>
        </form>
    </div>
  )
}
