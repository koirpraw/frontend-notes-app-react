import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import DefaultBtn from '../components/DefaultBtn';

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

    const addCard = async () => {
        fetch(
            // "http://localhost:4001/flashcards", 
            "http://localhost:4000/api/notes",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCard)
            }

        )

    }

    async function onSubmit(e) {
        e.preventDefault();
        addCard();
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