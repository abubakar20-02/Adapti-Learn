import { useState, useEffect, useRef } from 'react';
import React from 'react';


export default function NavItem(props) {
    const [open, setOpen] = useState(false);
    const node = useRef(); // Create a ref for the nav item

    // Function to close the dropdown
    const closeDropdown = () => {
        setOpen(false);
    };

    // Event handler for click events
    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            // Inside click, do nothing
            return;
        }
        // Outside click
        closeDropdown();
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Add event listener for clicks
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            // Clean up event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]); // Only re-run the effect if 'open' changes

    // Render children with additional prop
    const renderChildren = () => {
        return React.Children.map(props.children, child => {
            return React.cloneElement(child, {closeDropdown});
        });
    };

    return (
        <li className="nav-item" ref={node}>
            <a onClick={() => setOpen(!open)}>
                <img className="icon-button" src={props.icon} />
            </a>
            {open && renderChildren()}
        </li>
    );
}
