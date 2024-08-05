import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PiPen, PiTrash, PiStarFill } from 'react-icons/pi'
import { NoteContext } from '../contexts/NoteContext'
import { deleteNote, updateNote } from '../services/apiService';




function CardDetailPage() {

    const { id } = useParams();
    const { selectedNote, setSelectedNote } = useContext(NoteContext);


    const navigate = useNavigate();


    const deleteCard = async () => {
        try {
            await deleteNote(selectedNote.id);
            navigate('/')
        } catch (error) {
            console.error('Error Deleting Card:', error)
        }
    }

    const updateLike = async () => {
        const updatedCard = {
            ...selectedNote, is_liked: !selectedNote.is_liked
        }
        try {
            await updateNote(selectedNote.id, updatedCard);
            setSelectedNote(updatedCard);

        } catch (error) {
            console.error('Error Updating Like:', error)

        }
    }

    // async function updateLike() {
    //     const updatedCard = {
    //         ...selectedNote, is_liked: !selectedNote.is_liked
    //     }

    //     try {
    //         const response = await fetch(`http://localhost:4000/api/notes/${id}`,
    //             {
    //                 method: 'PUT',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(updatedCard)
    //             })
    //         if (!response.ok) {
    //             throw new Error(`HTTP error,ststus = ${response.status}`)
    //         }
    //         setSelectedNote(updatedCard);

    //     } catch (error) {
    //         console.error(`HTTP error,`, error)

    //     }

    // }
    if (!selectedNote) {
        return <div>Card Not Found !</div>
    }

    return (
        <>
            <div className='detailCard-main'>
                <div className='detailCard'>
                    <div className='detailCard-headerBody'>
                        <div className='detailCard-header'>
                            <div className='detailCard-actions'>
                                <div className='detailCard-action-like' >
                                    <PiStarFill color={selectedNote.is_liked === true ? 'red' : '#d9d9d9'} size={selectedNote.is_liked === true ? 48 : 36} title='Like' onClick={updateLike} />
                                    {/* {flashcard.is_liked === 'true' ? <FaStar size={32} title='UnLike' color='red' /> : <FaStar size={24} title='Like' color='grey' />} */}
                                </div>
                                <div>
                                    {/* <p>Difficulty Level: {flashcard.difficulty}</p> */}

                                </div>
                                <div className='detailCard-action-edit'>
                                    {/* <div><input type='button' value="Delete" onClick={deleteCard} /></div> */}
                                    <PiTrash color='red' onClick={deleteCard} size={36} title='Delete' style={{ paddingRight: '1em' }} />
                                    <div><Link color='blue'
                                        to={{ pathname: `/EditCard/${id}` }}
                                    // state={{ flashcard }}
                                    ><PiPen size={36} title='Edit' /></Link></div>
                                </div>

                            </div>
                        </div>
                        <div className='divider-top' />

                        <div className='cardbody'>
                            <h4>{selectedNote.title}</h4>

                            <p>{selectedNote.description}</p>

                        </div>
                    </div>

                    <div className='detailCard-footer'>
                        <p>Created at: {selectedNote.created_at}</p>
                    </div>


                </div>





            </div>


        </>


    )
}


export default CardDetailPage