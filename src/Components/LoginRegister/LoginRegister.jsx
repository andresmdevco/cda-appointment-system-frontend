import React, { useState } from "react";
import axios from "axios";
import "./LoginRegister.css";
import { FaUser, FaLock, FaEnvelope, FaCar } from "react-icons/fa";
import { MdCalendarToday, MdVerifiedUser, MdAccessTime } from "react-icons/md";

const LoginRegister = () => {
    const [tab, setTab] = useState("login");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email: loginEmail,
                    password: loginPassword,
                },
            );
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("user_id", response.data.user_id);
            window.location.href = "/home";
        } catch {
            alert("Correo o contraseña incorrectos.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/users",
                {
                    name: registerUsername,
                    email: registerEmail,
                    password: registerPassword,
                },
            );
            alert(response.data.message);
            setTab("login");
        } catch (error) {
            alert("Error al registrar: " + error.response?.data?.error);
        }
    };

    return (
        <div className="auth-page">
            {/* ── Panel izquierdo ── */}
            <div className="auth-left">
                <div className="cda-logo-box">
                    <FaCar size={36} />
                </div>

                <div className="cda-brand">
                    <h2>CDA Pradera</h2>
                    <p>Centro de Diagnóstico Automotor</p>
                </div>

                <div className="cda-divider" />

                <p className="cda-tagline">
                    Agenda tu revisión técnico‑mecánica de forma rápida y
                    segura.
                </p>

                <ul className="cda-features">
                    <li>
                        <MdCalendarToday />
                        <span>Agendamiento en línea</span>
                    </li>
                    <li>
                        <MdVerifiedUser />
                        <span>Proceso certificado</span>
                    </li>
                    <li>
                        <MdAccessTime />
                        <span>Atención oportuna</span>
                    </li>
                </ul>
            </div>

            {/* ── Panel derecho ── */}
            <div className="auth-right">
                {/* Tabs */}
                <div className="auth-tabs">
                    <button
                        className={tab === "login" ? "active" : ""}
                        onClick={() => setTab("login")}
                    >
                        Iniciar sesión
                    </button>
                    <button
                        className={tab === "register" ? "active" : ""}
                        onClick={() => setTab("register")}
                    >
                        Registrarse
                    </button>
                </div>

                {/* Login */}
                {tab === "login" && (
                    <form className="auth-form" onSubmit={handleLogin}>
                        <h1>Bienvenido</h1>
                        <p className="form-subtitle">
                            Ingresa tus credenciales para continuar
                        </p>

                        <div className="field">
                            <label>Correo electrónico</label>
                            <div className="field-inner">
                                <input
                                    type="email"
                                    placeholder="nombre@email.com"
                                    required
                                    value={loginEmail}
                                    onChange={(e) =>
                                        setLoginEmail(e.target.value)
                                    }
                                />
                                <FaEnvelope className="field-icon" />
                            </div>
                        </div>

                        <div className="field">
                            <label>Contraseña</label>
                            <div className="field-inner">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={loginPassword}
                                    onChange={(e) =>
                                        setLoginPassword(e.target.value)
                                    }
                                />
                                <FaLock className="field-icon" />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">
                            Iniciar sesión
                        </button>

                        <p className="switch-link">
                            ¿No tienes cuenta?{" "}
                            <span onClick={() => setTab("register")}>
                                Regístrate
                            </span>
                        </p>
                    </form>
                )}

                {/* Register */}
                {tab === "register" && (
                    <form className="auth-form" onSubmit={handleRegister}>
                        <h1>Crear cuenta</h1>
                        <p className="form-subtitle">
                            Completa los datos para registrarte
                        </p>

                        <div className="field">
                            <label>Nombre de usuario</label>
                            <div className="field-inner">
                                <input
                                    type="text"
                                    placeholder="Tu nombre"
                                    required
                                    value={registerUsername}
                                    onChange={(e) =>
                                        setRegisterUsername(e.target.value)
                                    }
                                />
                                <FaUser className="field-icon" />
                            </div>
                        </div>

                        <div className="field">
                            <label>Correo electrónico</label>
                            <div className="field-inner">
                                <input
                                    type="email"
                                    placeholder="nombre@email.com"
                                    required
                                    value={registerEmail}
                                    onChange={(e) =>
                                        setRegisterEmail(e.target.value)
                                    }
                                />
                                <FaEnvelope className="field-icon" />
                            </div>
                        </div>

                        <div className="field">
                            <label>Contraseña</label>
                            <div className="field-inner">
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={registerPassword}
                                    onChange={(e) =>
                                        setRegisterPassword(e.target.value)
                                    }
                                />
                                <FaLock className="field-icon" />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">
                            Crear cuenta
                        </button>

                        <p className="switch-link">
                            ¿Ya tienes cuenta?{" "}
                            <span onClick={() => setTab("login")}>
                                Inicia sesión
                            </span>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginRegister;
