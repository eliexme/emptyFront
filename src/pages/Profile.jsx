import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';

export default function Profile() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const [showpop, setShowpop] = useState(false)
    const [allexercises, setAllexercises] = useState([])
    const [newrutina, setNewrutina] = useState([])
    const [rutinadata, setRutinadata] = useState([])

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
        if (!newrutina.includes(exerId)) {
            setNewrutina((prevRutina) => {
                const updatedRutina = [...prevRutina, exerId];
                setRutinadata(allexercises.filter((eachExer) => updatedRutina.includes(eachExer._id)));
                return updatedRutina;
            });
        }
    };

    useEffect(()=>{
        fetchExercises()
    },[])

    useEffect(()=>{
        console.log(rutinadata)
    },[rutinadata])



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
                            <div className='grid'>
                                {rutinadata ? 
                                    rutinadata.map((oneExer)=>(
                                        <div key={oneExer._id}>
                                            <img onClick={()=>addToRutina(oneExer._id)} className='thumb' src={oneExer.imagen}/>
                                            <h4>{oneExer.nombre}</h4>
                                            <form>
                                                <div>
                                                    <label>Series</label>
                                                    <input type='number'/>
                                                </div>

                                                <div>
                                                    <label>Repes</label>
                                                    <input type='number'/>
                                                </div>

                                                <div>
                                                    <label>Peso</label>
                                                    <input type='number'/>
                                                </div>
                                            </form>
                                        </div>
                                    ))
                                : <p>Loading...</p>}
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
