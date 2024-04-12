import React from "react";
export default function DropDownMenu(props) {
    const childrenWithProps = React.Children.map(props.children, child => {
        // Pass closeDropdown to each child
        return React.cloneElement(child, { closeDropdown: props.closeDropdown });
    });

    return <div className="dropdown">{childrenWithProps}</div>;
}
