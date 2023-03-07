import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/Login.css';
import logo from '../../asset/img/logo_sbl.png'
import { LoginFooter } from './LoginFooter';
import { Personal_Info } from './Login/Personal_Info';

const Login = ({socket}) => {

  const navigate = useNavigate();
  const onClickRegister = () => {
    navigate('/register');
  };
  const onClickE_Register = () => {
    navigate('/e_register');
  }

  const [tab, setTab] = useState(true);

  const inputId = useRef('');
  const [id, setId] = useState('');
  const onIdChange = (e) => {
    setId(e.target.value);
  };

  const inputPw = useRef('');
  const [pw, setPw] = useState('');
  const onPwChange = (e) => {
    setPw(e.target.value);
  };

  const onMLoginClick = () => {
    // console.log(id);
    // console.log(pw);

    axios
      .post('/member/login', { id: id, pw: pw })
      .then((res) => {
        console.log(res.data);
        if (res.data.mb_job == 's') {
          window.sessionStorage.setItem('loginId', res.data.mb_id);
          window.sessionStorage.setItem('role', 's');
          window.sessionStorage.setItem('userName', res.data.mb_name);
          window.sessionStorage.setItem('course_key', res.data.course_key);
          window.location.replace('/');
        } else if (res.data.mb_job == 't') {
          window.sessionStorage.setItem('loginId', res.data.mb_id);
          window.sessionStorage.setItem('role', 't');
          window.sessionStorage.setItem('userName', res.data.mb_name);
          window.sessionStorage.setItem('course_key', res.data.course_key);
          window.location.replace('/');

        } else if (res.data.mb_job == 'a') {
          window.sessionStorage.setItem('loginId', res.data.mb_id);
          window.sessionStorage.setItem('role', 'a');
          window.sessionStorage.setItem('userName', res.data.mb_name);
          window.sessionStorage.setItem('course_key', '52D8EECC');
          window.location.replace('/');

        } else alert('일치하는 회원정보가 없습니다');
      })
      .catch((e) => console.log(e));
  };

  const onELoginClick = () => {
    //window.sessionStorage.setItem('role', 'e');
    //window.sessionStorage.setItem('userName', '유티소프트');
    //window.location.replace('/e_main');

    axios
      .post('/enterprise/login', { id: id, pw: pw })
      .then((res) => {
        console.log(res.data);

        if (res.data.enter_approve == 'N') {
          alert('승인되지 않은 아이디입니다.')
        } else {
          window.sessionStorage.setItem('loginId', res.data.enter_id);
          window.sessionStorage.setItem('role', 'e');
          window.sessionStorage.setItem('userName', res.data.enter_name);
          window.location.replace('/');
        }
      })
      .catch((e) => console.log(e));
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      onMLoginClick(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  const handleOnKeyPress2 = (e) => {
    if (e.key === 'Enter') {
      onELoginClick(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <div>
        <div><img  className='loginLogo' src={logo} /></div>
    <div className="loginContainer">
    
      <div className="topDiv loginDiv">
        
        <div className="loginTab">
       
          <button className={tab?'loginBtnStyle':''}
            onClick={() => {
              setTab(true);
              setId('');
              setPw('');
            }}
          >
            회원 로그인
          </button>
          <button  className={tab?'':'loginBtnStyle'}
            onClick={() => {
              setTab(false);
              setId('');
              setPw('');
            }}
          >
            기업 로그인
          </button>
        </div>
        {tab ? (
          <div className="memberLogin">
            <input
              ref={inputId}
              onChange={onIdChange}
              value={id}
              id="IdInput"
              type="text"
              placeholder="아이디를 입력해주세요"
            ></input>
            <input
              ref={inputPw}
              onChange={onPwChange}
              value={pw}
              id="PwInput"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onKeyPress={handleOnKeyPress}
            ></input>
            <div>
              <input type="checkbox"></input>
              <span>로그인 유지</span>
              <input type="checkbox"></input>
              <span>아이디 저장</span>
            </div>
            <button onClick={onMLoginClick}>로그인</button>
            <div>
              <span>아이디 찾기</span>
              <span className='loginLine_1'>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <span>
                비밀번호 찾기</span> 
                <span className='loginLine_1'>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <span className="loginRegisterNav" onClick={onClickRegister}>
                회원가입
              </span>
            </div>
          </div>
        ) : (
          <div className="enterpriseLogin">
            <input
              ref={inputId}
              onChange={onIdChange}
              value={id}
              id="IdInput"
              type="text"
              placeholder="아이디를 입력해주세요"
            ></input>
            <input
              ref={inputPw}
              id='PwInput'
              onChange={onPwChange}
              value={pw}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onKeyPress={handleOnKeyPress2}
            ></input>
            <div>
              <input type="checkbox"></input>
              <span>로그인 유지</span>
              <input type="checkbox"></input>
              <span>아이디 저장</span>
            </div>
            <button onClick={onELoginClick}>로그인</button>
            <div>
              <span>아이디 찾기</span>
              <span className='loginLine_1'>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <span>비밀번호 찾기</span>
              <span className='loginLine_1'>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <span className='hoverHand' onClick={onClickE_Register}>회원가입</span>
            </div>
          </div>
        )}
      </div>
    </div>
    <div >
      <Personal_Info/>
    </div>
    <div className='loginFooter'>
    <LoginFooter/>
    </div></div>
  );
};


export default Login;
