# React.JS Frontend Notes CRUD app with REST API( Notes App)

## Introduction
In this Tutorial, we will build a frontend for a Notes App with CRUD operations using React.JS. This app will serve as a good example to learn several important concepts in React such as :
- Hooks & Props 
- Routing and Navigation
- Fetching data from REST API( GET,POST,PUT,DELETE)
- Working with different types of states such as local state,Router based state management.
- Error Handling
- styling with CSS

## Tech Stack
- React.JS
- react-router-dom
- fetch API( using Javascript's fetch API)
- CSS Modules
- react-icons

## Overview
The App has following pages and components:
### Pages
- Home Page - ListView that displays List of Notes . Create and Delete all Buttons to create new Note and Delete all Notes, respectively. Create button routes to CreateNote Page.
- NoteDetail Page - Displays the details of a Note with option to Edit and Delete the Note. Edit Button routes to EditNote Page.
- CreateNote Page - Form to create a new Note. On Submit, the Note is created and user is redirected to Home Page. Input fields for Title and description. 
- EditNote Page - Form to edit an existing Note. On Submit, the Note is updated and user is redirected to Home Page. Input fields for Title and description. Checkbox for is_liked , a boolean field, slider for difficulty lever (1-5).

### Components
- Navbar - Navigation bar with links to Home Page.
- Card - Displays the Note details in a Card format ( Title, Description, is_liked, difficulty level,created_at)


## Project Structure
 - App.js is the entry way to the App. It consists of a Layout with Navbar and Routes for all the components/ pages in the app.
 - The Routing is done using react-router-dom. To setup routing, we need to wrap the App component with BrowserRouter and define Routes for each component.
 - Once the main App component in index.js is wrapped with BrowserRouter the app is configured to use routing.
 - In th App.js file we define all the route used in our app and wrrap it inside Routes component from react-router-dom.