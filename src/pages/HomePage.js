import React from 'react'
import Card from '../components/card'
import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'
import DefaultBtn from '../components/DefaultBtn';


function DeleteDialog({ deleteMethod }) {
    return (
        <>
            <dialog open>
                <p>This will Delete All Cards. Are You Sure ?</p>
                <form method="dialog">
                    <button onClick={deleteMethod}>Yes Delete All</button>
                </form>
            </dialog>
        </>
    )
}

function HomePage() {
    const navigate = useNavigate();
    const [flashCards, setflashCards] = useState([]);

    const fetchData = async () => {
        try {
            // const response = await fetch('http://localhost:4001/flashcards');
            const response = await fetch('http://localhost:4000/api/notes');
            if (!response.ok) {
                throw new Error(`HTTP Error: status${response.status}`)
            }
            const data = await response.json();
            // console.log(data);
            setflashCards(data)

        } catch (error) {
            console.error('Error:', error)

        }
    };

    useEffect(() => {

        fetchData();
    }, [])

    const deleteAll = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/notes", { method: 'DELETE' })
            if (!response.ok) {
                throw new Error(`HTTP Error,status=${response.status}`)
            }

        } catch (error) {
            console.log('Error Deleting all Cards', error)

        }
        navigate('/')
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className='main-home'>


                <header className="main-title">
                    <h3>My Notes</h3>
                </header>
                <div className='card-List'>
                    <ol>
                        {flashCards && flashCards.map((card) => (
                            <li key={card.id} >
                                {/* _id for MongoDB nomenclature of primary id */}
                                {/* <li key={card._id}> */}

                                <Link
                                    to={`/CardDetailPage/${card.id}`}
                                    state={{ card }}
                                    style={{ textDecoration: 'none' }}
                                >

                                    <Card
                                        difficulty={card.difficulty}
                                        title={card.title}
                                        description={card.description}
                                        created_at={card.created_at}
                                        likeColor={card.is_liked === true ? 'red' : '#d9d9d9'}
                                        // iconSize={card.is_liked === true ? 40 : 36}
                                        iconSize={36}
                                    />

                                </Link>

                            </li>
                        ))}
                    </ol>
                    <div className='home-btns'>
                        <DefaultBtn route={"/createCard"} title={"Create"} bgColor={'blue'} />
                        <br />
                        {/* <Link color='white' onClick={() => {
                            if (window.confirm('Are you sure you want to delete all? This action can not be reversed')) {
                                deleteAll();
                            }
                        }}><h3>DELETE ALL</h3></Link> */}
                        <DefaultBtn onClick={() => {
                            if (window.confirm('Are you sure you want to delete all? This action can not be reversed')) {
                                deleteAll();
                            }
                        }}
                            route={"/"}

                            title={"Delet All"}
                            bgColor={'red'}
                        />

                    </div>

                </div>





            </div>



        </>




    )
}

export default HomePage