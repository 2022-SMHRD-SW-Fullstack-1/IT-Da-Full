import React from 'react'
import logo from '../../asset/img/logo_sbl.png'

export const LoginFooter = () => {
const onClick=()=>{
    window.open("https://smhrd.or.kr/")
    
}

  return (
    <div className='LoginFopterDiv'>
    <img onClick={onClick} className='LoginFooterLogo' src={logo} /> &nbsp;
    <span className='LoginText'>Copyright</span> 
    <span className='LoginCorp'> © Smhrd Corp.</span> 
    <span className='LoginText'> All Rights Reserved.</span>
    </div>
  )
}
