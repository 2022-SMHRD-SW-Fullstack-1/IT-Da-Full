import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from "axios"

import '../css/header.css'
import logo from '../asset/img/logo_sbl.png'
import profileImg from '../asset/img/img_user.PNG'
import { HiOutlineBellAlert } from "react-icons/hi2";
import { HiBellAlert } from "react-icons/hi2";
import AllAlarm_list from '../pages/Alarm/AllAlarm_list';
import ListGroup from 'react-bootstrap/ListGroup';


const Header = ({socket}) => {

    const onClickLogout = () => {
        window.sessionStorage.removeItem("loginId")
        window.sessionStorage.removeItem("userName")
        window.sessionStorage.removeItem("role")
        socket.close()
        window.location.replace("/")
    }

    const onClickLogo = () => {
        window.location.replace("/")
    }

    const navigate = useNavigate()

    const onClickEdit = () => {
        navigate('/memberEditCheck')
    }

    // 알람

    const [alarmCount, setAlarmCount] = useState()
    const [alarmIconPo, setAlarmIconPo] = useState({ display: '' })
    const [alarmIconOp, setAlarmIconOp] = useState({ display: 'none' })
    const [allAlarmShow, setAllAlarmShow] = useState({ display: 'none' })

    useEffect(() => {
        window.sessionStorage.getItem("role") !== null &&
            axios
                .get("/alarm/alarmCount",
                    {
                        params: {
                            mb_id_to: window.sessionStorage.getItem("loginId")
                        }
                    })
                .then(function (res) {
                    if (res.data > 0) {
                        setAlarmIconPo({ display: 'none' })
                        setAlarmIconOp({ display: '' })
                    }
                })
                .catch(function (error) {
                    console.log("error")
                })

        window.sessionStorage.getItem("role") !== null &&
            axios
                .get("/alarm/selectAllAlarm",
                    {
                        params: {
                            mb_id_to: window.sessionStorage.getItem("loginId")
                        }
                    })
                .then(function (res) {
                    setAllAlarm(res.data)
                })
                .catch(function (error) {
                    console.log("error")
                })
    }, [])

    const [allAlarm, setAllAlarm] = useState([])

    const allAlarmClick = () => {
        if (allAlarmShow.display === 'none') {
            setAllAlarmShow({ display: '' })
        } else {
            setAllAlarmShow({ display: 'none' })
        }
        // axios
        //     .post("/alarm/clearNewAlarm",
        //         {
        //             params: {
        //                 mb_id_to: window.sessionStorage.getItem("loginId")
        //             }
        //         })
        //     .then(function (res) {
        //         console.log("success")
        //         setAllAlarm(res.data)
        //     })
        //     .catch(function (error) {
        //         console.log("error")
        //     })
    }

    const allAlarmList =
        allAlarm.map((item) => <AllAlarm_list allAlarm={allAlarm} setAllAlarm={setAllAlarm} item={item} key={item.alarm_num} />)

    return (
        <div className='headerTopDiv' style={{ zIndex: '99' }}>
            <div className='headerInnerDiv'>
                <img onClick={onClickLogo} className='headerLogo hoverHand' src={logo} />
                {(window.sessionStorage.getItem("role") === 's') && (
                    <div className='headerRight'>
                        <p>{window.sessionStorage.getItem("userName")}</p>
                        <img className='headerImgProfile' onClick={onClickEdit} src={profileImg} />
                        <button onClick={onClickLogout} className='headerBtn'>로그아웃</button>
                        <div><HiOutlineBellAlert onClick={allAlarmClick} style={alarmIconPo} className='alarmIcon' /></div>
                        <div><HiBellAlert onClick={allAlarmClick} style={alarmIconOp} className='alarmIcon' /></div>
                        <div className="AllAlarmListGroup">
                            <ListGroup style={allAlarmShow} >
                                {allAlarmList}
                            </ListGroup>
                        </div>
                    </div>
                )}
                {(window.sessionStorage.getItem("role") === 't') && (
                    <div className='headerRight'>
                        <p>{window.sessionStorage.getItem("userName")} 연구원</p>
                        <img className='headerImgProfile' src={profileImg} />
                        <button onClick={onClickLogout} className='headerBtn'>로그아웃</button>
                        <div><HiOutlineBellAlert onClick={allAlarmClick} style={alarmIconPo} className='alarmIcon' /></div>
                        <div><HiBellAlert onClick={allAlarmClick} style={alarmIconOp} className='alarmIcon' /></div>
                        <div className="AllAlarmListGroup">
                            <ListGroup style={allAlarmShow} >
                                {allAlarmList}
                            </ListGroup>
                        </div>
                    </div>
                )}
                {(window.sessionStorage.getItem("role") === 'a') && (
                    <div className='headerRight'>
                        <p>{window.sessionStorage.getItem("userName")}님</p>
                        <img className='headerImgProfile' src={profileImg} />
                        <button onClick={onClickLogout} className='headerBtn'>로그아웃</button>
                        <div><HiOutlineBellAlert onClick={allAlarmClick} style={alarmIconPo} className='alarmIcon' /></div>
                        <div><HiBellAlert onClick={allAlarmClick} style={alarmIconOp} className='alarmIcon' /></div>
                        <div className="AllAlarmListGroup">
                            <ListGroup style={allAlarmShow} >
                                {allAlarmList}
                            </ListGroup>
                        </div>
                    </div>
                )}
                {(window.sessionStorage.getItem("role") === 'e') && (
                    <div className='headerRight'>
                        <p>{window.sessionStorage.getItem("userName")}</p>
                        <img className='headerImgProfile' src={profileImg} />
                        <button onClick={onClickLogout} className='headerBtn'>로그아웃</button>
                        <div><HiOutlineBellAlert onClick={allAlarmClick} style={alarmIconPo} className='alarmIcon' /></div>
                        <div><HiBellAlert onClick={allAlarmClick} style={alarmIconOp} className='alarmIcon' /></div>
                        <div className="AllAlarmListGroup">
                            <ListGroup style={allAlarmShow} >
                                {allAlarmList}
                            </ListGroup>
                        </div>
                    </div>
                )}
                {(window.sessionStorage.getItem("role") === null) && (
                    <div className='headerRight'>
                        <a href='https://smhrd.or.kr/info/story/'>기관소개</a>
                        <a href='https://smhrd.or.kr/job/live/'>취업현황</a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header