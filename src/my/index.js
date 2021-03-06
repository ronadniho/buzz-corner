import React, {Component} from 'react';
import {Form, Button, Segment, Dropdown} from 'semantic-ui-react';
import {browserHistory} from 'react-router';
import CurrentUser from "../membership/user";
import ServiceProxy from '../service-proxy';
import './my.css';

function getBirthDay(date_of_birth) {
    if (date_of_birth) {
        let date = new Date(date_of_birth);
        return String(date.getFullYear()) + '-' + String(date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + String(date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
    } else {
        return ''
    }
}

const grade_list = [
    {key: '1', value:  '1', text: '一年级'},
    {key: '2', value:  '2', text: '二年级'},
    {key: '3', value:  '3', text: '三年级'},
    {key: '4', value:  '4', text: '四年级'},
    {key: '5', value:  '5', text: '五年级'},
    {key: '6', value:  '6', text: '六年级'},
    {key: '7', value:  '7', text: '七年级'},
    {key: '8', value:  '8', text: '八年级'},
    {key: '9', value:  '9', text: '九年级'},
];

const city_list = [
    {key: '0', value:  '其他', text: '其他'},
    {key: '1', value:  '北京', text: '北京'},
    {key: '2', value:  '上海', text: '上海'},
    {key: '3', value:  '广州', text: '广州'},
    {key: '4', value:  '深圳', text: '深圳'},
    {key: '5', value:  '天津', text: '天津'},
    {key: '6', value:  '杭州', text: '杭州'},
    {key: '7', value:  '南京', text: '南京'},
    {key: '8', value:  '济南', text: '济南'},
    {key: '9', value:  '重庆', text: '重庆'},
    {key: '10', value:  '青岛', text: '青岛'},
    {key: '11', value:  '大连', text: '大连'},
    {key: '12', value:  '宁波', text: '宁波'},
    {key: '13', value:  '厦门', text: '厦门'},
    {key: '14', value:  '重庆', text: '重庆'},
    {key: '15', value:  '成都', text: '成都'},
    {key: '16', value:  '武汉', text: '武汉'},
    {key: '17', value:  '哈尔滨', text: '哈尔滨'},
    {key: '18', value:  '沈阳', text: '沈阳'},
    {key: '19', value:  '西安', text: '西安'},
    {key: '20', value:  '长春', text: '长春'},
    {key: '21', value:  '长沙', text: '长沙'},
    {key: '22', value:  '福州', text: '福州'},
    {key: '23', value:  '郑州', text: '郑州'},
    {key: '24', value:  '石家庄', text: '石家庄'},
    {key: '25', value:  '苏州', text: '苏州'},
    {key: '26', value:  '佛山', text: '佛山'},
    {key: '27', value:  '东莞', text: '东莞'},
    {key: '28', value:  '无锡', text: '无锡'},
    {key: '29', value:  '烟台', text: '烟台'},
    {key: '30', value:  '太原', text: '太原'},
    {key: '31', value:  '合肥', text: '合肥'},
    {key: '32', value:  '南昌', text: '南昌'},
    {key: '33', value:  '南宁', text: '南宁'},
    {key: '34', value:  '昆明', text: '昆明'},
    {key: '35', value:  '温州', text: '温州'},
    {key: '36', value:  '淄博', text: '淄博'},
    {key: '37', value:  '唐山', text: '唐山'},
];

class Homepage extends Component {
    constructor() {
        super();

        this.state = {
            birthdayLabel: '',
            step: 1,
            profile: {
                parent_name: '',
                phone: '',
                student_en_name: '',
                city: '',
                date_of_birth: '',
                gender: '',
                grade: '',
                topics: []
            },
            profile_title: '仅用于课程学习相关通知与服务',
            agreement: true,
            placement_topics: [
                {
                    name: '宇宙',
                    value: 'universe',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Universe.png',
                    color_b: 'rgba(6, 125, 241, .2)',
                    color_f: 'rgba(6, 125, 241, .8)'
                },
                {
                    name: '商业',
                    value: 'busines',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Business.png',
                    color_b: 'rgba( 252, 78, 82, .2)',
                    color_f: 'rgba( 252, 78, 82, .8)'
                },
                {
                    name: '艺术',
                    value: 'art',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Art.png',
                    color_b: 'rgba( 255, 112, 82, .2)',
                    color_f: 'rgba( 255, 112, 82, .8)'
                },
                {
                    name: '食品',
                    value: 'food',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Food.png',
                    color_b: 'rgba( 117, 64, 238, .2)',
                    color_f: 'rgba( 117, 64, 238, .8)'
                },
                {
                    name: '环境',
                    value: 'environment',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Environment.png',
                    color_b: 'rgba(6, 125, 241, .2)',
                    color_f: 'rgba(6, 125, 241, .8)'
                },
                {
                    name: '生活方式',
                    value: 'lifestyle',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Lifestyle.png',
                    color_b: 'rgba(0, 216, 90, .2)',
                    color_f: 'rgba(0, 216, 90, .8)'
                },
                {
                    name: '娱乐',
                    value: 'enterainment',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Enterainment.png',
                    color_b: 'rgba( 237, 207, 0, .2)',
                    color_f: 'rgba( 237, 207, 0, .8)'
                },
                {
                    name: '科学',
                    value: 'science',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Science.png',
                    color_b: 'rgba(255, 112, 82, .2)',
                    color_f: 'rgba(255, 112, 82, .8)'
                },
                {
                    name: '技术',
                    value: 'technology',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Technology.png',
                    color_b: 'rgba(87, 113, 148, .2)',
                    color_f: 'rgba(87, 113, 148, .8)'
                },
                {
                    name: '健康',
                    value: 'health',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Health.png',
                    color_b: 'rgba(0, 216, 90, .2)',
                    color_f: 'rgba(0, 216, 90, .8)'
                },
                {
                    name: '体育',
                    value: 'sports',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Sports.png',
                    color_b: 'rgba(6, 125, 241, .2)',
                    color_f: 'rgba(6, 125, 241, .8)'
                },
                {
                    name: '动物',
                    value: 'animal',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Animal.png',
                    color_b: 'rgba( 237, 207, 0, .2)',
                    color_f: 'rgba( 237, 207, 0, .8)'
                },
                {
                    name: '音乐',
                    value: 'music',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Music.png',
                    color_b: 'rgba( 255, 112, 82, .2)',
                    color_f: 'rgba( 255, 112, 82, .8)'
                },
                {
                    name: '人',
                    value: 'people',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_People.png',
                    color_b: 'rgba(87, 113, 148, .2)',
                    color_f: 'rgba(87, 113, 148, .8)'
                },
                {
                    name: '政治',
                    value: 'politics',
                    url: '//resource.buzzbuzzenglish.com/image/buzz-corner/topics/icon_Politics.png',
                    color_b: 'rgba(0, 216, 90, .2)',
                    color_f: 'rgba(0, 216, 90, .8)'
                }
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.changeGenderMale = this.changeGenderMale.bind(this);
        this.changeGenderFemale = this.changeGenderFemale.bind(this);
        this.topicChange = this.topicChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.agreementCheck = this.agreementCheck.bind(this);
        this.skipPlacement = this.skipPlacement.bind(this);
    }

    goBack() {
        if (this.state.step === 1) {
            browserHistory.push('/');
        } else if (this.state.step <= 4) {
            let newStep = this.state.step - 1;
            this.setState({
                step: newStep
            });
        }
    }

    skipPlacement() {
        browserHistory.push('/home');
    }

    topicChange(event) {
        event.stopPropagation();

        let clonedProfile = this.state.profile;
        let clonedTopics = clonedProfile.topics;

        if (clonedTopics.indexOf(event.target.name) < 0) {
            clonedTopics.push(event.target.name);

            clonedProfile.topics = clonedTopics;
        } else {
            let newTopics = [];
            for (let i in clonedTopics) {
                if (clonedTopics[i] !== event.target.name) {
                    newTopics.push(clonedTopics[i]);
                }
            }

            clonedProfile.topics = newTopics;
        }

        this.setState({profile: clonedProfile});
    }

    changeGenderFemale() {
        let gender = this.state.profile.gender;

        if (gender !== 'f') {
            let clonedProfile = this.state.profile;
            clonedProfile.gender = 'f';
            this.setState({
                profile: clonedProfile
            });
        }
    }

    changeGenderMale() {
        let gender = this.state.profile.gender;

        if (gender !== 'm') {
            let clonedProfile = this.state.profile;
            clonedProfile.gender = 'm';
            this.setState({
                profile: clonedProfile
            });
        }
    }

    handleCityChange(event, data){
        let clonedProfile = Object.assign({}, this.state.profile);

        clonedProfile.city = data.value;
        this.setState({profile: clonedProfile});
    }

    handleGradeChange(event, data){
        let clonedProfile = Object.assign({}, this.state.profile);

        clonedProfile.grade = data.value;
        this.setState({profile: clonedProfile});
    }

    handleChange(event) {
        let clonedProfile = Object.assign({}, this.state.profile);

        clonedProfile[event.target.name] = event.target.value;
        this.setState({profile: clonedProfile});
    }

    handleChangeBirthdayLabel(event) {
        this.setState({birthdayLabel: event.target.value});
    }

    agreementCheck() {
        let agreement = this.state.agreement;
        this.setState({
            agreement: !agreement
        });
    }

    async submit(event) {
        try {
            event.stopPropagation();

            if (this.state.step < 3) {
                let newStep = this.state.step + 1;
                let newTitle = newStep === 2 ? '用于平台中呈现少年的基本资料' : '用于匹配最优话题小组';
                this.setState({
                    step: newStep,
                    profile_title: newTitle
                });
            } else if (this.state.step === 3) {
                //loading
                document.getElementById('loadingModal').style.display = 'block';

                let profileData = this.validateForm();

                if (this.state.userId) {
                    let response = await ServiceProxy.proxyTo({
                        body: {
                            uri: `{config.endPoints.buzzService}/api/v1/users/${this.state.userId}`,
                            json: profileData,
                            method: 'PUT'
                        }
                    });

                    //check if placement is done
                    let placementResult = await ServiceProxy.proxyTo({
                        body: {
                            uri: `{config.endPoints.buzzService}/api/v1/user-placement-tests/${this.state.userId}`
                        }
                    });

                    if (placementResult && placementResult.detail && placementResult.detail.length > 20) {
                        if(document.getElementById('loadingModal')){
                            document.getElementById('loadingModal').style.display = 'none';
                        }
                        browserHistory.push('/home');
                    } else {
                        let newStep = this.state.step + 1;
                        let newTitle = '建立少年的语言档案';
                        this.setState({
                            step: newStep,
                            profile_title: newTitle
                        });

                        if(document.getElementById('loadingModal')){
                            document.getElementById('loadingModal').style.display = 'none';
                        }
                    }
                } else {
                    alert('save failed!')
                }
            } else if (this.state.step === 4) {
                browserHistory.push('/placement');
            }

            //this.setState({modal: true, message: Resources.getInstance().saveSuccess});
        } catch (ex) {
            console.error(ex);
            //this.setState({modal: true, message: ex.message || Resources.getInstance().saveFailed});
        }
    }

    validateForm() {
        let profile = this.state.profile;

        let newTopics = [];

        for (let i in profile.topics) {
            if (profile.topics[i]) {
                newTopics.push(profile.topics[i]);
            }
        }

        return {
            parent_name: profile.parent_name,
            mobile: profile.phone,
            name: profile.student_en_name,
            gender: profile.gender,
            city: profile.city,
            date_of_birth: getBirthDay(profile.date_of_birth),
            grade: profile.grade,
            interests: newTopics
        };
    }

    async componentDidMount() {
        try {
            //await CurrentUser.getUserId()
            let userId = await CurrentUser.getUserId();

            let profile = this.getProfileFromUserData(await ServiceProxy.proxyTo({
                body: {
                    uri: `{config.endPoints.buzzService}/api/v1/users/${userId}`
                }
            }));

            console.log(profile);

            this.setState({
                profile: profile,
                userId: userId
            });
        }
        catch (ex) {
            console.log(ex.toString());
            alert('未登录,即将跳转...');
            browserHistory.push('/');

        }
    }

    getProfileFromUserData(userData) {
        return {
            parent_name: userData.parent_name || userData.display_name || userData.name || userData.facebook_name || userData.wechat_name || '',
            phone: userData.mobile || '',
            student_en_name: userData.name || '',
            gender: userData.gender,
            date_of_birth: getBirthDay(userData.date_of_birth),
            city: userData.city || '',
            grade: userData.grade || '',
            topics: userData.interests instanceof Array ? userData.interests : (userData.interests ? userData.interests.split(',') : []),
        };
    }

    render() {
        return (
            <div className="my-profile">
                <Segment loading={true} id='loadingModal' style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 888,
                    display: 'none'
                }}>
                </Segment>
                <div className="header-with-go-back">
                    <div className="go-back" onClick={this.goBack}>
                        <div className="arrow-left">
                        </div>
                        <div className="circle-border">
                            <img src="//resource.buzzbuzzenglish.com/image/buzz-corner/icon_back.png" alt=""/>
                        </div>
                    </div>
                    <div className="logo">
                        <div>
                            <img src="http://resource.buzzbuzzenglish.com/new_buzz_logo.png"/>
                        </div>
                    </div>
                </div>
                <div className="profile-progress">
                    <div className={this.state.step > 1 ? 'done' : (this.state.step === 1 ? 'active' : '' )}>
                        <div className="dot">
                            <div className="line-left"></div>
                            <div className="circle"></div>
                        </div>
                        <p>联系方式</p>
                    </div>
                    <div className={this.state.step > 2 ? 'done' : (this.state.step === 2 ? 'active' : '' )}>
                        <div className="dot">
                            <div className="line-left"></div>
                            <div className="circle"></div>
                        </div>
                        <p>少年信息</p>
                    </div>
                    <div className={this.state.step > 3 ? 'done' : (this.state.step === 3 ? 'active' : '' )}>
                        <div className="dot">
                            <div className="line-left"></div>
                            <div className="circle"></div>
                        </div>
                        <p>兴趣爱好</p>
                    </div>
                    <div className={this.state.step > 4 ? 'done' : (this.state.step === 4 ? 'active' : '' )}>
                        <div className="dot">
                            <div className="line-left"></div>
                            <div className="circle"></div>
                        </div>
                        <p>解密暗号</p>
                    </div>
                </div>
                <Form className='profile-body'>
                    <h3 className="profile-title">{this.state.profile_title}</h3>
                    {
                        this.state.step === 1 ?
                            (
                                <div className="form-content">
                                    <div className="parents-name">
                                        <input type="text" placeholder='家长姓名' style={{width: '100%'}}
                                               value={this.state.profile.parent_name}
                                               onChange={this.handleChange}
                                               name='parent_name'/>
                                    </div>
                                    <div className="phone-number">
                                        <Button>中国(+86)</Button>
                                        <input type="number" style={{width: '60%'}}
                                               value={this.state.profile.phone}
                                               onChange={this.handleChange}
                                               name='phone'/>
                                    </div>
                                    <div className="check-number">
                                        <input type="text" style={{width: '60%'}}/>
                                        <Button>获取验证码</Button>
                                    </div>
                                    <div className="agreement" onClick={this.agreementCheck}>
                                        <img
                                            src={this.state.agreement === true ? "//resource.buzzbuzzenglish.com/image/buzz-corner/icon_select_active.png" : "//resource.buzzbuzzenglish.com/image/buzz-corner/icon_select.png"}
                                            alt=""/>
                                        <span>我已接受并遵守BuzzBuzz的相关用户协议与条款</span>
                                    </div>
                                </div>
                            ) : (
                                this.state.step === 2 ? (
                                        <div className="form-content">
                                            <div className="parents-name">
                                                <input type="text" placeholder='少年英文名' style={{width: '100%'}}
                                                       value={this.state.profile.student_en_name}
                                                       onChange={this.handleChange}
                                                       name='student_en_name'/>
                                            </div>
                                            <div className="gender">
                                                <div className="male" onClick={this.changeGenderMale}>
                                                    <div
                                                        className={this.state.profile.gender === 'm' ? 'avatar active' : 'avatar'}>
                                                        <img
                                                            src="//resource.buzzbuzzenglish.com/image/buzz-corner/icon_boy.png"
                                                            alt=""/>
                                                    </div>
                                                    <span
                                                        style={this.state.profile.gender === 'm' ? {color: '#f7b52a'} : {}}>男</span>
                                                </div>
                                                <div className="female" onClick={this.changeGenderFemale}>
                                                    <div
                                                        className={ this.state.profile.gender === 'f' ? 'avatar active' : 'avatar'}>
                                                        <img
                                                            src="//resource.buzzbuzzenglish.com/image/buzz-corner/icon_girl.png"
                                                            alt=""/>
                                                    </div>
                                                    <span
                                                        style={this.state.profile.gender === 'f' ? {color: '#f7b52a'} : {}}>女</span>
                                                </div>
                                            </div>
                                            <Form.Group widths='equal' className="position-relative">
                                                <Form.Input
                                                    style={this.state.profile.date_of_birth ? {opacity: '1'} : {opacity: '0'}}
                                                    value={this.state.profile.date_of_birth} type="date"
                                                    onChange={this.handleChange} name='date_of_birth'/>
                                                <div className="field birthday-label">
                                                    <input type="text" placeholder='生日' style={{width: '100%'}}
                                                           value={this.state.birthdayLabel || ''}
                                                           onChange={this.handleChangeBirthdayLabel}
                                                           name='birthdayLabel'/>
                                                </div>
                                            </Form.Group>
                                            <div className="selection-options">
                                                <Dropdown placeholder='城市' search selection noResultsMessage="没有这个城市哦"
                                                          onChange = {(event, data) => {this.handleCityChange(event, data)}} value={this.state.profile.city}
                                                          options={city_list}/>
                                                <Dropdown placeholder='年级' search selection noResultsMessage="例如: 六年级"
                                                          onChange = {(event, data) => {this.handleGradeChange(event, data)}} value={this.state.profile.grade}
                                                          options={grade_list}/>
                                            </div>
                                        </div>
                                    ) : (
                                        this.state.step === 3 ?
                                            (<div className='topic form-content'>
                                                <p>兴趣爱好</p>
                                                <div className="topic-items">
                                                    {
                                                        this.state.placement_topics.map((item, index) => {
                                                            return <div key={index}
                                                                        style={{backgroundColor: item.color_b}}>
                                                                <div>
                                                                    <img src={item.url}/>
                                                                </div>
                                                                <p style={{color: item.color_f}}>{item.name}</p>
                                                                <a onClick={this.topicChange} name={item.value}
                                                                   style={{border: this.state.profile.topics.indexOf(item.value) >= 0 ? '1px solid #f7b52a' : '1px solid transparent'}}/>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>) :
                                            (
                                                <div className="form-content">
                                                    <h4>优先匹配最合适的<span style={{color: '#f7b52a'}}>外籍伙伴</span></h4>
                                                    <img className="profile-done-img"
                                                         src="//resource.buzzbuzzenglish.com/image/buzz-corner/friends.png"
                                                         alt=""/>
                                                </div>
                                            )
                                    )
                            )
                    }
                    <Form.Group widths='equal'>
                        <Form.Field control={Button} content={this.state.step < 4 ? '继续' : '完成'}
                                    disabled={this.state.step === 1 ? (!this.state.profile.phone || this.state.profile.phone.length !== 11 || !this.state.profile.parent_name || !this.state.agreement) : (this.state.step === 2 ? (!this.state.profile.student_en_name || !this.state.profile.date_of_birth || !this.state.profile.city || !this.state.profile.gender || !this.state.profile.grade || this.state.profile.gender === 'u') : (this.state.step === 3 ? !this.state.profile.topics.length : false))}
                                    style={!(this.state.step === 1 ? (!this.state.profile.phone  || this.state.profile.phone.length !== 11 || !this.state.profile.parent_name || !this.state.agreement) : (this.state.step === 2 ? (!this.state.profile.student_en_name || !this.state.profile.date_of_birth || !this.state.profile.city || !this.state.profile.gender) : (this.state.step === 3 ? !this.state.profile.topics.length : false))) ? {
                                            margin: '2em auto .5em auto',
                                            width: '100%',
                                            color: 'rgb(255,255,255)',
                                            background: 'linear-gradient(to right, rgb(251, 218, 97) , rgb(246, 180, 12))',
                                            height: '4em',
                                            letterSpacing: '4px',
                                            fontWeight: 'normal',
                                            borderRadius: '30px',
                                            opacity: '1 !important'
                                        } : {
                                            margin: '2em auto .5em auto',
                                            width: '100%',
                                            color: 'rgb(255,255,255)',
                                            backgroundColor: 'rgb(223, 223, 228)',
                                            height: '4em',
                                            letterSpacing: '4px',
                                            fontWeight: 'normal',
                                            borderRadius: '30px',
                                            opacity: '1 !important'
                                        }} onClick={this.submit}/>
                    </Form.Group>
                    {
                        this.state.step === 4 ? (
                                <div className="skip" onClick={this.skipPlacement}>跳过, 稍后完成</div>
                            ) : ('')
                    }
                </Form>
                <br/>
            </div>
        );
    }
}

export default Homepage;