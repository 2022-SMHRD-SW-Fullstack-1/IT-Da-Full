import axios from 'axios';
import React, { useState } from "react";
import uuid from 'react-uuid'

const Wish_fieldWrite = ({ wish_field, setWishField }) => {
    const [inputWishField, setWishFieldInput] = useState({
        field_num: uuid().replace(/-/g, '/').toUpperCase(),
        wish_field_name: ''
    })
    const { field_num, wish_field_name } = inputWishField
    const addWishField = () => {
        const newWishField = {
            field_num,
            wish_field_name,
        }

        if ((wish_field_name == '')) {
            alert('입력란을 채워 주세요')
        } else if (window.confirm("데이터를 추가하시겠습니까?")) {
            axios
                .post('/student/wish_field/add', {
                    field_num: inputWishField.field_num,
                    wish_field_name: inputWishField.wish_field_name,
                    id: sessionStorage.getItem("loginId")
                })
                .then((res) => {
                    axios
                    .post('/student/wish_field/update',{
                        wish_field:wish_field.concat(newWishField),
                        id: sessionStorage.getItem("loginId")
                    })
                })
                .catch((e) => console.log(e));
            setWishField(wish_field.concat(newWishField))
            setWishFieldInput({
                field_num: uuid().replace(/-/g, '/').toUpperCase(),
                wish_field_name: ''
            })
        }
    }
    const onRemoveField = (field_num, wish_field_name) => {
        // new.num 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
        // = new.num 가 num 인 것을 제거함
        console.log(wish_field_name)

        if (window.confirm("데이터를 삭제하시겠습니까? 되돌릴 수 없습니다")) {
            setWishField(wish_field.filter(newWishField => (newWishField.field_num != field_num)))
            axios
                .post('/student/wish_field/delete', {
                    field_num: field_num,
                    wish_field_name: wish_field_name,
                    id: sessionStorage.getItem("loginId")
                })
                .then((res) => {
                    axios
                    .post('/student/wish_field/update',{
                        wish_field:wish_field.filter(newWishField => (newWishField.field_num != field_num)),
                        id: sessionStorage.getItem("loginId")
                    })
                })
                .catch((e) => console.log(e));
        }
    }

    return (
        <div className='resumeDiv' id='smallTable'>
            <p className='sRTitle'>희망분야</p> 
            <table className='resumeTable'>
                <thead>
                    <tr>
                        <td>
                            {wish_field.map((wish_field, idx) => (
                                <button key={idx} className='textBtn' onClick={() => onRemoveField(wish_field.field_num, wish_field.wish_field_name)}>
                                    <span>{wish_field.wish_field_name}</span>
                                    <span> X</span>
                                </button>
                            ))}
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <input type='text' name='wish_field_name' onChange={(e) => setWishFieldInput({ ...inputWishField, wish_field_name: e.target.value })}
                            value={inputWishField.wish_field_name} />
             <button className="resumeBtn" onClick={addWishField}>추가</button>
                        </td>
                    </tr>
                </thead>
            </table>
           
        </div>
    )
}

export default Wish_fieldWrite