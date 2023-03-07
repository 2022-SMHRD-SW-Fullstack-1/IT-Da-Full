import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../../css/Course.css'
import M_company_list from "../../Manager/company/M_company_list";

const S_C_main = () => {
  
    const [bookmarkList, setBookmarkList] = useState([])
    //수료생 누구를 북마크했는지 정보
  
  const [company, setCompany] = useState([])
  useEffect(() => {
      axios
          .get("/enterprise/select_company")
          .then(function (res) {
                console.log(res.data)
              setCompany(res.data)
              setNewCompany(res.data)
          })
          .catch(function (error) {
              console.log("error")
          })
  }, [])  
      //필터기능
      const onFilter = (f_company_name, f_company_area, f_company_position, f_company_salary) => {
        console.log("필터내용", filter)
        //newCourse리스트를 course에서 필터링 내용이 포함된 리스트로 구성
        //지역, 직무, 급여, 이름
        setNewCompany(company.filter(company =>
            company.company_name.includes(f_company_name) &&
            company.company_area.includes(f_company_area) &&
            company.company_position.includes(f_company_position)&&
            company.company_salary.includes(f_company_salary) 
            ))
    }
      //필터input 태그 함수
      const onChange = e => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value
        })
    }
    //필터관련 변수
    const [filter, setFilter] = useState({
        f_company_name: '',
        f_company_area: '',
        f_company_position: '',
        f_company_salary: '',
    })

  const { f_company_name, f_company_area, f_company_position, f_company_salary } = filter

  const [newCompany, setNewCompany] = useState([{
    }])


    useEffect(() => {
        axios
          .get("/bookmark/select_bookmark_company", {
            params: { mb_id: window.sessionStorage.getItem("loginId") },
          })
          .then((res) => {
            console.log("",res.data);
            setBookmarkList(res.data.bookmark_company);
            // setMember_info(res.data.member);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, []);


  const companyList =
    newCompany.map((item) => <M_company_list setBookmarkList={setBookmarkList} bookmarkList={bookmarkList} item={item} key={item.company_num}/>)

  return (
      <div className='container'>
          <p>기업 공고</p>
          <div className="filter_input_div">
                <div><input type='text' name='f_company_name' placeholder='기업명으로 검색하기' onChange={onChange} /></div>
                <div><input type='text' name='f_company_area' placeholder='지역으로 검색하기' onChange={onChange} /></div>
                <div><input type='text' name='f_company_position' placeholder='희망지역으로 검색하기' onChange={onChange} /></div>
                <div><input type='text' name='f_company_salary' placeholder='급여로 검색하기' onChange={onChange} /></div>
                <div><button onClick={() => onFilter(f_company_name, f_company_area, f_company_position, f_company_salary)}>검색</button></div>
            </div>
          <div className='content'>
              <table style={{minWidth: '80rem'}}>
                  <thead>
                      <tr>
                          <th className="comapny_bookmark_th"></th>
                          <th>기업명</th>
                          <th>등록일</th>
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

export default S_C_main;
