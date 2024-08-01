import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PiPen, PiTrash, PiStarFill } from 'react-icons/pi'




function CardDetailPage() {

    const { id } = useParams();
    const location = useLocation();

    const { card } = location.state || {};
    const [flashcard, setflashcard] = useState(card || {});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // const [likeToggle, setLikeToggle] = useState()



    async function getCardByID(docId) {
        // const id = params._id.toString();

        try {
            const res = await fetch(`http://localhost:4000/api/notes/${id}`)
            if (!res.ok) {
                throw new Error(`Http Error,couldnot fetchdata,${Error}`)
            }
            const data = await res.json();
            console.log(data);
            setflashcard(data);
        } catch (error) {
            setError(error)
            console.log('HTTP Error', error)
        } finally {
            setLoading(false)

        }
    }

    useEffect(() => {
        if (!card) {
            getCardByID(id);
        } else {
            setLoading(false);
        }
    }, [id, card]);


    const deleteCard = async () => {
        try {
            const response = await fetch(
                // `http://localhost:4001/flashcards/${id}`,
                `http://localhost:4000/api/notes/${id}`,
                { method: 'DELETE' })
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);

            }

        } catch (error) {
            console.error('HTTP Error:', error);
        }
        navigate("/HomePage")


    }



    async function updateLike() {
        const updatedCard = {
            ...flashcard, is_liked: !flashcard.is_liked
        }

        try {
            const response = await fetch(`http://localhost:4000/api/notes/${id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedCard)
                })
            if (!response.ok) {
                throw new Error(`HTTP error,ststus = ${response.status}`)
            }
            setflashcard(updatedCard);

        } catch (error) {
            console.error(`HTTP error,`, error)

        }
        // 

    }

    return (
        <>
            <div className='detailCard-main'>
                <div className='detailCard'>
                    <div className='detailCard-headerBody'>
                        <div className='detailCard-header'>
                            <div className='detailCard-actions'>
                                <div className='detailCard-action-like' >
                                    <PiStarFill color={flashcard.is_liked === true ? 'red' : '#d9d9d9'} size={flashcard.is_liked === true ? 48 : 36} title='Like' onClick={updateLike} />
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
                                        state={{ flashcard }}
                                    ><PiPen size={36} title='Edit' /></Link></div>
                                </div>

                            </div>
                        </div>
                        <div className='divider-top' />

                        <div className='cardbody'>
                            <h4>{flashcard.title}</h4>

                            <p>{flashcard.description}</p>

                        </div>
                    </div>

                    <div className='detailCard-footer'>
                        <p>Created at: {flashcard.created_at}</p>
                    </div>


                </div>





            </div>
            {/* <div className='submit-btn'>
                <Link to='/'><input type="submit" value="back" /></Link>
            </div> */}
            {/* <DefaultBtn route={'/'} title={'Back'} bgColor={'grey'} /> */}


        </>


    )
}


export default CardDetailPage