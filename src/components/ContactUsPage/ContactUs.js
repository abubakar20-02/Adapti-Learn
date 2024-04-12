import React from 'react';
import { ReactComponent as Worldmap } from '../../Resources/World_map_with_points.svg';
import './ContactUs.css'; // Import the CSS file

const ContactUs = () => {
    return (
        <div className="contact-us">
            <p style={{ fontSize: '1rem' }}>Contact us</p>
            <p style={{ fontSize: '2.5rem', fontWeight: '550', paddingBottom: "2%",paddingTop: "2%", textAlign:'center'}}>We'd love to hear from you</p>
            <Worldmap className='world-map' />
            <div className="contact-us-info" >
                <p style={{fontWeight: '700' }}>Support</p>
                <p style={{fontWeight: '400' }}>We are here to help you</p>
                <a href="mailto:support@AdaptiLearn.gmail.com">support@AdaptiLearn.gmail.com</a>
            </div>
        </div>
    );
};

export default ContactUs;
