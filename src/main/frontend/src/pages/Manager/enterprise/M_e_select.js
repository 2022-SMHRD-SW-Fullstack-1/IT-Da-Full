import React, { useEffect, useState } from 'react'
import axios from "axios"
import M_e_list from './M_e_list'

const M_e_select = () => {

    const [enter, setEnter] = useState([])


    useEffect(() => {
        axios
            .get("/enterprise/select_enterprise")
            .then(function (res) {
                setEnter(res.data)
                console.log(res.data)
            })
            .catch(function (error) {
                console.log("error")
            })
    }, [])

    const enterList =
    enter.map((item) => <M_e_list item={item} key={item.enter_num} />)


  return (
        <div className='container'>
        <p>기업 관리</p>
             <div className='content'>
                    <table style={{ minWidth: '80rem' }}>
                        <thead>
                            <tr>
                                <th>기업명</th>
                                <th>아이디</th>
                                <th>패스워드</th>
                                <th>대표</th>
                                <th>연락처</th>
                                <th>주소</th>
                                <th>사업자번호</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {enterList}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default M_e_select