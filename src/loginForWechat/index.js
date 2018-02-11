import React, {Component} from 'react';
import Resources from '../resources';
import { browserHistory } from 'react-router';
import {Button, Form} from 'semantic-ui-react';
import './index.css';

class WechatLogin extends Component {
    constructor() {
        super();

        this.state = {
            step: 1
        };

        this.signUp = this.signUp.bind(this);
    }

    signUp(){
        //login/wechat
        if (!/MicroMessenger/.test(navigator.userAgent)) {
            alert('请在微信浏览器中使用微信登录方式');
            return;
        }else{
            browserHistory.push('/my/info');
        }
    }

    render() {
        return (
            <div className="wechat-login">
                <div className="login-logo">
                    <img src="http://resource.buzzbuzzenglish.com/new_buzz_logo.png" alt="加载中..."/>
                </div>
                <div className="login-wechat-img">
                    <img src="http://resource.buzzbuzzenglish.com/new_buzz_logo.png" alt="加载中..."/>
                    <div className="img-introduction">
                        <p>Become fluent in English by talking to native speaking students from around the world.</p>
                    </div>
                </div>
                <div className="login-wechat-btn">
                    <Form.Group widths='equal'>
                        <Form.Field control={Button} onClick={this.signUp}
                                    content='SIGN IN WITH WECHAT'/>
                    </Form.Group>
                </div>
                <div className="login-attention">
                    <p>Signing up with Buzzbuzz you agree to our <u>Terms</u>,
                        Data use policy and <u>Cookie use</u>.</p>
                </div>
            </div>
        );
    }
}

export default WechatLogin;
