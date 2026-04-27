import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Scheduling.css';
import axios from 'axios';

const Scheduling = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [reservedDates, setReservedDates] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/appointments/reserved-dates')
            .then(response => {
                const formattedData = response.data.map(appointment => ({
                    date: appointment.date_appointment,
                    time: appointment.time_appointment
                }));
                setReservedDates(formattedData);
            })
            .catch(error => console.error('Error fetching reserved dates:', error));
    }, []);

    const generateTimes = () => {
        const startHour = 8;
        const endHour = 16;
        let times = [];
        for (let hour = startHour; hour < endHour; hour++) {
            const fullHour = `${hour < 10 ? '0' + hour : hour}:00`;
            const halfHour = `${hour < 10 ? '0' + hour : hour}:30`;
            times.push({
                time: fullHour,
                available: !reservedDates.some(d => d.time === fullHour && d.date === selectedDate.toLocaleDateString('en-CA')),
                occupiedLabel: reservedDates.some(d => d.time === fullHour && d.date === selectedDate.toLocaleDateString('en-CA')) ? ' - Ocupada' : ''
            });
            times.push({
                time: halfHour,
                available: !reservedDates.some(d => d.time === halfHour && d.date === selectedDate.toLocaleDateString('en-CA')),
                occupiedLabel: reservedDates.some(d => d.time === halfHour && d.date === selectedDate.toLocaleDateString('en-CA')) ? ' - Ocupada' : ''
            });
        }
        return times;
    };

    const availableTimes = generateTimes();

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime('');
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleSubmit = () => {
        localStorage.setItem('selectedDate', selectedDate.toLocaleDateString('en-US'));
        localStorage.setItem('selectedTime', selectedTime);
        window.location.href = '/DataCitation';
    };

    return (
        <div className="scheduling-wrapper">
            <h2>Select the desired date and time</h2>
            <div className="scheduling-content">
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    inline
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    calendarClassName="react-datepicker"
                />
                <div className="time-select">
                    <div className="time-select-container">
                        {availableTimes.map(({ time, available, occupiedLabel }) => (
                            <div
                                key={time}
                                className={`time-slot ${!available ? 'disabled' : ''}`}
                                onClick={() => available && handleTimeChange(time)}
                            >
                                {time}{occupiedLabel}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button onClick={handleSubmit} disabled={!selectedTime}>Next</button>
            </div>
        </div>
    );
};

export default Scheduling;
