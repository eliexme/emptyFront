import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';

export default function Profile() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const [showpop, setShowpop] = useState(false)
    const [allexercises, setAllexercises] = useState([])
    const [rutinaId, setrutinaId] = useState([])
    const [rutinadata, setRutinadata] = useState([])
    const [payload, setPayload] = useState([])

    const toggleRutina = ()=>{
        setShowpop(!showpop)
    }

    const fetchExercises = async()=>{
        const response = await fetch('http://localhost:5005/exercise')
        if(response.status === 200 || response.status === 304){
            const parsed = await response.json()
            setAllexercises(parsed)
        }
    }

    const addToRutina = (exerId) => {
        if (!rutinaId.includes(exerId)) {
            setrutinaId((prevRutina) => {
                const updatedRutina = [...prevRutina, exerId];
                setRutinadata(allexercises.filter((eachExer) => updatedRutina.includes(eachExer._id)));
                return updatedRutina;
            });
        }
    };

    const deleteExer = (e, exerId)=>{
        e.preventDefault()
        const deleted = rutinaId.filter((eachExer) => eachExer !== exerId)
        setrutinaId(deleted)
        const updatedData = rutinadata.filter((eachExer)=>eachExer._id !== exerId)
        setRutinadata(updatedData)
    }

    const handleChange = (e, exerId)=>{
        const {name, value} = e.target
        console.log(name, value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const exer = {
            exerciseId: '',
            nombre: '',
            series: 0,
            repes: 0,
            peso: 0
        }
    }

    useEffect(()=>{
        fetchExercises()
    },[])



    return (
        <div>
            {user ? (
                <div>
                    <h2>Hello to profile {user.name}</h2>
                    <button onClick={toggleRutina}>Añadir rutina</button>

                    <div className={`${showpop ? 'showpop' : 'none'}`}>
                        <button onClick={toggleRutina}>X</button>

                        <div className='grid'>
                            {allexercises ? 
                                allexercises.map((oneExer)=>(
                                    <div key={oneExer._id}>
                                        <img onClick={()=>addToRutina(oneExer._id)} className='thumb' src={oneExer.imagen}/>
                                        <h4>{oneExer.nombre}</h4>
                                    </div>
                                ))
                            : <p>Loading...</p>}
                        </div>

                        <div>
                            <h2>Tu rutina</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='grid'>
                                    {rutinadata ? 
                                    rutinadata.length > 0 ? 
                                        rutinadata.map((oneExer)=>(
                                            <div key={oneExer._id}>
                                                <img onClick={()=>addToRutina(oneExer._id)} className='thumb' src={oneExer.imagen}/>
                                            <h4>{oneExer.nombre}</h4>
                                            <div>
                                                <div>
                                                    <label>Series</label>
                                                    <input type='number' name={payload.series} onChange={(e)=>handleChange(e, oneExer._id)}/>
                                                </div>

                                                <div>
                                                    <label>Repes</label>
                                                    <input type='number' name={payload.repes} onChange={(e)=>handleChange(e, oneExer._id)}/>
                                                </div>

                                                <div>
                                                    <label>Peso</label>
                                                    <input type='number' onChange={(e)=>handleChange(e, oneExer._id)}/>
                                                </div>

                                                <div>
                                                    <button onClick={(e)=>deleteExer(e, oneExer._id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            </div>
                                        ))

                                        : <p>Please add some exercises</p>
                                        
                                    : <p>Loading...</p>
                                    }
                                </div>

                                {rutinadata.length > 0 &&
                                <button type='submit'>Crear rutina</button>}
                                
                            </form>
                        </div>

                    </div>

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
