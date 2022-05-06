import { data } from 'jquery'
import React, { useEffect, useMemo, useState } from 'react'
import $ from 'jquery'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const axios = require('axios').default;


const Main = () => {

    const onSubmit = e => {
        if (event !== "Событие" && event !== "Дело") {
            e.preventDefault();
            alert('Ошибка')
        } else {
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

            setEvent('Выберите событие');
            setDiscription('');
        }
    }

    const [event, setEvent] = useState('Выберите событие');
    const [discription, setDiscription] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString("ru-RU").toString());
    const [isDate, setisDate] = useState(new Date().toLocaleDateString("ru-RU").toString());
    const [task, setTask] = useState([]);
    const [value, onChange] = useState(new Date());
    const [asd, setAsd] = useState([task]);

    const [putEvent, setPutEvent] = useState();
    const [putDisription, setPutDisription] = useState('');


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
                <select
                    className='calendar__select'
                    value={event}
                    onChange={e => setEvent(e.target.value)}

                >
                    <option disabled>Выберите событие</option>
                    <option>Событие</option>
                    <option>Дело</option>
                </select>

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
                                    'event': putEvent,
                                    'discription': putDisription,
                                    'date': value.toLocaleDateString("ru-RU")
                                })

                                for (let index = 0; index < 2; index++) {
                                    axios.get('http://localhost:3002/users/' + task.date)
                                        .then(function (res) { setTask(res.data); console.log(task); })
                                }
                                setPutEvent('');
                                setPutDisription('');

                            }}
                        > Изменить </button>

                        <select
                            className='calendar__select'
                            value={task.event}
                            onChange={(e, value) => { value = { value }; setPutEvent(e.target.value) }}

                        >
                            <option>Событие</option>
                            <option>Дело</option>
                        </select>
                        <input type="text" placeholder={task.discription}
                            value={putDisription} onChange={(e) => setPutDisription(e.target.value)} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Main