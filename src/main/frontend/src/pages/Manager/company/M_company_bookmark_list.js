import React, { useEffect, useState, useRef } from 'react'

import { RiStarLine } from "react-icons/ri";
import { RiStarFill } from "react-icons/ri";
import axios from 'axios';

const M_company_bookmark_list = (props) => {

    
    const [company, setCompany] = useState({
        company_num : props.item.company_num + "",
        company_deadline: props.item.company_deadline,
        company_area: props.item.company_area,
        company_employ: props.item.company_employ,
        company_grade: props.item.company_grade,
        company_position: props.item.company_position,
        company_qual: props.item.company_qual,
        company_essential: props.item.company_essential,
        company_advantage: props.item.company_advantage,
        company_etc: props.item.company_etc,
        company_salary: props.item.company_salary,
        company_apply: props.item.company_apply,
        company_count: props.item.company_count
    })

   
    //찜하기 버튼
  const onHandleBookmark = (e) => {
    //북마크 여부 확인용
    console.log(props.bookmarkList.includes(company.company_num.toString()));
    if (props.bookmarkList.includes(company.company_num.toString())) {
      // bookmark가 체크 되어있을때 => bookmark 삭제
      var company_num = company.company_num.toString();
      props.setBookmarkList(props.bookmarkList.filter((e) => e !== company_num.toString()));
      axios
        .post("/bookmark/delete_bookmark_company", {
          mb_id: window.sessionStorage.getItem("loginId"),
          company_num: company.company_num,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // bookmark가 체크 안되어있을때 => bookmark 추가
      props.setBookmarkList([
        ...props.bookmarkList,
        company.company_num,
      ]);
      console.log(company.company_num)
      axios
        .post("/bookmark/add_bookmark_company", {
          mb_id: window.sessionStorage.getItem("loginId"),
          company_num: company.company_num,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  

    return (
            
                props.bookmarkList.includes(company.company_num.toString())?
        <tr className="company_container">


                
             {window.sessionStorage.getItem("role")==="s"&&(props.bookmarkList.includes(company.company_num.toString()) ?
              <td company_num={company.company_num} onClick={onHandleBookmark}><RiStarFill /><p>{company.company_count}</p></td> : 
              <td company_num={company.company_num} onClick={onHandleBookmark}><RiStarLine /></td>)}
            
            
            <td className='company_register'> {props.item.company_register}  </td>

            <td className='company_name'>{props.item.company_name} </td>

            <td className='company_deadline'>{props.item.company_deadline} </td>
            
            <td className="company_outer">
 {(company.company_area!=='') &&                
                <div>
                    <div>지역</div>
                    <div className=''>{props.item.company_area} </div>
                </div>}
                {(company.company_employ!=='') &&
                <div>
                    <div>고용형태</div>
                    <div className=''>{props.item.company_employ} </div>
                </div>}
                {(company.company_grade!=='') &&
                <div>
                    <div>학력</div>
                    <div className=''>{props.item.company_grade} </div>
                </div>}
                {(company.company_position!=='') &&
                <div>
                    <div>직무</div>
                    <div className=''>{props.item.company_position} </div>
                </div>}
                {(company.company_qual!=='') &&
                <div>
                    <div>자격</div>
                    <div className=''>{props.item.company_qual} </div>
                </div>}
                {(company.company_essential!=='') &&
                <div>
                    <div>필수요건</div>
                    <div className=''>{props.item.company_essential} </div>
                </div>}
                {(company.company_advantage!=='') &&
                <div>
                    <div>우대</div>
                    <div className=''>{props.item.company_advantage} </div>
                </div>}
                {(company.company_etc!=='') &&
                <div>
                    <div>특이사항</div>
                    <div className=''>{props.item.company_etc} </div>
                </div>}
                {(company.company_salary!=='') &&
                <div>
                    <div>급여</div>
                    <div className=''>{props.item.company_salary} </div>
                </div>}
                {(company.company_apply!=='') &&
                <div>
                    <div>지원방법</div>
                    <div className=''>{props.item.company_apply} </div>
                </div>}
            </td>
        </tr>:<></>
    )
}

export default M_company_bookmark_list