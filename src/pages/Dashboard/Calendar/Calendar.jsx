import React, { useState, useEffect } from "react";
import CalendarView from "react-calendar";
import "react-calendar/dist/Calendar.css"; // ❌ NO la usaremos
const LOCAL_STORAGE_KEY = "eventos";

const Calendar = () => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [eventos, setEventos] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState("");

    useEffect(() => {
        const eventosGuardados = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (eventosGuardados) {
            setEventos(JSON.parse(eventosGuardados));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(eventos));
    }, [eventos]);

    const eventosDelDia = eventos.filter(
        (ev) => ev.date === fechaSeleccionada.toDateString()
    );

    const agregarEvento = () => {
        if (!nuevoTitulo) return;
        const nuevo = {
            id: Date.now(),
            title: nuevoTitulo,
            date: fechaSeleccionada.toDateString(),
        };
        setEventos([...eventos, nuevo]);
        setNuevoTitulo("");
        setModalAbierto(false);
    };

    const eliminarEvento = (id) => {
        setEventos(eventos.filter((e) => e.id !== id));
    };

    return (
        <div className="h-screen w-full flex flex-col dark:bg-gray-900 bg-white">
            <div className="flex justify-between items-start p-6">
                <div>
                    <div className="text-3xl font-bold text-black">Calendario</div>
                    <div className="text-lg text-gray-500">Gestión de citas y eventos</div>
                </div>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                    onClick={() => setModalAbierto(true)}
                >
                    + Nueva Cita
                </button>
            </div>

            <div className="flex flex-1 px-6 pb-6 gap-6">
                {/* CALENDARIO */}
                <div className="flex-1 bg-gray-100 rounded-xl shadow p-4 flex w-full ">
                    <CalendarView
                        onChange={setFechaSeleccionada}
                        value={fechaSeleccionada}
                        tileClassName={({ date, view }) => {
                            const today = new Date().toDateString();
                            const fecha = date.toDateString();
                            let clases = "h-36 flex items-center justify-center rounded transition-all";
                            if (fecha === today) clases += " bg-blue-100 text-blue-700 font-bold";
                            else if (fecha === fechaSeleccionada.toDateString()) clases += " bg-blue-600 text-white font-bold";
                            else clases += " hover:bg-gray-200";

                            return clases;
                        }}
                        className="w-full h-full flex-1 [&>*]:w-full [&>*]:h-full rounded-lg"
                        prevLabel="←"
                        nextLabel="→"
                        navigationLabel={({ date }) =>
                            `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
                        }
                        formatShortWeekday={(locale, date) =>
                            date.toLocaleDateString(locale, { weekday: "short" }).slice(0, 2)
                        }
                    />
                </div>

                {/* EVENTOS */}
                <div className="w-[300px] bg-gray-100 rounded-xl shadow p-4">
                    <div className="text-lg font-semibold mb-2">Eventos del día</div>
                    <div className="space-y-2 overflow-y-auto max-h-[500px]">
                        {eventosDelDia.length > 0 ? (
                            eventosDelDia.map((ev) => (
                                <div
                                    key={ev.id}
                                    className="bg-white rounded p-3 shadow text-sm flex justify-between items-center"
                                >
                                    <span>{ev.title}</span>
                                    <button
                                        onClick={() => eliminarEvento(ev.id)}
                                        className="text-red-500 hover:underline text-xs"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-400 text-sm">No hay eventos</div>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {modalAbierto && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md space-y-4">
                        <h2 className="text-xl font-semibold">Nueva cita para el {fechaSeleccionada.toDateString()}</h2>
                        <input
                            type="text"
                            placeholder="Título del evento"
                            value={nuevoTitulo}
                            onChange={(e) => setNuevoTitulo(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setModalAbierto(false)}
                                className="text-gray-500 hover:underline"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={agregarEvento}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
