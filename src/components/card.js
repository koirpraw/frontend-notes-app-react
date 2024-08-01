import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import CardDetailPage from '../pages/CardDetailPage';
import { PiStarFill } from 'react-icons/pi';

function Card({ title, description, created_at, difficulty, likeColor, iconSize }) {
    return (
        <div className='card'>
            {/* <hr className='solid'></hr> */}
            <div className='card-header'>
                <PiStarFill color={likeColor} size={iconSize} title='Like' />
                <p>Difficulty Level:{difficulty}</p>

            </div>

            <div className='cardbody'>

                <h4 className='card-headerText'>{title}</h4>
                <p>{description}</p>

            </div>
            <div className='card-footer'>
                <p>Created At:{created_at}</p>
            </div>

        </div>

    )
}

export default Card