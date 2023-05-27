import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import userService from '../../services/userService';

import * as actions from "../../store/actions";

import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'tuannguyen@gmail.com',
            password: '',
            isShowPasswords: false,
            errMessage: ''
        }
    }

    handlerChangeInputUsername = (e) => {
        this.setState({ username: e.target.value })
    }

    handlerChangeInputPassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handlerLogin = async (e) => {
        e.preventDefault()
        this.setState({
            errMessage: ''
        })
        try {
            await userService.handleLogin(this.state.username, this.state.password).then(data => {
                if (data && data.errCode !== 0) {
                    this.setState({
                        errMessage: data.message
                    })
                }
                if (data && data.errCode === 0) {
                    this.props.userLoginSuccess(data.userData)
                    console.log('login successful');
                }
            })
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }

    handlerShowHidePassword = () => {
        this.setState({ isShowPasswords: !this.state.isShowPasswords });
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12">
                            <h1 className='login-title'>Login</h1>
                        </div>
                        <form>
                            <div className="col-12 form-group">
                                <label className='label-field' htmlFor="username">Username</label>
                                <input type="text"
                                    className="form-control text-field"
                                    id="username"
                                    value={this.state.username}
                                    onChange={e => this.handlerChangeInputUsername(e)}
                                    placeholder="Enter your Username"

                                />
                            </div>
                            <div className="col-12 form-group">
                                <label className='label-field' htmlFor="password">Password</label>
                                <div className='form-control-password'>
                                    <input
                                        type={this.state.isShowPasswords ? "text" : "password"}
                                        className="form-control text-field"
                                        id="password"
                                        value={this.state.password}
                                        onChange={e => this.handlerChangeInputPassword(e)}
                                        placeholder="Enter your Password" />
                                    <span
                                        className='icon-showhide-password'
                                        onClick={() => this.handlerShowHidePassword()}
                                    >
                                        <i className={this.state.isShowPasswords ? "fas fa-eye hidden-password" : "fas fa-eye-slash show-password"}></i>
                                    </span>
                                </div>
                                <div className='helper'>{this.state.errMessage}</div>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-login btn-login-user" onClick={e => this.handlerLogin(e)}>Login</button>
                            </div>
                            <div className="col-12 login-forgot">
                                <span className='login-forgot-text'>Forgot your password?</span>
                            </div>
                            <div className="col-12 login-other-media">
                                <span className='login-other-media-text'>or Connect With Social Media</span>
                            </div>
                            <div className="col-12 login-other">
                                <button className='btn btn-login btn-login-google'>
                                    <i className="fab fa-google-plus-g btn-login-icon icon-google"></i>
                                    Login with Google
                                </button>
                            </div>
                            <div className="col-12 login-other">
                                <button className='btn btn-login btn-login-facebook'>
                                    <i className="fab fa-facebook-f btn-login-icon icon-facebook"></i>
                                    Login with Facebook
                                </button>
                            </div>
                            <div className="col-12 login-signup">
                                <span className='login-signup-text'>Not a member? </span>
                                <a href="https://www.google.com/"> Sign Up Now</a>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
