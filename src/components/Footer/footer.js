import './footer.css'
import Logo from '../../Resources/AdaptiLearnLogo-NoText.png'
import NavLink from '../LandingPage/LandingNavBar/NavLink';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
      <div className='footer-container'>
        <div className="footer-text">
          <div className='logoContainer'>
          <img src= {Logo} className='footerLogo'/>
          <p>AdaptiLearn</p>
          </div>
          <div className="footer-links">
          
          <NavLink to="/" boldWhenActive={false} >Overview</NavLink> 
          <NavLink to="/contact" boldWhenActive={false}>Help</NavLink>
          </div>
          <hr className='hr'/>
        © {year} AdaptiLearn. All rights reserved.</div> {/* Wrapped in a div for additional styling */}
      </div>
    );
}