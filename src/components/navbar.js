import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {



    return (

        <nav className='navbar-area'>
            <div className='navLinks'>

                <Link to="/HomePage" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5em' }}>Notes</Link>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    {/* <div className='create-btn'><Link to="/createCard" style={{ color: 'white', textDecoration: 'none' }}><p>Create</p></Link></div> */}

                </div>


                {/* <Link to="/Page3">Page3</Link> */}

            </div>


        </nav>


    )
}

export default Navbar