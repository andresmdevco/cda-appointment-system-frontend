import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCar, FaArrowLeft, FaClipboardList } from 'react-icons/fa';
import { MdCalendarToday, MdVerifiedUser, MdAccessTime } from 'react-icons/md';
import './History.css';

const History = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      axios
        .get(`http://localhost:5000/api/appointments/history/${user_id}`)
        .then((res) => setAppointments(res.data))
        .catch((err) => console.error('Error fetching appointments:', err));
    }
  }, []);

  return (
    <div className="history-page">
      {/* ── Panel izquierdo ── */}
      <div className="history-left">
        <div className="history-logo-box">
          <FaCar size={40} />
        </div>

        <div className="history-brand">
          <h2>CDA Pradera</h2>
          <p>Centro de Diagnóstico Automotor</p>
        </div>

        <div className="history-divider" />

        <ul className="history-features">
          <li><MdCalendarToday /><span>Agendamiento en línea</span></li>
          <li><MdVerifiedUser /><span>Proceso certificado</span></li>
          <li><MdAccessTime /><span>Atención oportuna</span></li>
        </ul>

        <button
          className="history-back-btn"
          onClick={() => (window.location.href = '/home')}
        >
          <FaArrowLeft />
          Volver al inicio
        </button>
      </div>

      {/* ── Panel derecho ── */}
      <div className="history-right">
        <div className="history-header">
          <FaClipboardList size={22} />
          <h1>Historial de citas</h1>
        </div>

        {appointments.length === 0 ? (
          <div className="history-empty">
            <p>Aún no tienes citas agendadas.</p>
          </div>
        ) : (
          <div className="history-table-wrap">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.date_appointment}</td>
                    <td>{a.time_appointment}</td>
                    <td>{a.cel_notification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
