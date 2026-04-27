import React, { useState, useEffect } from 'react';
import './DataCitation.css';
import axios from 'axios';

const DataCitation = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
    });
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');

    useEffect(() => {
        const loadedDate = localStorage.getItem('selectedDate');
        const loadedTime = localStorage.getItem('selectedTime');
        if (loadedDate && loadedTime) {
            const dateObject = new Date(loadedDate);
            setAppointmentDate(dateObject.toISOString().split('T')[0]);
            setAppointmentTime(loadedTime);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
            alert('There is no identified user. Please log in again.');
            return;
        }

        try {
            // Creacion de  la cita
            const response = await axios.post('http://localhost:5000/api/appointments', {
                user_id: user_id,
                name: formData.nombre,
                date_appointment: appointmentDate,
                time_appointment: appointmentTime,
                cel_notification: formData.telefono
            });

            localStorage.setItem('appointment_id', response.data.appointment_id);

            // Registro de la cita en el historial
            const historyresponse = await axios.post('http://localhost:5000/api/appointments/history', {
                user_id: user_id,
                name: formData.nombre,
                cel_notification: formData.telefono,
                date_appointment: appointmentDate,
                time_appointment: appointmentTime,
                appointment_id: response.data.appointment_id 
            });

            alert('Appointment successfully recorded');
            window.location.href = '/home'; 
        } catch (error) {
            console.error(error);
            alert('Error while saving the appointment: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    return (
        <div className="data-citation-wrapper">
            <h2>Confirmation of data</h2>
            <div className="content">
                <div className="form-section">
                    <input type="text" placeholder="Name" name="nombre" value={formData.nombre} onChange={handleChange} />
                    <input type="text" placeholder="Cell phone" name="telefono" value={formData.telefono} onChange={handleChange} />
                </div>
                <div className="appointment-details">
                    <p><strong>It is scheduled:</strong> Technical-mechanical review</p>
                    <p><strong>Date:</strong> {appointmentDate}</p>
                    <p><strong>Time:</strong> {appointmentTime}</p>
                </div>
            </div>
            <div className="buttons">
                <button type="button" onClick={() => window.location.href = '/scheduling'}>Back</button>
                <button type="submit" onClick={handleSubmit}>Finish</button>
            </div>
        </div>
    );
};

export default DataCitation;
