import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RiStarLine } from "react-icons/ri";
import { RiStarFill } from "react-icons/ri";
import axios from 'axios';

const M_company_list = (props) => {

    
 
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

    const onChange = (e) => {
        const { name, value} = e.target
        setCompany({
            ...company,
            [name]: value,
        })
    }

    const [edit_style_po, setEdit_style_po] = useState({ display: "" })
    const [edit_style_op, setEdit_style_op] = useState({ display: "none" })
    const [bookmark_count, setBookmark_count]=useState()
    // 과정수정
    const edit_company_submit = (e) => {
        e.preventDefault();
        if (window.confirm("수정하시겠습니까?")) {
            axios
                .post("/enterprise/edit_company", {
                    company_num: props.item.company_num,
                    company_deadline: company.company_deadline,
                    company_area: company.company_area,
                    company_employ: company.company_employ,
                    company_grade: company.company_grade,
                    company_position: company.company_position,
                    company_qual: company.company_qual,
                    company_essential: company.company_essential,
                    company_advantage: company.company_advantage,
                    company_etc: company.company_etc,
                    company_salary: company.company_salary,
                    company_apply: company.company_apply,
                }).then(function (res) {
                    alert("수정완료")
                    console.log(props.item.company_num)
                    window.location.reload()
                }).catch(function (err) {
                    console.log("실패")
                })
        } else {
            alert("수정취소");
        }
    }

    // 기업 삭제
    const delete_company_submit = (e) => {
        e.preventDefault();
        if (window.confirm("삭제하시겠습니까?")) {
            axios
                .post("/enterprise/delete_company", {
                    company_num: props.item.company_num,
                }).then(function (res) {
                    alert("삭제완료")
                    window.location.reload();
                }).catch(function (err) {
                    console.log("실패")
                })
        } else {
            alert("삭제취소");
        }
    }

    // 수정 클릭 시
    const edit_company_button = () => {
        setEdit_style_po({ display: "none" })
        setEdit_style_op({ display: "" })
    }

    const edit_e_company_quit = () => {
        setEdit_style_po({ display: "" })
        setEdit_style_op({ display: "none" })
    }

   
    //찜하기 버튼
  const onHandleBookmark = (e) => {
    //북마크 여부 확인용
    console.log(props.bookmarkList.includes(company.company_num.toString()));
    if (props.bookmarkList.includes(company.company_num.toString())) {
      // bookmark가 체크 되어있을때 => bookmark 삭제
      var company_num = company.company_num.toString();
      props.setBookmarkList(props.bookmarkList.filter((e) => e !== company_num.toString()));
      
      setCompany((prevState)=>({
        ...prevState,
        company_count: prevState.company_count-1
      }))
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
      setCompany((prevState)=>({
        ...prevState,
        company_count: prevState.company_count+1
      }))
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
        <tr className="company_container">

                
             {window.sessionStorage.getItem("role")==="s"&&(props.bookmarkList.includes(company.company_num.toString()) ?
              <td  company_num={company.company_num} onClick={onHandleBookmark}><span ><RiStarFill /></span><p >{company.company_count}</p></td> :
               <td  company_num={company.company_num} onClick={onHandleBookmark}><span ><RiStarLine /></span><p >{company.company_count}</p></td>)}
            
            
            <td className='company_name'>{props.item.company_name} </td>

            <td className='company_register'>
                
                {props.item.company_register} 
                </td>

            <td style={edit_style_po} className='company_deadline'>{company.company_deadline} </td>
            <td style={edit_style_op} className='company_deadline'><input type='text' value={company.company_deadline} onChange={onChange} name="company_deadline"></input></td>

            
            <td className="company_outer">
                
                {(company.company_area!==''||edit_style_op.display==='') &&
                
                <div>
                    
                    <div>지역</div>
                    <div style={edit_style_po} className=''>{props.item.company_area} </div>
                    <div style={edit_style_op} className=''><input type='text' value={company.company_area} onChange={onChange} name="company_area"></input></div>
                </div>}
                {(company.company_employ!==''||edit_style_op.display==='') &&
                <div>
                    <div>고용형태</div>
                    <div style={edit_style_po} className=''>{props.item.company_employ} </div>
                    <div style={edit_style_op} className=''><input type='text' value={company.company_employ} onChange={onChange} name="company_employ"></input></div>
                </div>}
                {(company.company_grade!==''||edit_style_op.display==='') &&
                <div>
                    <div>학력</div>
                    <div style={edit_style_po} className=''>{props.item.company_grade} </div>
                    <div style={edit_style_op} className=''><input type='text' value={company.company_grade} onChange={onChange} name="company_grade"></input></div>
                </div>}
                {(company.company_position!==''||edit_style_op.display==='') &&
                <div>
                    <div>직무</div>
                    <div style={edit_style_po} className=''>{props.item.company_position} </div>
                    <div style={edit_style_op} className=''><input type='text' value={company.company_position} onChange={onChange} name="company_position"></input></div>
                </div>}
                {(company.company_qual!==''||edit_style_op.display==='') &&
                <div>
                    <div>자격</div>
                    <div style={edit_style_po} className=''>{props.item.company_qual} </div>
                    <div style={edit_style_op} className=''><input type='text' value={company.company_qual} onChange={onChange} name="company_qual"></input></div>
                </div>}
                {(company.company_essential!==''||edit_style_op.display==='') &&
                <div>
                    <div>필수요건</div>
                    <div style={edit_style_po} className=''>{props.item.company_essential} </div>
                    <div style={edit_style_op} className=''><input type='text' value={company.company_essential} onChange={onChange} name="company_essential"></input></div>
                </div>}
                {(company.company_advantage!==''||edit_style_op.display==='') &&
                <div>
                    <div>우대</div>
                    <div style={edit_style_po} className=''>{props.item.company_advantage} </div>
                    <div style={edit_style_op} className=''><input type='text' value={company.company_advantage} onChange={onChange} name="company_advantage"></input></div>
                </div>}
                {(company.company_etc!==''||edit_style_op.display==='') &&
                <div>
                    <div>특이사항</div>
                    <div style={edit_style_po} className=''>{props.item.company_etc} </div>
                    <div style={edit_style_op} className=''><input type='text' value={company.company_etc} onChange={onChange} name="company_etc"></input></div>
                </div>}
                {(company.company_salary!==''||edit_style_op.display==='') &&
                <div>
                    <div>급여</div>
                    <div style={edit_style_po} className=''>{props.item.company_salary} </div>
                    <div style={edit_style_op} className=''><input type='text' value={company.company_salary} onChange={onChange} name="company_salary"></input></div>
                </div>}
                {(company.company_apply!==''||edit_style_op.display==='') &&
                <div>
                    <div>지원방법</div>
                    <div style={edit_style_po} className=''>{props.item.company_apply} </div>
                    <div style={edit_style_op} className=''><input type='text' value={company.company_apply} onChange={onChange} name="company_apply"></input></div>
                </div>}
            </td>
            {(window.sessionStorage.getItem('role')==='a' || window.sessionStorage.getItem('role')==='e')&&
            <td className='course_button' style={edit_style_po}>
                <div className='content annViewButton'>
                    <button onClick={edit_company_button}>수정</button>
                    <button onClick={delete_company_submit}>삭제</button>
            </div></td>}
            {(window.sessionStorage.getItem('role')==='a' || window.sessionStorage.getItem('role')==='e')&&
            <td className='course_button' style={edit_style_op}>
                <div className='content annViewButton'>
                    <button onClick={edit_company_submit}>완료</button>
                    <button onClick={edit_e_company_quit}>취소</button>
            </div></td>}

        </tr>
    )
}

export default M_company_list