import React from 'react';
import brandImg from '../tornados.png';
import softballbg from '../softball_background.png';
import {
  AboutModal,
  LoginFooterItem,
  LoginForm,
  LoginMainFooterBandItem,
  LoginMainFooterLinksItem,
  LoginPage,
  ListItem,
  TextContent,
  TextList,
  TextListItem
} from '@patternfly/react-core';
import Linkify from 'react-linkify';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import useAuth from '../useAuth';

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHelperText: false,
      usernameValue: '',
      isValidUsername: true,
      passwordValue: '',
      isValidPassword: true,
      isModalOpen: false
    };

    this.handleUsernameChange = value => {
      this.setState({ usernameValue: value });
    };

    this.handlePasswordChange = passwordValue => {
      this.setState({ passwordValue });
    };

//    const navigate = useNavigate();
//    const { login } = useAuth();
//    let navigate = useNavigate();
//    let { login } = useAuth();
//    this.onLoginButtonClick = (event) => {
//      event.preventDefault();
//      login().then(() => {
//        navigate("/admin");
//      });
//      this.setState({ isValidUsername: !!this.state.usernameValue });
//      this.setState({ isValidPassword: !!this.state.passwordValue });
//      this.setState({ showHelperText: !this.state.usernameValue || !this.state.passwordValue });
//    };

    this.handleModalToggle = (event) => {
      event.preventDefault();
      this.setState(({ isModalOpen }) => ({
        isModalOpen: !isModalOpen
      }));
    };
  }

  render() {
    const { isModalOpen } = this.state;

    const helperText = (
      <React.Fragment>
        <ExclamationCircleIcon />
        &nbsp;Invalid login credentials.
      </React.Fragment>
    );

    const forgotCredentials = (
      <LoginMainFooterBandItem>
        <a href="#">Forgot username or password?</a>
      </LoginMainFooterBandItem>
    );

    const listItem = (
      <React.Fragment>
        <ListItem>
          <LoginFooterItem href="#" onClick={this.handleModalToggle}>Terms of Use/Privacy Policy </LoginFooterItem>
	  <AboutModal
	    isOpen={isModalOpen}
	    onClose={this.handleModalToggle}
	    trademark="Copyright &copy; 2022 Egg Harbor Township Softball"
            brandImageSrc={brandImg}
	    brandImageAlt="EHT Softball Logo"
	    backgroundImageSrc={softballbg}
	    productName="EHT Softball"
	  >
	    <TextContent>
	      <TextList component="dl">
	        <TextListItem component="dt">Use of this website</TextListItem>
	        <TextListItem component="dd">
	          This website is intended for informational use only regarding the events and happenings of the Egg Harbor Township Softball Association.  No guarantees or warranties of any kind are implied or intended.  All data contained herein belongs to EHT Softball and will not be shared, sold, or otherwise disseminated to any third party at any time.
	        </TextListItem>
	      </TextList>
	    </TextContent>
	  </AboutModal>
        </ListItem>
        <ListItem>
          <LoginFooterItem href="/faq" target="_self">Help</LoginFooterItem>
        </ListItem>
      </React.Fragment>
    );

    const loginForm = (
      <LoginForm
        showHelperText={this.state.showHelperText}
        helperText={helperText}
        helperTextIcon={<ExclamationCircleIcon />}
        usernameLabel="Username"
        usernameValue={this.state.usernameValue}
        onChangeUsername={this.handleUsernameChange}
        isValidUsername={this.state.isValidUsername}
        passwordLabel="Password"
        passwordValue={this.state.passwordValue}
        isShowPasswordEnabled
        onChangePassword={this.handlePasswordChange}
        isValidPassword={this.state.isValidPassword}
        onChangeRememberMe={this.onRememberMeClick}
        onLoginButtonClick={this.onLoginButtonClick}
        loginButtonLabel="Log in"
      />
    );

    const images = {
      lg: '/images/pfbg_1200.jpg',
      sm: '/images/pfbg_768.jpg',
      sm2x: '/images/pfbg_768@2x.jpg',
      xs: '/images/pfbg_576.jpg',
      xs2x: '/images/pfbg_576@2x.jpg'
    };

    const textContent = (
      <Linkify>
        This area is for EHT Softball Administrators ONLY!  Please click <a href="/">here</a> to return to the main website.
      </Linkify>
    );

    return (
      <div>
        <Helmet>
          <title>EHT Youth Softball - Admin Login</title>
        </Helmet>
        <LoginPage
          footerListVariants="inline"
          brandImgSrc={brandImg}
          brandImgAlt="EHT Softball Logo"
          backgroundImgSrc={images}
          backgroundImgAlt="Images"
          footerListItems={listItem}
          textContent={textContent}
          loginTitle="Log in to your Admin account"
          loginSubtitle="Enter your EHTYS Admin credentials."
          forgotCredentials={forgotCredentials}
        >
          {loginForm}
        </LoginPage>
      </div>
    );
  }
}

export default AdminLogin;

