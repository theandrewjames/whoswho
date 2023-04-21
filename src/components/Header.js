import React from 'react'
import '../css/header.css'
import ww from '../images/whos-who.png'
export const Header = () => {
    return (
        <div className="p-4 text-center">
            <h2 className='whos-who'><span><img src={ww} height={'120rem'} /></span> Welcome to Who's Who <span><img src={ww} height={'120rem'} /></span></h2>
            <p style={{ fontWeight: "bold" }}>
                Who's Who Tunes is a fun guessing game, testing your knowledge on your favorite songs! <br /> Simply choose your settings, guess which song belongs to which artist, and rock out with us, to get your results!
            </p>
            <hr style={{color: 'darkgreen'}} className="my-4" />
        </div>
    )
}