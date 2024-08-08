import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import DefaultBtn from '../components/DefaultBtn';

import { fetchNotes, updateNote } from '../services/apiService';
import useStore from '../lib/store';


function EditCard() {
    const { id } = useParams();
    const navigate = useNavigate();

    // const { selectedNote } = useContext(NoteContext);
    const { selectedNote } = useStore();

    const [form, setForm] = useState(selectedNote || {});
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

    const editNoteByID = async (id) => {
        try {
            await updateNote(id, editedCard);
        } catch (error) {
            console.error('Error Editing Card:', error)

        }
    }


    async function onSubmit(e) {
        e.preventDefault();
        try {
            await editNoteByID(id);
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