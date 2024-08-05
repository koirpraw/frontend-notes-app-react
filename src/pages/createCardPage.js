import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import DefaultBtn from '../components/DefaultBtn';
import { createNote } from '../services/apiService';

function CreateCard() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        difficulty: 1
    })

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value }
        });
    }

    const newCard = { ...form }

    const navigate = useNavigate();

    const addNote = async () => {
        try {
            await createNote(newCard);
        } catch (error) {
            console.error('Error creating Note:', error);
            throw error;
        }

    }

    async function onSubmit(e) {
        e.preventDefault();
        addNote()
        setForm({ title: "", description: "", difficulty: 0 })
        navigate('/')
    }
    return (
        <>
            <div className='form-area'>

                <form className='form' onSubmit={onSubmit}>
                    <h1>Create Note</h1>

                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            id='title'
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
                            onChange={(e) => updateForm({ description: e.target.value })}
                        />
                    </label>
                    <br />

                    <label>
                        Difficulty Level: {form.difficulty}
                        <input type='range' min='1' max='5' className='slider' value={form.difficulty} onChange={(e) => updateForm({ difficulty: e.target.value })} />
                    </label>

                    <br />
                    {/* <div className='submit-btn'>
        <input type="submit" value="Submit" />
    </div>
    <br /> */}
                    <div className='submit-btn'>
                        <input type="submit" value="Add" />
                    </div>
                </form>
                {/* <div className='submit-btn'>
    <Link to='/'><input type="submit" value="back" /></Link>
</div> */}



            </div>
            <div>
                <DefaultBtn route={"/"} bgColor={'grey'} title={'Back'} />
            </div>

        </>

    )
}

export default CreateCard