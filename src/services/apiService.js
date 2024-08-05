import React from 'react'
import { useState } from 'react';

const api = 'http://localhost:4000/api/notes';

export const fetchNotes = async () => {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`HTTP Error: status${response.status}`)
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;

    }
}

export const fetchNoteById = async (id) => {
    try {
        const response = await fetch(`${api}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: status${response.status}`)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Note by Id:', error);
        throw error;

    }
}

export const createNote = async (note) => {
    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        if (!response.ok) {
            throw new Error(`HTTP Error: status${response.status}`)
        }
        const data = await response.json();
    } catch (error) {
        console.error('Error creating Note:', error);
        throw error;

    }
}

export const updateNote = async (id, note) => {
    try {
        const response = await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        if (!response.ok) {
            throw new Error(`HTTP Error: status${response.status}`)
        }
        const data = await response.json();
    } catch (error) {
        console.error('Error updating Note:', error);
        throw error;

    }
}

export const deleteNote = async (id) => {
    try {
        const response = await fetch(`${api}/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error(`HTTP Error: status${response.status}`)
        }
        const data = await response.json();
    } catch (error) {
        console.error('Error deleting Note:', error);
        throw error;

    }
}

export const deleteAllNotes = async () => {
    try {
        const response = await fetch(api, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error(`HTTP Error: status${response.status}`)
        }
        const data = await response.json();
    } catch (error) {
        console.error('Error deleting all Notes:', error);
        throw error;

    }
}
