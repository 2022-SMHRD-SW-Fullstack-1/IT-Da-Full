import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../../css/Register.css';
import Agreement from './Agreement';

const Register = ({ socket }) => {
  //오류 메시지 상태
  const [idMessage, setIdMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwCheckMessage, setPwCheckMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [bdMessage, setBdMessage] = useState('');
  const [telMessage, setTelMessage] = useState('');
  const [addrMessage, setAddrMessage] = useState('');
  const [keyMessage, setKeyMessage] = useState('');

  //const [genderMessage, setGenderMessage] = useState('');
  // const [expireMessage, setExpireMessage] = useState('');

  //유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isBd, setIsBd] = useState(false);
  const [isTel, setIsTel] = useState(false);
  const [isAddr, setIsAddr] = useState(false);
  const [isKey, setIsKey] = useState(false);

  //const [isGender, setIsGender] = useState(false);
  //const [isExpire, setIsExpire] = useState(false);

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const onIdChange = (e) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setId(e.target.value);
    if (emailRegex.test(e.target.value)) {
      setIdMessage('');
      setIsId(true);
    } else {
      setIdMessage('올바른 이메일을 입력해주세요.');
      setIsId(false);
    }
  };

  const [pw, setPw] = useState('');
  const onPwChange = (e) => {
    const pwRegex =
      /(?=.*\d{1,20})(?=.*[~`!@#$%\^&*()-+=]{1,20})(?=.*[a-zA-Z]{2,20}).{8,20}$/;
    setPw(e.target.value);
    if (pwRegex.test(e.target.value)) {
      setPwMessage('');
      setIsPw(true);
    } else {
      setPwMessage('비밀번호는 8-15자의 영문/숫자 또는 특수문자 조합입니다.');
      setIsPw(false);
    }
  };

  const [pwCheck, setPwCheck] = useState('');
  const onPwCheckChange = (e) => {
    setPwCheck(e.target.value);
    if (pw === e.target.value) {
      setPwCheckMessage('');
      setIsPwCheck(true);
    } else {
      setPwCheckMessage('비밀번호를 다시 확인해주세요');
      setIsPwCheck(false);
    }
  };

  const [name, setName] = useState('');
  const onNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length <= 1) {
      setNameMessage('2글자 이상 입력해주세요.');
      setIsName(false);
    } else {
      setNameMessage('');
      setIsName(true);
    }
  };

  const [bd, setBD] = useState('');
  const onBDChange = (e) => {
    const dbRegex =
      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    setBD(e.target.value);
    if (!dbRegex.test(e.target.value)) {
      setBdMessage('생년월일을 입력해주세요.');
      setIsBd(false);
    } else {
      setBdMessage('');
      setIsBd(true);
    }
  };

  const [gender, setGender] = useState('m');
  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const [tel, setTel] = useState('');
  const onTelChange = (e) => {
    const telRegex = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
    setTel(e.target.value);
    if (!telRegex.test(e.target.value)) {
      setTelMessage('올바른 번호를 입력해주세요.');
      setIsTel(false);
    } else {
      setTelMessage('');
      setIsTel(true);
    }
  };

  const [address, setAddress] = useState('');
  const onAddressChange = (e) => {
    setAddress(e.target.value);
    if (e.target.value.length <= 11) {
      setAddrMessage('올바른 주소를 입력해주세요.');
      setIsAddr(false);
    } else {
      setAddrMessage('');
      setIsAddr(true);
    }
  };

  const [course_key, setCourse_key] = useState('');
  const onCourse_keyChange = (e) => {
    setCourse_key(e.target.value)
    if (e.target.value.length != 8) {
      setKeyMessage('올바른 키를 입력해주세요.')
      setIsKey(false)
    } else {
      setKeyMessage('')
      setIsKey(true)
    }
  }

  const [expire, setExpire] = useState('leave');
  const onExpireChange = (e) => {
    setExpire(e.target.value);
  };

  //버튼 활성화
  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (isId && isPw && isPwCheck && isName && isBd && isTel && isAddr && isKey) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [isId, isPw, isPwCheck, isName, isBd, isTel, isAddr, isKey]);

  // const [teacher, setTeacher] = useState('')

  const onClickRegister = () => {

    let teacher = ""

    // console.log(id)
    // console.log(pw)
    // console.log(pwCheck)
    // console.log(name)
    // console.log(bd)
    // console.log(gender)
    // console.log(tel)
    // console.log(address)
    // console.log(expire)


    //back으로 회원가입 데이터 전송
    axios
      .post('/member/register', {
        id: id,
        pw: pw,
        name: name,
        bd: bd,
        gender: gender,
        tel: tel,
        address: address,
        expire: expire,
        key: course_key
      })
      .then((res) => {
        console.log(res)
        alert('회원가입에 성공했습니다.')
      })
      .catch((e) => {
        console.log(e)
        alert('회원가입에 실패했습니다.')
      });
    navigate('/');


    // 학생 회원가입 알림

    axios
      .get('/alarm/selectTeacher2', {
        params: {
          course_key: course_key
        }
      })
      .then((res) => {
        console.log(res.data)
        // 실시간 알림
        if (socket) {
          console.log(res.data)
          socket.send(JSON.stringify({
            alarm_num: 0,
            mb_id_from: '',
            mb_id_to: res.data,
            alarm_content: `${name}님이 회원가입을 하셨습니다`,
            alarm_check: 'N',
            alarm_dt: '방금 전'
          }))
        }
      })
      .catch((e) => {
        console.log('선생님가져오기 실패')
        alert('회원가입에 실패했습니다.')
      });



    axios
      .post('/alarm/stdRegisterAlarm', {
        mb_id_from: id,
        course_key: course_key,
        alarm_content: `${name}님이 회원가입을 하셨습니다`
      })
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      });
  };

  return (
    <div className="registerContainer">
      <div>
        <p>개인회원가입</p>
        <Agreement />

        <div>
          <span>아이디 (4~15자 영문,숫자)</span>
          <input onChange={onIdChange} value={id} type="email"></input>
        </div>
        <span>{idMessage}</span>

        <div>
          <span>비밀번호 8-15자의 영문/숫자 또는 특수문자 조합</span>
          <input onChange={onPwChange} value={pw} type="password"></input>
        </div>
        <span>{pwMessage}</span>

        <div>
          <span>비밀번호 재입력</span>
          <input
            onChange={onPwCheckChange}
            value={pwCheck}
            type="password"
          ></input>
        </div>
        <span>{pwCheckMessage}</span>

        <div>
          <span>이름</span>
          <input onChange={onNameChange} value={name} type="text"></input>
        </div>
        <span> {nameMessage}</span>

        <div>
          <span>생년월일</span>
          <input onChange={onBDChange} value={bd} type="date"></input>
          <span>성별</span>
          <div>
            <input
              type="radio"
              name="gender"
              value="m"
              onChange={handleGender}
              checked={gender === 'm'}
            ></input>{' '}
            남
            <input
              type="radio"
              name="gender"
              value="f"
              onChange={handleGender}
              checked={gender === 'f'}
            ></input>{' '}
            여
          </div>
        </div>
        <span>{bdMessage}</span>

        <div>
          <span>휴대폰 ('-'없이 입력하세요.)</span>
          <input onChange={onTelChange} value={tel} type="tel"></input>
        </div>
        <span>{telMessage}</span>

        <div>
          <span>주소</span>
          <input onChange={onAddressChange} value={address} type="text"></input>
        </div>
        <span>{addrMessage}</span>

        <div>
          <span>과정 키 (8자)</span>
          <input onChange={onCourse_keyChange} value={course_key} type="text"></input>
        </div>
        <span>{keyMessage}</span>
        <br />
        <br />
        <h6>개인정보 유효기간 선택</h6>
        <div id="expire">
          <div>
            <input
              type="radio"
              name="expire_dt"
              value="one"
              onChange={onExpireChange}
              checked={expire === 'one'}
              id="1year"
            ></input>
            <label htmlFor="1year">1년</label>
          </div>
          <div>
            <input
              type="radio"
              name="expire_dt"
              value="three"
              onChange={onExpireChange}
              checked={expire === 'three'}
              id="3year"
            ></input>
            <label htmlFor="3year">3년</label>
          </div>
          <div>
            <input
              type="radio"
              name="expire_dt"
              value="leave"
              onChange={onExpireChange}
              checked={expire === 'leave'}
              id="leave"
            ></input>
            <label htmlFor="leave">회원탈퇴시</label>
          </div>
        </div>

        <button
          className='registerBtn'
          disabled={notAllow}
          onClick={(e) => {
            onClickRegister(e);
          }}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default Register;
