//https://www.youtube.com/watch?v=IF6k0uZuypA (navbar video tutorial)

import NavItem from '../LandingPage/LandingNavBar/NavItem';
import pfp from '../../Resources/WhatsApp Image 2023-10-06 at 23.21.16.jpeg';
import DropDownMenu from '../LandingPage/LandingNavBar/DropDownMenu';
import DropDown from '../LandingPage/LandingNavBar/DropDown';
import {ReactComponent as Logout} from '../../Resources/logOut.svg';
import {ReactComponent as Accountdetail} from '../../Resources/accountDetail.svg';
import { Link } from 'react-router-dom';
import './navbar.css';

const customerMenu = [{id:1,leftIcon: <Accountdetail/>, detail:"Account detail", link: "/account-details"},{id:2,leftIcon:<Logout/>, detail:"Log out"}];

export default function NavBar({ signOut }){
    
    return (
        <nav className="navbar">
            <ul className="navbar-nav">    
            <div className="title">
      <Link to = "/">
      <a className='title'>Learning Recommendation System</a>
      </Link>
    </div>
    <div className="navbar-buttons">
      <NavItem icon={pfp}>
      <DropDownMenu>
        {customerMenu.map((menu) => {
          return <DropDown
           key={menu.id} leftIcon={menu.leftIcon} rightIcon={menu.rightIcon} detail={menu.detail} link= {menu.link} signOut={menu.detail === "Log out" ? signOut : null}/>;
        })}
        </DropDownMenu>
        {/* <DropDown/> */}
      </NavItem>
      </div>
      </ul>
        </nav>
    )
}