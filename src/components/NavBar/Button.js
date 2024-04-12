export default function Button({ onClick, children }){
    return(
    <a className="Button" onClick={onClick}>{children}</a>
    );

}