import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import M_company_list from '../Manager/company/M_company_list'

const E_select_company = (props) => {

  const [company, setCompany] = useState([])

  useEffect(() => {
    axios
      .get("/enterprise/select_one_company", {
        params: {
          company_name: window.sessionStorage.getItem("userName")
        }
      })
      .then(function (res) {
        setCompany(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const companyList =
    company.map((item) => <M_company_list item={item} key={item.company_name} />)

  const navigate = useNavigate()
  const goToWrite = () => {
    navigate('/make_company')
  }

  return (
    <div className='container'>
      <p>기업 공고<button onClick={goToWrite} className='recruitBtn'>새 공고 생성</button></p>
      <div className='content'>
        <table style={{ minWidth: '80rem' }}>
          <thead>
            <tr>
              <th>등록일</th>
              <th>기업명</th>
              <th>마감일</th>
              <th>구인정보</th>
            </tr>
          </thead>
          <tbody>
            {companyList}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default E_select_company