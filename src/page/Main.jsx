import { data } from 'jquery'
import React, { useEffect, useMemo, useState } from 'react'
import $ from 'jquery'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const axios = require('axios').default;


const Main = () => {

    const onSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:3002/users', {
            'event': event.toString(),
            'discription': discription.toString(),
            'date': date.toString(),
        });

        for (let index = 0; index < 2; index++) {
            axios.get('http://localhost:3002/users/' + value.toLocaleDateString("ru-RU"))
                .then(function (res) { setTask(res.data); console.log(task); })
        }
    }

    const [event, setEvent] = useState('');
    const [discription, setDiscription] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString("ru-RU").toString());
    const [isDate, setisDate] = useState(new Date().toLocaleDateString("ru-RU").toString());
    const [task, setTask] = useState([]);
    const [value, onChange] = useState(new Date());
    const [asd, setAsd] = useState([task]);


    React.useEffect(() => {
        axios.get('http://localhost:3002/users/' + isDate.toString())
            .then(function (res) { setTask(res.data); })

    }, [])

    return (
        <>
            <button>as</button>
            <Calendar
                onChange={onChange}
                onClickDay={value => {
                    setisDate(value.toLocaleDateString("ru-RU"))
                    setDate(value.toLocaleDateString("ru-RU"))
                    const datenow = value.toLocaleDateString("ru-RU")
                    console.log(datenow);
                    axios.get('http://localhost:3002/users/' + datenow)
                        .then(function (res) { setTask(res.data); console.log(task); })
                }
                }
                value={value}


            />
            <form action="http://localhost:3002/users" method="post" onSubmit={onSubmit}>
                <label htmlFor="event">Событие</label>
                <input
                    type="text"
                    name="event"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                />

                <label htmlFor="discription">Описание</label>
                <input
                    type="text"
                    name="discription"
                    value={discription}
                    onChange={(e) => setDiscription(e.target.value)}
                />

                <label htmlFor="date">Дата</label>
                <input
                    type="text"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input type="submit" />
            </form>

            {
                /*  <label htmlFor="date">Дата</label>
                <input
                    type="text"
                    name="date"
                    value={isDate}
                    onChange={(e) => setisDate(e.target.value)}
                />
                <button>Отобразить</button>
                */
            }

            <div>
                {task.map((task, index) =>
                    <div key={task.id} style={{ display: "flex" }} className="as">
                        <div>{task.event}:</div>
                        <div style={{ marginLeft: '10px' }}>
                            {task.discription}
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                            {task.date}
                        </div>
                        <button
                            className='bts'
                            onClick={(e) => {
                                axios.delete('http://localhost:3002/users/' + task.id.toString());
                                for (let index = 0; index < 2; index++) {
                                    axios.get('http://localhost:3002/users/' + task.date)
                                        .then(function (res) { setTask(res.data); console.log(task); })

                                }
                            }}
                        >Удалить данные</button>
                        <button
                            onClick={(e) => {
                                axios.put('http://localhost:3002/users/' + task.id.toString(), {
                                    'event': task.event,
                                    'discription': task.discription,
                                    'date': task.date
                                })
                            }}
                        > Изменить </button>
                        <input type="text" placeholder={task.event} />
                        <input type="text" placeholder={task.discription} />
                        <input type="text" placeholder={task.date} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Main