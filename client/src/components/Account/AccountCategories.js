import React from 'react'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios';
import '../../css/style.css';
import './accountstyle.css';
import { Menu, Icon, Row, Col, Tabs, Select, message } from 'antd';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import Connect from '../Connect';
import SubcategoryCard from './SubcategoryCard';


class AccountCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCatandSub: [],
      allCategories: [],
      preferences: this.props.userInfo.userCategories || {},
      email: this.props.authStatus.currentUser || '',
      clickedCategory: null,
      subcategories: [],
      selectedSubcategories: []
    };

  };

  componentDidMount(props) {
    this.getAllCategories();
    const { userCategories } = this.props.userInfo;
    if (userCategories) {
      let userSubcategories = [];
      for (const category in userCategories) {
        userSubcategories = userSubcategories.concat(userCategories[category]);
      }
      this.setState({ selectedSubcategories: userSubcategories });
    }

  }

  getAllCategories = () => {
    axios.get('/api/getCategories')
    .then((response) => {
      let allCatandSub = response.data;
      let categories = Object.keys(allCatandSub);
      console.log("Only Cat: ", categories);
      console.log("All CatandSub:", allCatandSub);
      this.setState({allCatandSub: allCatandSub, allCategories: categories}, () => {
        this.handleClickCategory(this.state.allCategories[0]);
      });

    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleClickSubcategory = (subcategoryName) => {
    let clickedCategory = this.state.clickedCategory;
    let preferences = this.state.preferences;
    let selectedSubcategories = this.state.selectedSubcategories;

    const subcategoryIsCurrentlySelected = selectedSubcategories.includes(subcategoryName);

    if (!preferences[clickedCategory]) {
      preferences[clickedCategory] = [];
    }
    if (subcategoryIsCurrentlySelected) {
      preferences[clickedCategory] = preferences[clickedCategory].filter((sub) => sub !== subcategoryName);
      selectedSubcategories = selectedSubcategories.filter((sub) => sub !== subcategoryName);
    } else {
      preferences[clickedCategory].push(subcategoryName);
      selectedSubcategories.push(subcategoryName);
    }

    this.setState({
      preferences: preferences,
      selectedSubcategories: selectedSubcategories
    });
  }

  handleClickCategory = (category) => {
    let subcategories = this.state.allCatandSub[category];
    this.setState({clickedCategory: category, subcategories: subcategories});

  }

  submitUserPreferences = (pref) => {
    let email = this.state.email;
    let preferences = pref;
    axios.get('/api/updateUserPreferences', {
      params: {
        email: email,
        preferences: preferences 
      }
    })
    .then((response) => {
      this.props.setUserCategories(preferences); //sets in redux state

      if (this.props.router.location.pathname === '/myaccount') {
        message.success("Category Preferences Saved");
      } else {
        this.props.history.push("/dashboard");
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const allSelected = this.state.selectedSubcategories;
    return (
      <div className="categoriesContainer">
        <div className="categoriesInner">
          <h1>Get started by selecting categories that interest you!</h1>
            <div>
              <Tabs tabPosition="left" onTabClick={this.handleClickCategory}>
                {this.state.allCategories
                  .map((category) =>
                    <TabPane tab={category} key={category} >
                    {this.state.subcategories
                      .map((subcategory) => <SubcategoryCard key={subcategory} subcategoryName={subcategory} allSelected={allSelected} handleClickSubcategory={this.handleClickSubcategory}/>
                    )}
                    </TabPane>
                )}
              </Tabs>
            </div>
          <button className="formButton categoriesSubmit" onClick={() => this.submitUserPreferences(this.state.preferences)}> Submit </button>
        </div>
      </div>
    )
  }
}


export default Connect(AccountCategories);

