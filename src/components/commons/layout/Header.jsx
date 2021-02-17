import * as React from 'react';

import { Link } from "react-router-dom";
import Path from "utils/Path";
import { path } from 'api/ElementApi';

export default class Header extends React.Component {

  render(){
    return (
      <div className="w3-top">
        <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
          <a href="/" className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i className="fa fa-home w3-margin-right"></i>Logo</a>
          <Link to={Path.repo + Path.browse('')} className="w3-bar-item w3-button w3-padding-large w3-hover-white" title="News"><i className="fa fa-globe"></i></Link>
          <Link to={Path.adm + Path.users} className="w3-bar-item w3-button w3-padding-large w3-hover-white" title="Account Settings"><i className="fa fa-user"></i></Link>
          <a href="/" className="w3-bar-item w3-button w3-padding-large w3-hover-white" title="Messages"><i className="fa fa-envelope"></i></a>
          <div className="w3-dropdown-hover">
            <button className="w3-button w3-padding-large" title="Notifications"><i className="fa fa-bell"></i><span className="w3-badge w3-right w3-small w3-green">3</span></button>
            <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{width:"300px"}}>
              <a href="/" className="w3-bar-item w3-button">One new friend request</a>
              <a href="/" className="w3-bar-item w3-button">John Doe posted on your wall</a>
              <a href="/" className="w3-bar-item w3-button">Jane likes your post</a>
            </div>
          </div>
          <a href="/" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
            <img src="/img/user.svg" className="w3-circle" style={{height:"23px", width:"23px"}} alt="Avatar" />
          </a>
        </div>
        </div>
    );
  }
}