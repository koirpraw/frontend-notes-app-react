# FrontEnd for NotesApp using ReactJS

This is the frontend for the notes app that allows users to create, read, update and delete notes. There are several backend implementaion for this app using different tech stacks. The frontend is meant to work with all these REST API's that are built for notes app. Each Note has , title,description,is_liked a boolean field,difficulty (a number between 1-5) and created_at field. This React Frontend covers data fetching from API using javascript's fetch API. Since this app features full CRUD operations, it will cover all the fetch requests like GET,POST,PUT,DELETE.
This app should also serve as a good example to understand working with state,props and hooks in React. The Routing is done using React-Routers.The project will help in understanding how routing and navigation can be setup to navigate between different pages in a React app. The app covers different ways to pass data between components amd how to manage state.

## Screenshots
<img width="955" 
 alt="Screenshot 2024-08-01 at 11 57 05 PM" src="https://github.com/user-attachments/assets/9b83986b-71eb-4c44-8b52-1a06b8ce904a">
 <img width="928" alt="note_cardDetailPage" src="https://github.com/user-attachments/assets/f29d6fdb-b686-407e-aeab-d3bea86c78a9">

## Features
- Create a new note
- Read all notes
- Read a single note
- Update a note
- Delete a note
- Like/Dislike a note
- React Hooks
- React Routers
- Routing and Navigation
- Fetch API
- Error Handling
- Managing state
- Stateful Routing( Router Based State Management)
- Filter notes based on difficulty **(Coming Soon)**
- Sort notes based on created_at field **(Coming Soon)**
- Search notes based on title **(Coming Soon)**
- pagination **(Future update)**

## Tech Stack
- ReactJS
- React Routers
- Javascript
- CSS
- HTML
- Fetch API
- REST API

## Installation
1. Clone the repository
```bash
git clone https://github.com/koirpraw/frontend-notes-app-react.git
```
2. Install the dependencies
```bash
npm install
```
3. Run the app
```bash
npm start
```
4. Open the app in your browser
```bash
http://localhost:3000/
```

## Note Object(model)
Javascript is dynamically typed and hence does not require defining the types of variable. It does lead to less code but sometimes can be difficult to understand the structure of the data and their true types. Below is the Structure of our Note Object we are using through out our app along with the variable types. Whenever we are referring to notes , we are referring to collection of this notre object.

```javascript
{
  id: number,//(String in case of MongoDB backend)
  title: string,
  description: string,
  is_liked: boolean,
  difficulty: number,
  created_at: string
}
```

## State Management with Zustand
Zustand is a small, fast and scaleable bearbones state-management solution. It has a very simple API and is very easy to use. It is a great alternative to Redux and Context API. It is relatively to setup and use.

### Zustand setup in our project
1. Install Zustand
```bash
npm install zustand
```
2. Create a directory called lib and inside of lib create a file called store.js
3. Inside store.js, create a store using create function from zustand
```javascript
import create from 'zustand';

export const useStore = create((set) => ({
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
}))


```
### Understanding Zustand Syntax and API
  - useStore is a custom hook that we can use to access the state and the actions we define in our store.
  - State and actions are the way we manage our state in zustand. The state is the data/ variable that we want to access and manage through out our app. Actions are the functions that can change the state of our data in our app and accessed through the custom hook.
  - set is a function that is used to update the state in zustand. It is similar to setState in React.
  - We first define the initial state of our store in the create function. In our case we have notes and selectedNote state variables. Notes is a list of note objects with initial value set to empty array. selectedNote is a single note object with initial value set to null.
  - We have 7 actions in total followed by our state variables. Namely setNotes, setSelectedNote, fetchNotes, fetchNoteById, createNote, updateNote, deleteNote, deleteAllNotes.
  - The first 2 actions are setter functions that are used to set values of our state variables (notes-list of note object and selectedNote-a note object).
  - Remaining 5 functions are async functions that are used to fetch data from our backend API using fetch API.

### Fetching data from API using Zustand
  - All the API request functions are in separate module inside of services directory called apiServices.js. Hence we need to import these functions first in order to use them inside our create function in store.js.
  - All asynchronous functions needs to be handleed asynchronously using async-await keywords. 
  - We are also using try-catch block to handle errors that might occur while fetching data from our backend API.
 
