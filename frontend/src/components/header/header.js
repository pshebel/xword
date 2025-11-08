import { Link } from "react-router";

import './header.css'


export default function Header() {
    return (
        <div className="header">
            <div class="logo"><Link to="/">xword.io</Link></div>
        </div>
    )
}