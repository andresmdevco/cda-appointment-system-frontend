import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaCar, FaShieldAlt, FaClock, FaClipboardList } from 'react-icons/fa';
import { MdCalendarToday } from 'react-icons/md';
import './Home.css';

const Home = () => {
  const [tab, setTab] = useState('info');
  const [userName, setUserName] = useState('');

  // Form state
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reservedDates, setReservedDates] = useState([]);

  // Dropdowns
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  // Calendario state
  const [calMonth, setCalMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  useEffect(() => {
    setUserName(localStorage.getItem('user_name') || '');

    axios
      .get('http://localhost:5000/api/appointments/reserved-dates')
      .then((res) =>
        setReservedDates(
          res.data.map((a) => ({
            date: a.date_appointment,
            time: a.time_appointment,
          }))
        )
      )
      .catch((err) => console.error('Error fetching reserved dates:', err));
  }, []);

  // Cerrar dropdowns al click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dateRef.current && !dateRef.current.contains(e.target))
        setShowDatePicker(false);
      if (timeRef.current && !timeRef.current.contains(e.target))
        setShowTimePicker(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ── Helpers calendario ─────────────────────────────
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const formatDateLabel = (dateStr) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    const months = ['enero','febrero','marzo','abril','mayo','junio',
                    'julio','agosto','septiembre','octubre','noviembre','diciembre'];
    return `${parseInt(d)} de ${months[parseInt(m)-1]} de ${y}`;
  };

  const handleDayClick = (day) => {
    const d = new Date(calMonth.getFullYear(), calMonth.getMonth(), day);
    if (d < today) return;
    const iso = d.toLocaleDateString('en-CA');
    setSelectedDate(iso);
    setSelectedTime('');
    setShowDatePicker(false);
  };

  // ── Slots de hora ──────────────────────────────────
  const generateTimes = () => {
    const slots = [];
    for (let hour = 8; hour < 16; hour++) {
      ['00', '30'].forEach((min) => {
        const t = `${hour < 10 ? '0' + hour : hour}:${min}`;
        const occupied = reservedDates.some(
          (d) => d.time === t && d.date === selectedDate
        );
        slots.push({ time: t, available: !occupied });
      });
    }
    return slots;
  };

  const handleTimeSelect = (t) => {
    setSelectedTime(t);
    setShowTimePicker(false);
  };

  // ── Flujo ──────────────────────────────────────────
  const handleContinuar = () => {
    if (!selectedDate || !selectedTime || !nombre || !telefono) {
      alert('Por favor completa todos los campos antes de continuar.');
      return;
    }
    setTab('resumen');
  };

  const handleReservar = async () => {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      alert('No hay usuario identificado. Por favor inicia sesión nuevamente.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/appointments', {
        user_id,
        name: nombre,
        date_appointment: selectedDate,
        time_appointment: selectedTime,
        cel_notification: telefono,
      });

      await axios.post('http://localhost:5000/api/appointments/history', {
        user_id,
        name: nombre,
        cel_notification: telefono,
        date_appointment: selectedDate,
        time_appointment: selectedTime,
        appointment_id: res.data.appointment_id,
      });

      alert('¡Cita agendada correctamente!');
      setTab('info');
      setSelectedDate('');
      setSelectedTime('');
      setNombre('');
      setTelefono('');
    } catch (error) {
      alert(
        'Error al guardar la cita: ' +
          (error.response ? error.response.data.error : error.message)
      );
    }
  };

  // ── Render calendario ──────────────────────────────
  const renderCalendar = () => {
    const year = calMonth.getFullYear();
    const month = calMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const dayNames = ['Do','Lu','Ma','Mi','Ju','Vi','Sá'];

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
      <div className="cal-popup">
        <div className="cal-header">
          <button className="cal-nav" onClick={() =>
            setCalMonth(new Date(year, month - 1, 1))}>‹</button>
          <span>{monthNames[month]} {year}</span>
          <button className="cal-nav" onClick={() =>
            setCalMonth(new Date(year, month + 1, 1))}>›</button>
        </div>
        <div className="cal-grid">
          {dayNames.map((d) => (
            <div key={d} className="cal-day-name">{d}</div>
          ))}
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} />;
            const cellDate = new Date(year, month, day);
            const isPast = cellDate < today;
            const iso = cellDate.toLocaleDateString('en-CA');
            const isSelected = iso === selectedDate;
            return (
              <button
                key={day}
                className={`cal-day ${isPast ? 'cal-day-past' : ''} ${isSelected ? 'cal-day-selected' : ''}`}
                disabled={isPast}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const slots = generateTimes();

  return (
    <div className="home-page">
      {/* ── Panel izquierdo ── */}
      <div className="home-left">
        <div className="home-logo-box">
          <FaCar size={40} />
        </div>
        <div className="home-brand">
          <h2>CDA Pradera</h2>
          <p>Centro de Diagnóstico Automotor</p>
        </div>
        <div className="home-divider" />
        <div className="home-section">
          <h3>Misión</h3>
          <p>
            En CDA Pradera nos dedicamos a la inspección técnico-mecánica de
            vehículos particulares, garantizando que tu vehículo cumpla todas
            las normas de seguridad y circulación.
          </p>
        </div>
        <div className="home-section">
          <h3>El proceso de revisión</h3>
          <ul className="home-features">
            <li><FaClock /><span>Duración: 30 minutos</span></li>
            <li><FaShieldAlt /><span>Inspección exhaustiva y certificada</span></li>
            <li><MdCalendarToday /><span>Agendamiento en línea</span></li>
          </ul>
        </div>
        <button className="home-history-btn" onClick={() => (window.location.href = '/history')}>
          <FaClipboardList />
          Ver historial de citas
        </button>
      </div>

      {/* ── Panel derecho ── */}
      <div className="home-right">
        <div className="home-right-inner">

          {/* Encabezado */}
          <div className="home-right-header">
            <h1 className="home-right-title">Agendar Nueva Cita</h1>
            <p className="home-right-subtitle">Completa los datos para agendar tu cita</p>
            <p className="home-greeting">Hola, <strong>{userName}</strong></p>
          </div>

          {/* Tabs */}
          <div className="home-tabs">
            <button className={tab === 'info' ? 'active' : ''} onClick={() => tab === 'resumen' && setTab('info')}>
              Información de cita
            </button>
            <button className={tab === 'resumen' ? 'active' : ''} disabled>
              Resumen de cita
            </button>
          </div>

          {/* ── Tab: Información ── */}
          {tab === 'info' && (
            <div className="home-panel">

              {/* Nombre */}
              <div className="field">
                <label>Nombre completo</label>
                <input type="text" placeholder="Tu nombre completo"
                  value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>

              {/* Teléfono */}
              <div className="field">
                <label>Teléfono de contacto</label>
                <input type="tel" placeholder="3XX XXX XXXX"
                  value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>

              {/* Fecha */}
              <div className="field" ref={dateRef}>
                <label>Fecha</label>
                <div className="picker-input" onClick={() => { setShowDatePicker(!showDatePicker); setShowTimePicker(false); }}>
                  <span className={selectedDate ? 'picker-value' : 'picker-placeholder'}>
                    {selectedDate ? formatDateLabel(selectedDate) : 'dd/mm/aaaa'}
                  </span>
                  <span className="picker-icon">📅</span>
                </div>
                {showDatePicker && renderCalendar()}
              </div>

              {/* Hora */}
              <div className="field" ref={timeRef}>
                <label>Hora</label>
                <div
                  className={`picker-input ${!selectedDate ? 'picker-disabled' : ''}`}
                  onClick={() => { if (selectedDate) { setShowTimePicker(!showTimePicker); setShowDatePicker(false); } }}
                >
                  <span className={selectedTime ? 'picker-value' : 'picker-placeholder'}>
                    {selectedTime || '--:--'}
                  </span>
                  <span className="picker-icon">🕐</span>
                </div>
                {showTimePicker && (
                  <div className="time-popup">
                    {slots.map(({ time, available }) => (
                      <button
                        key={time}
                        className={`time-option ${!available ? 'time-option-occupied' : ''} ${selectedTime === time ? 'time-option-selected' : ''}`}
                        disabled={!available}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                        {!available && <span className="time-tag">Ocupada</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="home-submit-btn" onClick={handleContinuar}
                disabled={!selectedTime || !nombre || !telefono || !selectedDate}>
                Continuar
              </button>
            </div>
          )}

          {/* ── Tab: Resumen ── */}
          {tab === 'resumen' && (
            <div className="home-panel">
              <div className="summary-card">
                <p className="summary-title">Revisión Técnico-Mecánica</p>
                <div className="summary-rows">
                  <div className="summary-row">
                    <span className="summary-label">Nombre</span>
                    <span className="summary-value">{nombre}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Teléfono</span>
                    <span className="summary-value">{telefono}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Fecha</span>
                    <span className="summary-value">{formatDateLabel(selectedDate)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Hora</span>
                    <span className="summary-value">{selectedTime}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Duración</span>
                    <span className="summary-value">30 minutos</span>
                  </div>
                </div>
              </div>
              <div className="summary-actions">
                <button className="home-back-btn" onClick={() => setTab('info')}>Anterior</button>
                <button className="home-submit-btn" onClick={handleReservar}>Reservar cita</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Home;