### Using Zustand in our components
Once the store is setup with all the state variables and actions(functions changing the state variables), We can simply access the store by accessing the custom hook `useStore` in our components. This means our state is now available globally for all components in our app wherever needed . In our case we will be accessing the state of notes and selected Note in various components. Firstly, in our HomePage we need to display list of notes. here we can tap into notes state from the store . similarly in our NoteDetailPage we need to display the selected note. Here we can tap into selectedNote state from the store. In the EditCardPage component we can again access the selectedNote from the store and update it using the updateNote action from the store. We can also delete the note using deleteNote action from the store.
To access the store and its state and actions in our components we need to import the custom hook useStore from our store.js file. Once available we can use this hook to access the state and actions as needed.
```javascript
import { useStore } from '../lib/store';
```
```javascript
//In HomePage component
const { notes, fetchNotes } = useStore();
//..more code 
   {notes && notes.map((card) => (
                            <li key={card.id} >
                                <Card card={card} /> 
                            </li>
                        ))}
//..more code
```
```javascript
//In NoteDetailPage component
const { selectedNote, fetchNoteById, updateNote, deleteNote } = useStore();
//more code ..
    <h4>{selectedNote.title}</h4>
    <p>{selectedNote.description}</p>
                    //more code ..
```
                            
```javascript
//In EditCardPage component
const { createNote } = useStore();
```

### Updating the state in our components
Now with the global state setup and the state accessible through the zustand store in our components, we can simply tap into these state variable and actions to update the state in our components. For example, in the EditCardPage component we can edit the title, description , favorite- boolean tohhle or the difficulty level slider and pass the new values as the updated values in our note object to the updateNote action from the store. This will update the note in our notes array in the store and hence the updated note will be reflected in our app. The other example is the favorite(star icon) toggle in the NoteDetailPage component. Here we can toggle the is_liked field of our note object and pass the updated note object to the updateNote action from the store. This updates the notes array in our store and we can see the updated lis of notes when loaded again.

### State persistance between browser reloads/refresh
So far we have built a stellar system with data flawlessly flowing through a central repository. But what happens when we reload the page? The state is lost and we are back to square one. The reason our data is lost is because the state is stored only in memory and is not persisted. We can not build application where data is lost easily during reloads.Thus we need a way to persist the state between browser reloads.
This is where Zustand shines. Zustand provides a way to persist the state between browser reloads.Using Zustand's middleware functionality, we can persist the state in the local storage of the browser. This way the state is saved in the local storage and is available even after the page is reloaded.
With persistance enabled users can now have seamless experience. The end user is not aware of such need for persistance and expects seamless experience where data flows seamlessly and available as they navigate through pages. As a frontend developer though things are not always straight foward and laid out for us to work right out of the box. hence having such a simple implementaion to persist the state is a great feature to have.

### Implementing Persistance in Zustand store
To implement persistance using zustand's middleware functaionality, we need to first import `persist` module from `zustand/middleware` and then wrap our store with persist function. We also need to provide a name for our store and the state variables we want to persist. 
```javascript
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(persist(
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
//... more code here
    }),
    {
        name: 'notes-app-storage',
        // getStorage: () => localStorage,
        // blacklist: ['selectedNote']
    }
))

```
note: We can also provide a blacklist array to exclude certain state variables from being persisted.We are not blacklisting any state variables in our case. but lets say if we wanted to not persist the selectedNoten state variable , we can simply add it to the blacklist array. See the commented out code block above for reference. Also by default localStorage is used to persist the state. If we want to use sessionStorage instead of localStorage, we can simply provide getStorage function that returns sessionStorage instead of localStorage. Check [Zustand](!https://docs.pmnd.rs/zustand/integrations/persisting-store-data) documentation for more details.

### Testing the persistance
To test the persistance, we can simply reload the page and check if the state is still available. We can also check the local storage of the browser to see if the state is saved there. We can also clear the local storage and reload the page to see if the state is still available. This way we can test if the persistance is working as expected. If you want to check the data stored in your browser visually, you can open the developer tools in your browser and navigate to the application tab. Now if you go to local storage for the current page, you should see data stores as key-value pairs. Our data will be stored under the key 'notes-storage'. 

### Understanding persistance mechanism behind the scenes
1. Initialization:
- The persist middleware is initialized with a configuration object that includes a unique name for the storage key.

2. Loading State:
- When the store is created, the middleware checks localStorage for an item with the key note-storage.
- If found, it parses the JSON string back into an object and merges it with the initial state.

3. State Changes:
- The middleware listens for any state changes.
- When a state change occurs, it serializes the new state into a JSON string and saves it to localStorage under the key note-storage.

4. Page Refresh:
- On page load, the middleware again checks localStorage for the note-storage key.
- It loads and merges this state with the initial state, ensuring the state is restored.


