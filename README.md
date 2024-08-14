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

## State Management with Context API
Context API is the React's built in state management system.It can be used for state management for small to medium application. Context has a provider and consumer component. In the provider component the state variable is defined which can be accessed by consumer components as props. When the state is updated in the provider component, the consumer components are re-rendered with the updated state. Context API is used to avoid prop drilling. useContext hook is used as a consumer in modern react applications. Provider component is created usinf createContext function.

## Implementation of Context API
1. Create a new folder called `context` in the `src` folder.
2. Inside of the context foder, create a file called `NoteContext.js`.
3. In the `NoteContext.js` file, first import `createContext` module from react.createCongtext is a function that creates a context object.
4. Create a new context object using `createContext` function and call it `NoteContext`. this NoteContext object will have a provider and a consumer.
5. A provider is a component that provides the value to the consumer. The value can be anything like a string, number, object or a function.
6. Create a provider component called `NoteProvider` and pass the children as props.( passing children as props allows us to wrap the children components with the provider component, in our case we are wrapping all the routes in our app with provider as a children. This way all routes that require access to the context will have access to the context)
7. In the `NoteProvider` component, create a state using `useState` hook. The state will have the following properties:
   - notes & setNotes: an array of notes (initialized to empty array).
   - selectedNote & setSelectedNote: a single note (initialized to null).
8. We create a function called fetchNotes that fetches data from the API and set the state of notes to this data.
9. Using useEffect hook we call fetchNotes when NoteProvider component is mounted. this ensures that fetched notes are available to all the components that requires access to the context.
10. Note provider component takes a value prop which is an object containing state and functions. In our case we will pass state variable and setter functions as value prop.
11. Wrap all the routes in App.js file with NoteProvider. (if entire app can be wrapped, Wrap the `App` component with provider component in `index.js` file.)
12. Consumer: In modern React, the useContext hook is often used instead of Consumer for better readability and simplicity. Import useContecxt hook from react in components `HomePage.js `, `cardDetailPage.js` and `editCardPage.js`. We can access the state and functions from the context using useContext hook.

