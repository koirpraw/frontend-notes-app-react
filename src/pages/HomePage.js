import React from 'react'
import Card from '../components/card'
import { useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'
import DefaultBtn from '../components/DefaultBtn';
import { NoteContext } from '../contexts/NoteContext';
import { fetchNotes, deleteAllNotes } from '../services/apiService';


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
    const { notes, setNotes, setSelectedNote } = useContext(NoteContext);


    const fetchData = async () => {
        try {
            const data = await fetchNotes();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();

    }, []);
    const handleCardClick = (card) => {
        setSelectedNote(card);
    };
    const deleteAll = async () => {
        try {
            await deleteAllNotes();
            fetchData();
        } catch (error) {
            console.error('Error Deleting all Cards', error)

        }
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

                        {notes && notes.map((card) => (
                            <li key={card.id} >
                                {/* _id for MongoDB nomenclature of primary id */}
                                {/* <li key={card._id}> */}

                                <Link
                                    to={`/CardDetailPage/${card.id}`}
                                    onClick={() => handleCardClick(card)}
                                    // state={{ card }}
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