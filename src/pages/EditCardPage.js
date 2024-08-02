import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import DefaultBtn from '../components/DefaultBtn';


function EditCard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { flashcard } = location.state || {};


    // const [form, setForm] = useState({
    //     title: "",
    //     description: "",
    //     difficulty: 1,
    //     is_liked: false
    // })
    console.log(id);
    const [form, setForm] = useState(flashcard || {});
    console.log(`title:${form.title},is_liked:${form.is_liked}`)

    const [likeToggle, setLikeToggle] = useState(form.is_liked);

    const handleLikeToggle = () => {
        setLikeToggle(!likeToggle)
    }


    function updateForm
        (value) {
        return setForm
            ((prev) => {
                return { ...prev, ...value }
            })
    }



    const editedCard = {
        title: form.title,
        description: form.description,
        difficulty: form.difficulty,
        is_liked: likeToggle

    }

    async function editCardByID(docId) {

        try {
            const response = await fetch(`http://localhost:4000/api/notes/${id}`,
                {
                    // method: "PATCH",
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(editedCard)

                },
                console.log(`title:${form.title} is_liked:${form.is_liked} difficulty:${form.difficulty}`)


            )
            if (!response.ok) {
                throw new Error(`Http Error,could not edit data${Error}`)
            }
            const data = await response.json();
            console.log(data);


        } catch (error) {
            console.error('HTTP data Editing Error', error)

        }

    }

    async function onSubmit(e) {
        e.preventDefault();
        try {
            await editCardByID(id);
            navigate('/HomePage')

        } catch (error) {
            console.error('Failed to edit card', error);

        }

    }



    return (
        <>
            <div className='form-area'>
                <h1>Edit Note</h1>
                <form className='form' onSubmit={onSubmit} >

                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            id='title'
                            value={form.title}
                            onChange={(e) => updateForm({ title: e.target.value })}

                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <textarea
                            type="text"
                            name="description"
                            id='description'
                            rows={10}
                            value={form.description}
                            onChange={(e) => updateForm({ description: e.target.value })}
                        />
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '60%' }} >
                        <label>
                            <p>Favorite :</p>
                        </label>
                        <input type='checkbox' checked={likeToggle} onChange={handleLikeToggle} size='1em' />
                    </div>
                    <div style={{ width: '60%' }}>
                        <label>
                            Difficulty Level: {form.difficulty}
                            <input type='range' min='0' max='5' step='1' className='slider' value={form.difficulty} onChange={(e) => updateForm({ difficulty: e.target.value })} />
                        </label>

                    </div>


                    <br />
                    <div className='submit-btn'>
                        <input type="submit" value="Submit" />
                    </div>
                </form>

            </div>
            <div>
                <DefaultBtn route={`/CardDetailPage/${id}`} title={'Back'} bgColor={'grey'} />

            </div>

        </>
    )
}

export default EditCard