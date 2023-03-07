import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import '../../../css/SMainComponent.css'

const BoardButton = () => {

  const navigate = useNavigate()

  const goToArchive = () => {
    navigate('/archive')
  }
  const goToExtend = () => {
    navigate('/extend')
  }
  return (
    <div className='stuBoardExtendBtnDiv'>
      <span className='stuBoardDiv hoverHand' onClick={goToArchive}>공유 자료실<br />바로가기</span>
      <span className='stuExtendDiv hoverHand' onClick={goToExtend}>강의실 연장 사용<br />신청하기</span>
    </div>
  )
}

export default BoardButton