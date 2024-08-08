import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PiPen, PiTrash, PiStarFill } from 'react-icons/pi'

import { deleteNote, updateNote } from '../services/apiService';
import useStore from '../lib/store';




function CardDetailPage() {

    const { id } = useParams();
    // const { selectedNote, setSelectedNote } = useContext(NoteContext);
    const { selectedNote, setSelectedNote } = useStore();


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
                                        to={{ pathname: `/EditCard/${selectedNote.id}` }}
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