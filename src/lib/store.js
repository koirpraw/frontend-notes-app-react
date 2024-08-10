import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchNoteById, fetchNotes, createNote, updateNote, deleteAllNotes, deleteNote } from '../services/apiService';

const useStore = create(
    persist(
        (set) => ({
            notes: [],
            selectedNote: null,
            setNotes: (notes) => set({ notes }),
            setSelectedNote: (selectedNote) => set({ selectedNote }),
            fetchNotes: async () => {
                try {
                    const data = await fetchNotes();
                    set({ notes: data });
                } catch (error) {
                    console.error('Error fetching data:', error);

                }
            },
            fetchNoteById: async (id) => {
                try {
                    const data = await fetchNoteById(id);
                    set({ selectedNote: data });
                } catch (error) {
                    console.error('Error fetching Note by Id:', error);

                }
            },
            createNote: async (note) => {
                try {
                    const data = await createNote(note);
                    set({ notes: data });

                } catch (error) {
                    console.error('Error creating Note:', error);

                }
            },
            updateNote: async (id, note) => {
                try {
                    const data = await updateNote(id, note);
                    set({ notes: data });

                } catch (error) {
                    console.error('Error updating Note:', error);

                }
            },
            deleteNote: async (id) => {
                try {
                    const data = await deleteNote(id);
                    set({ notes: data });

                } catch (error) {
                    console.error('Error deleting Note:', error);

                }
            },
            deleteAllNotes: async () => {
                try {
                    const data = await deleteAllNotes();
                    set({ notes: data });

                } catch (error) {
                    console.error('Error deleting all Notes:', error);

                }
            }
        }),
        {
            name: 'notes-storage',

        }
    ))

export default useStore;