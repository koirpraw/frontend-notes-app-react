import React from 'react'
import { Link } from 'react-router-dom';

function DefaultBtn({ route, title, bgColor }) {
    return (
        <div className='default-btn' style={{ backgroundColor: `${bgColor}` }}><Link to={route} style={{ color: 'white', textDecoration: 'none' }} ><p>{title}</p></Link></div>
    )
}

export default DefaultBtn