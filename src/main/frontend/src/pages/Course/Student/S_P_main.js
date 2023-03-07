import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../css/Course.css'
const S_P_main = () => {
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState([])
  const goToDetail = (e) => {
    console.log(e.currentTarget.getAttribute('portfolio_title'))
    navigate('./detail', {state: {
      portfolio_num: e.currentTarget.getAttribute('portfolio_num'),
      portfolio_title: e.currentTarget.getAttribute('portfolio_title'),
      portfolio_period: e.currentTarget.getAttribute('portfolio_period'),
      portfolio_etc: e.currentTarget.getAttribute('portfolio_etc'),
      portfolio_img1: e.currentTarget.getAttribute('portfolio_img1'),
      portfolio_img2: e.currentTarget.getAttribute('portfolio_img2'),
      portfolio_img3: e.currentTarget.getAttribute('portfolio_img3'),
      portfolio_content: e.currentTarget.getAttribute('portfolio_content'),
      portfolio_stack_front: e.currentTarget.getAttribute('portfolio_stack_front'),
      portfolio_stack_back: e.currentTarget.getAttribute('portfolio_stack_back'),
      portfolio_stack_db: e.currentTarget.getAttribute('portfolio_stack_db'),
      portfolio_url: e.currentTarget.getAttribute('portfolio_url'),
      portfolio_file: e.currentTarget.getAttribute('portfolio_file')
    }})
  }
  const goToWrite = () => {
    navigate('/portfolio/write', { state:
      {
        title:'작성'
      } })
  }
  //데이터 가져오기
  useEffect(() => {
    axios
      .get("/student/portfolio", {
        params: { id: sessionStorage.getItem("loginId") },
      })
      .then((res) => {
        console.log(res.data);
        setPortfolio(res.data);
      })
      .catch((e) => console.error(e));
  }, []);
  //받아온 데이터를 map을 활용해 화면에 뿌리는 코드
  const bodyContent = portfolio.map((portfolio, idx) => (
    <tr key={idx}>
      <td>{idx+1}</td>
      <td className='hoverHand' onClick={goToDetail}
      portfolio_num= {portfolio.portfolio_num}
      portfolio_title= {portfolio.portfolio_title}
      portfolio_period= {portfolio.portfolio_period}
      portfolio_etc= {portfolio.portfolio_etc}
      portfolio_img1= {portfolio.portfolio_img1}
      portfolio_img2= {portfolio.portfolio_img2}
      portfolio_img3= {portfolio.portfolio_img3}
      portfolio_content= {portfolio.portfolio_content}
      portfolio_stack_front= {portfolio.portfolio_stack_front}
      portfolio_stack_back= {portfolio.portfolio_stack_back}
      portfolio_stack_db= {portfolio.portfolio_stack_db}
      portfolio_url= {portfolio.portfolio_url}
      portfolio_file= {portfolio.portfolio_file}
      >{portfolio.portfolio_title}</td>
      <td>{portfolio.portfolio_dt}</td>
    </tr>))
    return (
        <div className='container'>
            <p>포트폴리오</p>
            <div className='content'>
                <table>
                    <thead>
                        <tr>
                            <td>No.</td>
                            <td>제목</td>
                            <td>작성일</td>
                        </tr>
                    </thead>
                    <tbody>
                        {bodyContent}
                    </tbody>
                </table>
                    <div className='annWriteButton'>
                        <button onClick={goToWrite}>작성하기</button>
                    </div>
            </div>
        </div>
    )
}
export default S_P_main