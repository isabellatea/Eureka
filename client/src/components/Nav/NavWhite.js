import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Dropdown, Icon } from 'antd';
import './nav.css';
import bluebulb from '../../images/bluebulb.png';


const menuTopics = function(props) {
  return (
    <div>
      <ul>
        <li className='menuSubtopicWhite'><a href='#' name='Technology' onClick={props.handleClickCategory}> Technology </a></li>
        <li className='menuSubtopicWhite'><a href='#' name='Hobbies' onClick={props.handleClickCategory}> Hobbies </a></li>
        <li className='menuSubtopicWhite'><a href='#' name='Sports' onClick={props.handleClickCategory}> Sports </a></li>
        <li className='menuSubtopicWhite'><a href='#' name='Fashion' onClick={props.handleClickCategory}> Fashion </a></li>
        <li className='menuSubtopicWhite'><a href='#' name='Life Hacks' onClick={props.handleClickCategory}> Life Hacks </a></li>
        <li className='menuSubtopicWhite'><a href='#' name='Get Started...' onClick={props.handleClickCategory}> "Get Started..." </a></li>
      </ul>
    </div>
  )
};

const menuAccount = function(props) {
  return (
    <div>
      <ul>
        <li className='menuSubtopicWhite'><a href='#'>My MindFeed</a></li>
        <li className='menuSubtopicWhite'><a href='#'>My Bookmarks</a></li>
        <li className='menuSubtopicWhite'><Link to='account'>Settings</Link></li>
        <li className='menuSubtopicWhite'><a href='#' onClick={props.logout}>Log Out</a></li>
      </ul>
    </div>
  )
};


const Nav = function(props) {
  return (
    <div id="whiteMenu" className="navWhite">
      <ul>
        <li>
          <Dropdown overlay={menuTopics(props)}>
            <a className="ant-dropdown-link navWhite" href="#"> Topics <Icon type="down" /> </a>
          </Dropdown>
        </li>
          {props.currentPage === 'home' && (
            <div className='navLeft'>
              <li><a href='#howitworks'>How It Works</a></li>
              <li><a href='#personalize'>Personalize Feed</a></li>
            </div>
          )}
        <div className='navRight'>
          {!props.loggedIn && (
            <li><div>
              <Link to='login'>Log In</Link> <span>or</span> <Link to='signup'>Sign Up</Link>
            </div></li> 
          )}
          {props.loggedIn && (<div>
            <li><Dropdown overlay={menuAccount(props)}>
              <a id="whiteMenuAccount" className="ant-dropdown-link navWhite" href="#">
                My Account <Icon type="down" />
              </a>
            </Dropdown></li>
            <li><Link to='submitvideo'><button className="submitVideoButton">Submit Video</button></Link></li>
            <li><Link to='adminpanel'><button className="formButton">Admin Panel</button></Link></li>     
            <li><Link to='walkthrough'><button className="formButton">New User Walkthrough</button></Link></li>     
            </div>
          )}
        </div>
      </ul>
    </div>
  )
}

export default Nav;
