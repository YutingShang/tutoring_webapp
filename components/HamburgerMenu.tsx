
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function HamburgerMenu(props:{
    home?: boolean,
    aboutMe?: boolean,
    leaveReview? : boolean,
    admin? :boolean
}){
return(<>
<div className="dropdown">
                <button type="button" id="menu-button">
                    <FontAwesomeIcon icon={faBars} size="2xl" style={{ color: "#8ba370", }} />
                </button>

                <div className="dropdown-content">
                    {props.home && <a href="/">Home</a>}
                    {props.aboutMe && <a href="/#about-me">About Me</a>}
                    {props.leaveReview && <a href="/form">Leave me a review!</a>}
                    {props.admin && <a href="/admin">Administrator </a>}
                </div>

            </div>
</>)
}