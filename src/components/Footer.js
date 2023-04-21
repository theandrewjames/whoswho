import React from 'react'
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/footer.css'
export const Footer = () => {
    return (
        <div className='container-fluid mt-5'>
            <footer>
                <div className="text-center contact-div" >
                    Contact Us <br/>
                    Andrew Velasquez <a href={'https://github.com/theandrewjames'} target='_blank' rel='noopener noreferrer'><FontAwesomeIcon className='contact' icon={faGlobe}/></a> <br/>
                    Jasmine Daniels <a href={'https://github.com/JasmineDaniels'} target='_blank' rel='noopener noreferrer'><FontAwesomeIcon className='contact' icon={faGlobe}/></a>
                </div>
            </footer>
        </div>
    )
}