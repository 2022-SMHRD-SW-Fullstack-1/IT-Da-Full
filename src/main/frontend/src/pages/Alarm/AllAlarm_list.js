import React, { useState, useEffect } from 'react';
import axios from "axios"
import ListGroup from 'react-bootstrap/ListGroup';


const AllAlarm_list = (props) => {

    const [createdAt, setCreatedAt] = useState(props.item.alarm_dt)

    const displayedAt = (createdAt) => {
        const date = new Date()

        const year = date.getFullYear() - createdAt.substring(0, 4)
        const month = (date.getMonth() + 1) - createdAt.substring(5, 7)
        const day = date.getDate() - createdAt.substring(8, 10)
        const hour = date.getHours() - createdAt.substring(11, 13)
        const minute = date.getMinutes() - createdAt.substring(14, 16)
        const second = date.getSeconds() - createdAt.substring(17, 19)

        if (year != 0)
            return createdAt
        if (month != 0)
            return `${Math.floor(month)}개월 전`
        if (day != 0)
            return `${Math.floor(day)}일 전`
        if (hour != 0)
            return `${Math.floor(hour)}시간 전`
        if (minute != 0)
            return `${Math.floor(minute)}분 전`
        if (second != 0)
            return `${Math.floor(second)}초 전`
    }

    const alarm_delete = () => {
        axios
            .post("/alarm/deleteAlarm",
                {
                    alarm_num: props.item.alarm_num
                })
            .then(function (res) {
                props.setAllAlarm(props.allAlarm.filter(e => e.alarm_num !== props.item.alarm_num))
            })
            .catch(function (error) {
                console.log("error")
            })
    }

    const click = () => {
        console.log("click")
    }


    return (
        <ListGroup.Item>
            <div className='alarm_content'>{props.item.alarm_content}</div>
            <div className='alarm_dt'>{displayedAt(createdAt)}
                <button className='alarm_delete' onClick={alarm_delete}>x</button>
            </div>
        </ListGroup.Item>


    )
}

export default AllAlarm_list