import React from "react";
import { Link } from 'react-router-dom';

export default function DropDown({ leftIcon, detail, rightIcon, iconfunc, closeDropdown, link, signOut }) {
        // If there is no link, we prevent the default anchor action
    const handleItemClick = (e) => {
        if (!link) {
            e.preventDefault();
        }

        if (iconfunc) {
            iconfunc(leftIcon);
        }

        if (closeDropdown) {
            closeDropdown();
        }

        if (signOut && detail === "Log out") {
            signOut();
        }
    };

    // Function to render the icon
    const renderIcon = (icon) => {
        if (React.isValidElement(icon)) {
            // If it's a valid React element, render it directly
            return icon;
        } else if (typeof icon === 'string') {
            // If it's a string, assume it's a URL and render an img tag
            return <img src={icon} className="flags" alt="icon" />;
        }
    };

    // Use the appropriate tag based on whether a link is provided
    const WrapperTag = link ? Link : 'a';
    const wrapperProps = link ? { to: link ,  onClick: handleItemClick} : {onClick: handleItemClick };

    return (
        <WrapperTag {...wrapperProps} className="menu-item">
            <span className="icon-button">{renderIcon(leftIcon)}</span>
            <span className="menu-item-detail">{detail}</span>
            <span className="icon-right">{rightIcon && renderIcon(rightIcon)}</span>
        </WrapperTag>
    ); 
}
