import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/MemberEdit.css'

export const MemberEditCheck = () => {

    const navigate = useNavigate()

    const [mb_pw, setMb_pw] = useState('')

    const onChange = (e) => {
        setMb_pw(e.target.value);
        console.log(mb_pw)
      };

    
    const editCheck = () => {
        axios
            .get("/member/memberEditCheck", {
                params: {
                    mb_id: sessionStorage.getItem('loginId'),
                    mb_pw: mb_pw
                }
            }).then(function (res) {
                console.log(res.data)
                if(res.data==='success'){
                    navigate('/memberEdit')
                }else{
                    alert("비밀번호를 확인해주세요")
                }
                
            }).catch(function (err) {
                alert("서버 연결 실패")
            })
    }
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            editCheck(); // Enter 입력이 되면 클릭 이벤트 실행
        }
      };

    // const handleOnKeyPress = (e) => {
    //     if (e.key === 'Enter') {
    //       //  editCheck(); // Enter 입력이 되면 클릭 이벤트 실행
    //     }
    //   };

    return (
        <div className='MemberEditCheckDiv'>
            <div className='MemberEditCheck'>
            비밀번호 확인 
            <input type='password' value={mb_pw} name='mb_pw' onChange={onChange}
            onKeyPress={handleOnKeyPress} 
            />
             
           
            <button onClick={editCheck}>제출</button>
          
        </div>
        </div>
    )
}
