import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css';

const History = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const user_id = localStorage.getItem('user_id');
            if (user_id) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/appointments/history/${user_id}`);
                    setAppointments(response.data);
                } catch (error) {
                    console.error('Error fetching appointments:', error);
                }
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="history-wrapper">
            <h1>History of scheduled appointments</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Cell phone</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.name}</td>
                            <td>{appointment.date_appointment}</td>
                            <td>{appointment.time_appointment}</td>
                            <td>{appointment.cel_notification}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default History;
