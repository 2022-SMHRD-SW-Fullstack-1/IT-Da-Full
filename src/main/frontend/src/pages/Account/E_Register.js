import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid'

const E_Register = ({socket}) => {

   //오류 메시지 상태
   const [enterpriseMessage, setEnterpriseMessage] = useState('');
   const [idMessage, setIdMessage] = useState('');
   const [pwMessage, setPwMessage] = useState('');
   const [pwCheckMessage, setPwCheckMessage] = useState('');
   const [nameMessage, setNameMessage] = useState('');
   const [telMessage, setTelMessage] = useState('');

   //const [genderMessage, setGenderMessage] = useState('');
   // const [expireMessage, setExpireMessage] = useState('');

   //유효성 검사
   const [isEnterprise, setIsEnterprise] = useState(false);
   const [isId, setIsId] = useState(false);
   const [isPw, setIsPw] = useState(false);
   const [isPwCheck, setIsPwCheck] = useState(false);
   const [isName, setIsName] = useState(false);
   const [isTel, setIsTel] = useState(false);

   //const [isGender, setIsGender] = useState(false);
   //const [isExpire, setIsExpire] = useState(false);

   const navigate = useNavigate();

   const [enterprise, setEnterprise] = useState('');
   const onEnterpriseChange = (e) => {
      setEnterprise(e.target.value);
      if (e.target.value.length <= 1) {
         setEnterpriseMessage('2글자 이상 입력해주세요.');
         setIsEnterprise(false);
      } else {
         setEnterpriseMessage('');
         setIsEnterprise(true);
      }
   };

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

   const [bNum, setBNum] = useState('');
   const onBNumChange = (e) => {
      setBNum(e.target.value);
   };

   const [add, setAdd] = useState('');
   const onAddChange = (e) => {
      setAdd(e.target.value);
   };

   const [tel, setTel] = useState('');
   const onTelChange = (e) => {
      const telRegex = /^([0-9]{2,3})?([0-9]{3,4})?([0-9]{4})$/;
      setTel(e.target.value);
      if (!telRegex.test(e.target.value)) {
         setTelMessage('올바른 번호를 입력해주세요.');
         setIsTel(false);
      } else {
         setTelMessage('');
         setIsTel(true);
      }
   };

   //버튼 활성화
   const [notAllow, setNotAllow] = useState(true);

   useEffect(() => {
      if (isId && isPw && isPwCheck && isName && isTel && isEnterprise) {
         setNotAllow(false);
         return;
      }
      setNotAllow(true);
   }, [isId, isPw, isPwCheck, isName, isTel, isEnterprise]);

   const onClickRegister = () => {

      // 실시간 알림
      if (socket) {
         socket.send(JSON.stringify({
            alarm_num: 0,
            mb_id_from: '',
            mb_id_to: 'admin',
            alarm_content: `'${enterprise}'기업이 가입신청을 하였습니다.`,
            alarm_check: 'N',
            alarm_dt: '방금 전'
         }))
      }

      //back으로 회원가입 데이터 전송
      axios
         .post('/enterprise/register', {
            enter_id: id,
            enter_pw: pw,
            enter_name: enterprise,
            enter_manager: name,
            enter_tel: tel,
            enter_approve: 'N',
            enter_address: add,
            enter_num: bNum
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

      // 기업회원가입 알람
      axios
         .post('/alarm/enterRegisterAlarm', {
            mb_id_from: id,
            mb_id_to: 'admin',
            alarm_content: `'${enterprise}'기업이 가입신청을 하였습니다.`,
         })
         .then((res) => {
            console.log(res)
         })
         .catch((e) => {
         });
      navigate('/');
   };

   return (
      <div className="registerContainer">
         <div>
            <p>기업회원가입</p>

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
               <span>기업명</span>
               <input onChange={onEnterpriseChange} value={enterprise} type="text"></input>
            </div>
            <span> {enterpriseMessage}</span>

            <div>
               <span>대표명</span>
               <input onChange={onNameChange} value={name} type="text"></input>
            </div>
            <span> {nameMessage}</span>

            <div>
               <span>주소</span>
               <input onChange={onAddChange} value={add} type="text"></input>
            </div>

            <div>
               <span>사업자 번호</span>
               <input onChange={onBNumChange} value={bNum} type="tel"></input>
            </div>

            <div>
               <span>담당자 연락처 ('-'없이 입력하세요.)</span>
               <input onChange={onTelChange} value={tel} type="tel"></input>
            </div>
            <span>{telMessage}</span>

            <button
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

export default E_Register