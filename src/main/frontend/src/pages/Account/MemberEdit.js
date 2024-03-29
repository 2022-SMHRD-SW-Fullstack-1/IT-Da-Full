import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
        정말 탈퇴하시겠습니까?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          탈퇴 후에는 계정을 복구할 수 없습니다.
        </p>
        <p>
          확인버튼을 누르시면 회원 정보가 삭제되고 자동으로 로그아웃 됩니다.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onWithdrawal}>확인</Button>
        <Button variant="secondary" onClick={props.onHide}>취소</Button>
      </Modal.Footer>
    </Modal>
  );
}

const MemberEdit = ({socket}) => {
  //오류 메시지 상태
  const [pwMessage, setPwMessage] = useState('');
  const [pwCheckMessage, setPwCheckMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [telMessage, setTelMessage] = useState('');
  const [addrMessage, setAddrMessage] = useState('');


  //유효성 검사
  const [isPw, setIsPw] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(false);
  const [isName, setIsName] = useState(true);
  const [isTel, setIsTel] = useState(true);
  const [isAddr, setIsAddr] = useState(true);

  console.log(isAddr, isName, isPw, isPwCheck, isTel)

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

  const onNameChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo({
      ...memberInfo,
      [name]: value,
    });
    console.log(memberInfo);

    if (e.target.value.length <= 1) {
      setNameMessage('2글자 이상 입력해주세요.');
      setIsName(false);
    } else {
      setNameMessage('');
      setIsName(true);
    }
  };


  const onTelChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo({
      ...memberInfo,
      [name]: value,
    });
    console.log(memberInfo);
    const telRegex = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;

    if (!telRegex.test(e.target.value)) {
      setTelMessage('올바른 번호를 입력해주세요.');
      setIsTel(false);
    } else {
      setTelMessage('');
      setIsTel(true);
    }
  };

  const onAddressChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo({
      ...memberInfo,
      [name]: value,
    });
    console.log(memberInfo);
    if (e.target.value.length <= 11) {
      setAddrMessage('올바른 주소를 입력해주세요.');
      setIsAddr(false);
    } else {
      setAddrMessage('');
      setIsAddr(true);
    }
  };

  const navigate = useNavigate();

  const [memberInfo, setMemberInfo] = useState({
    mb_id: '',
    mb_pw: '',
    mb_name: '',
    mb_birthdate: '',
    mb_gender: '',
    mb_phone: '',
    mb_addr: '',

  })

  //버튼 활성화
  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (isPw && isPwCheck && isName && isTel && isAddr) {
      setNotAllow(false);
      return;
    } else
      setNotAllow(true);
  }, [isPw, isPwCheck, isName, isTel, isAddr]);



  useEffect(() => {
    axios
      .get('/member/memberEdit', {
        params: {
          mb_id: sessionStorage.getItem('loginId'),
        }
      })
      .then((res) =>
        setMemberInfo(res.data)
      )
      .catch((e) => console.log(e));

  }, []);


  const btnMemberEdit = () => {
    console.log("click");

    axios
      .post("/member/memberEditUpdate", {
        mb_id: memberInfo.mb_id,
        mb_pw: memberInfo.mb_pw,
        mb_name: memberInfo.mb_name,
        mb_phone: memberInfo.mb_phone,
        mb_addr: memberInfo.mb_addr,

      })
      .then(() => {
        navigate('/memberEditCheck')
        alert('회원정보가 수정되었습니다.')
      })
      .catch(() => {
        alert('입력을 다시 확인해주세요.')
      })
  }

  //회원 탈퇴
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalShow, setModalShow] = React.useState(false);

  const onWithdrawal = () => {
    setModalShow(false)
    axios
      .get("/member/memberWithdrawal", {
        params: {
          mb_id: sessionStorage.getItem('loginId'),
        }
      })
      .then((res) => console.log('탈퇴완료'))
      .catch((e) => console.log(e));
    window.sessionStorage.removeItem("loginId")
    window.sessionStorage.removeItem("userName")
    window.sessionStorage.removeItem("role")
    socket.close()
    window.location.replace("/")
  }

  return (
    <div className="registerContainer memberEditContainer">
      <div>
        <p>회원 정보 수정</p>
        <div>
          <span>아이디</span>
          <p>{memberInfo.mb_id}</p>

        </div>
        <div>
          <span>비밀번호</span>
          <input
            type='password'
            onChange={onPwChange}
          />
        </div>
        <span>{pwMessage}</span>
        <div>
          <span>비밀번호 확인</span>
          <input
            type='password'
            value={pwCheck}
            onChange={onPwCheckChange} />
        </div>
        <span>{pwCheckMessage}</span>
        <div>
          <span>이름</span>
          <input
            name='mb_name'
            value={memberInfo.mb_name || ''}
            onChange={onNameChange} />
        </div>
        <span>{nameMessage}</span>

        <div>
          <span>연락처</span>
          <input
            type="tel"
            name='mb_phone'
            value={memberInfo.mb_phone}
            onChange={onTelChange} />
        </div>
        <span>{telMessage}</span>
        <div>
          <span>주소</span>
          <input
            name='mb_addr'
            value={memberInfo.mb_addr}
            onChange={onAddressChange}
          />
        </div>
        <span>{addrMessage}</span>


        <div>
          <span>생년월일</span>
          <input readOnly
            name='mb_birthdate'
            value={memberInfo.mb_birthdate || ''}
            type="text" />
        </div>
        <div>
          <span>성별</span>
          <input
            name="mb_gender"
            value={memberInfo.mb_gender == 'm' ? '남성' : '여성'}
            readOnly
          ></input>
        </div>

        <button
          className='memberBtn'
          disabled={notAllow}
          onClick={(e) => {
            btnMemberEdit(e)
          }}>수정</button>
      </div>
      <div id='memberWithdrawal'>
        <p>회원 탈퇴</p>
        <button onClick={() => setModalShow(true)}>탈퇴하기</button>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        backdrop="static"
        keyboard={false}
        onHide={() => setModalShow(false)}
        onWithdrawal={onWithdrawal}
      />
    </div>
  )
}

export default MemberEdit