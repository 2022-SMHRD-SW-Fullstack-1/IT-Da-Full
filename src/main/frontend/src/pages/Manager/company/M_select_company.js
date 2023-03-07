import React, { useEffect, useState } from 'react'
import axios from "axios"
import M_company_list from "./M_company_list"

const M_select_company = (props) => {

    const [company, setCompany] = useState([])
    useEffect(() => {
        axios
            .get("/enterprise/select_company")
            .then(function (res) {
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
        //newCompany에서 필터링 내용이 포함된 리스트로 구성
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
    const companyList =
        newCompany.map((item) => <M_company_list item={item} key={item.company_name} />)

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
                <table style={{ minWidth: '80rem' }}>
                    <thead>
                        <tr>
                            <th>기업명</th>
                            <th>등록일</th>
                            <th>마감일</th>
                            <th>구인정보</th>
                            <th></th>
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

export default M_select_company