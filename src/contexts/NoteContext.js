import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { fetchNotes } from '../services/apiService'


export const NoteContext = createContext();

function NoteProvider({ children }) {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchNotes();
                setNotes(data);
            } catch (error) {

                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])
    return (
        <NoteContext.Provider value={{ notes, setNotes, selectedNote, setSelectedNote }}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteProvider;