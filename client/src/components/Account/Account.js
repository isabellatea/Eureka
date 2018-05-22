import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Menu, Icon, Row, Col } from 'antd';
import AccountBookmarks from './AccountBookmarks';
import AccountCategories from './AccountCategories';
import AccountInfo from './AccountInfo';
import Connect from '../Connect';
import './account.css';
import axios from 'axios';
const TabPane = Tabs.TabPane;

const Account = (props) => {
	return (
    <div className="accountContainer">
      <Tabs defaultActiveKey="information">
        <TabPane tab="Account Information" key="information">
          <AccountInfo user={props.authStatus.currentUser} />
        </TabPane>
        <TabPane tab="Category Preferences" key="preferences">
          <AccountCategories />
        </TabPane>
        <TabPane tab="Bookmarks" key="bookmarks">
          <AccountBookmarks bookmarks={props.userInfo.userBookmarks} />
        </TabPane>
      </Tabs>
    </div>
	)
}


export default Connect(Account);
