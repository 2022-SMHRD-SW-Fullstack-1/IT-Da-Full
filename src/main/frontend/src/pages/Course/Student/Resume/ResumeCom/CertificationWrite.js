import axios from 'axios'
import React, { useState } from 'react'
import uuid from 'react-uuid'
import btnAdd from '../../../../../asset/img/btn_add.png'
import btnDelete from '../../../../../asset/img/btn_delete.png'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}
const CertificationWrite = ({ certification, setCertification }) => {
    const [inputs, setInputs] = useState({
        cert_num: uuid(),
        cert_org: '',
        cert_name: '',
        cert_dt: '',
    })
    //newCareer에 담을 수 있게 input값을 선언
    const { cert_num, cert_org, cert_name, cert_dt } = inputs

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const addCertification = () => {
        const newCertification = {
            cert_num,
            cert_org,
            cert_name,
            cert_dt,
        }
        if ((cert_org == '') || (cert_name == '') || (cert_dt == '')) {
            alert('입력란을 채워 주세요')
        }else if (window.confirm("데이터를 추가하시겠습니까?")) {
            axios
                .post('/student/certification/add', {
                    cert_org: inputs.cert_org,
                    cert_name: inputs.cert_name,
                    cert_dt: inputs.cert_dt,
                    id: sessionStorage.getItem("loginId")
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((e) => console.log(e));
            setCertification(certification.concat(newCertification))
            setInputs({
                cert_num: uuid(),
                cert_org: '',
                cert_name: '',
                cert_dt: '',
            })
        }
    }
    const onRemove = (cert_num,cert_org,cert_name,cert_dt) => {
        if (window.confirm("데이터를 삭제하시겠습니까? 되돌릴 수 없습니다")) {
        // new.num 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
        // = new.num 가 num 인 것을 제거함
        setCertification(certification.filter(newCertification => newCertification.cert_num !== cert_num))
        axios
            .post('/student/certification/delete', {
                cert_org:cert_org,
                cert_name:cert_name,
                cert_dt:cert_dt,
                id: sessionStorage.getItem("loginId")
            })
            .then((res) => {
                console.log(res)
            })
            .catch((e) => console.log(e));
        }
    }
    const onDragEnd = result => {
        if (!result.destination) {
            return
        }
        setCertification(items => reorder(items, result.source.index, result.destination.index))
        axios
        .post('/student/certification/idx', {
            certification: reorder(certification,result.source.index, result.destination.index),
            id: sessionStorage.getItem("loginId")
        })
        .then((res) => {
            console.log(res)
        })
        .catch((e) => console.log(e));
        console.log(certification)
    }

    const onDragUpdate = update => {
        if (!update.destination) {
            return
        }
    }

    const dnd = <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <tbody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {certification.map((certification, index) => (
                        <Draggable key={certification.cert_num} draggableId={"item-"+certification.cert_num} index={index}>
                            {(provided, snapshot) => (
                                <tr onClick={(e) => console.log(index)}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                            <td><p>{certification.cert_name}</p></td>
                            <td><p>{certification.cert_org}</p></td>
                            <td><p>{certification.cert_dt.replace(/-/g,'.')} </p></td>
                            <td>
                                <div className='sRBtnDiv'>
                                <button onClick={() => onRemove(certification.cert_num,certification.cert_org,certification.cert_name,certification.cert_dt)} className="resumeBtn">삭제</button>
                                    </div></td>
                                </tr>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </tbody>
            )}
        </Droppable>
    </DragDropContext>

    return (
        <div className='resumeDiv'>
            <p className='sRTitle'>자격증</p>
            <table className='resumeTable'>
                <thead>
                    <tr>
                        <th>자격증명</th>
                        <th>발급기관</th>
                        <th>발급일자</th>
                        <th></th>
                    </tr>
                </thead>
                {dnd}
                <tbody>
                    <tr>
                        <td><input type='text' name='cert_name' onChange={onChange} value={inputs.cert_name} /></td>
                        <td><input type='text' name='cert_org' onChange={onChange} value={inputs.cert_org} /></td>
                        <td><input type='date' className='dateInput' name='cert_dt' onChange={onChange} value={inputs.cert_dt} /></td>
                        <td>
                        <div><button className="resumeBtn" onClick={addCertification}>추가</button></div></td>
                    </tr>
                </tbody>
            </table>
          
        </div>
    )
}

export default CertificationWrite