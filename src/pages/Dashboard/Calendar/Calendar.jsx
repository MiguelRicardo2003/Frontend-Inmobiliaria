import React, { useState, useEffect } from "react";
import CalendarView from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Puedes dejarlo para el reset base

const LOCAL_STORAGE_KEY = "eventos";

const Calendar = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAdvertencia, setModalAdvertencia] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [formulario, setFormulario] = useState({
    id: null,
    title: "",
    property: "",
    participants: [],
    start: "",
    end: "",
    type: "",
    state: "",
    description: "",
  });

  useEffect(() => {
    const guardados = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (guardados) setEventos(JSON.parse(guardados));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(eventos));
  }, [eventos]);

  // Cambia la función iniciarNuevoEvento:
  const iniciarNuevoEvento = (fecha) => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaClick = new Date(fecha);
    fechaClick.setHours(0, 0, 0, 0);

    // Si es fecha pasada, mostrar advertencia
    if (fechaClick < hoy) {
      setModalAdvertencia(true);
      return;
    }

    const fechaISO = new Date(fecha).toISOString().slice(0, 16);
    setFormulario({
      id: Date.now(),
      title: "",
      property: "",
      participants: [],
      start: fechaISO,
      end: fechaISO,
      type: "",
      state: "",
      description: "",
    });
    setEventoSeleccionado(null);
    setModalAbierto(true);
  };

  const guardarEvento = () => {
    if (!formulario.title || !formulario.start || !formulario.end) return;
    if (eventoSeleccionado) {
      setEventos(eventos.map((e) => (e.id === formulario.id ? formulario : e)));
    } else {
      setEventos([...eventos, formulario]);
    }
    setModalAbierto(false);
  };

  const eliminarEvento = () => {
    if (eventoSeleccionado) {
      setEventos(eventos.filter((e) => e.id !== formulario.id));
      setModalAbierto(false);
    }
  };

  const eventosDelDia = eventos.filter(
    (ev) => new Date(ev.start).toDateString() === fechaSeleccionada.toDateString()
  );

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      <div className="flex justify-between items-start p-6">
        <div>
          <div className="text-3xl font-bold text-black">Calendario</div>
          <div className="text-lg text-gray-500">Gestión de citas y eventos</div>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow"
          onClick={() => iniciarNuevoEvento(new Date())}
        >
          + Nueva Cita
        </button>
      </div>

      <div className="flex w-full px-6 pb-6 gap-6">
        {/* CALENDARIO */}
        <div className="w-full h-full bg-white flex ">
          <CalendarView
            onChange={setFechaSeleccionada}
            value={fechaSeleccionada}
            onClickDay={(value) => iniciarNuevoEvento(value)}
            className="flex-1 rounded-2xl shadow-lg border-none p-6 bg-white"
            prevLabel="←"
            nextLabel="→"
            navigationLabel={({ date }) =>
              `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
            }
            formatShortWeekday={(locale, date) =>
              date.toLocaleDateString(locale, { weekday: "short" }).slice(0, 3)
            }
            tileClassName={({ date }) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const fecha = new Date(date);
              fecha.setHours(0, 0, 0, 0);
              let clases =
                "flex h-36 rounded flex-col items-center justify-center text-base bg-white border border-gray-200 m-1  transition-all relative";
              // Quitar opacidad para fechas pasadas
              if (fecha.toDateString() === new Date().toDateString())
                clases += " bg-indigo-100 text-blue-700 font-bold";
              if (fecha.toDateString() === fechaSeleccionada.toDateString())
                clases += " bg-blue-600 text-white font-bold";
              return clases;
            }}
            tileDisabled={({ date, view }) => {
              // Deshabilita días pasados
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const fecha = new Date(date);
              fecha.setHours(0, 0, 0, 0);
              return view === "month" && fecha < today;
            }}
            tileContent={({ date }) => {
              const hayEvento = eventos.some(
                (ev) => new Date(ev.start).toDateString() === date.toDateString()
              );
              return hayEvento ? (
                <span
                  className="event-dot absolute left-1/2 -translate-x-1/2 bottom-2 w-2 h-2 bg-blue-700 rounded-full"
                  //style={{ bottom: '8px' }} // Puedes ajustar este valor si lo necesitas
                ></span>
              ) : null;
            }}
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
                  className="bg-white rounded p-3 shadow text-sm cursor-pointer"
                  onClick={() => {
                    setFormulario(ev);
                    setEventoSeleccionado(ev);
                    setModalAbierto(true);
                  }}
                >
                  <div className="font-semibold">{ev.title}</div>
                  <div className="text-xs text-gray-500">{new Date(ev.start).toLocaleString()}</div>
                  <div className="text-xs text-gray-400">{ev.property}</div>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md space-y-6">
            <h2 className="text-2xl font-bold mb-4">
              {eventoSeleccionado ? "Editar Evento" : "Nuevo Evento"}
            </h2>
            {/* Bloque: Información principal */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Título</label>
              <input
                value={formulario.title}
                onChange={(e) => setFormulario({ ...formulario, title: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Título"
              />
              <label className="block text-sm font-semibold text-gray-700">Propiedad</label>
              <input
                value={formulario.property}
                onChange={(e) => setFormulario({ ...formulario, property: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Propiedad"
              />
              <label className="block text-sm font-semibold text-gray-700">Participantes</label>
              <input
                value={formulario.participants.join(", ")}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    participants: e.target.value.split(",").map((p) => p.trim()),
                  })
                }
                className="w-full border px-3 py-2 rounded"
                placeholder="Participantes (separados por coma)"
              />
            </div>
            {/* Bloque: Fechas */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Fecha y hora</label>
              <div>
                <input
                  type="datetime-local"
                  value={formulario.start}
                  onChange={(e) => setFormulario({ ...formulario, start: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            </div>
            {/* Bloque: Detalles */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Tipo de evento</label>
              <input
                value={formulario.type}
                onChange={(e) => setFormulario({ ...formulario, type: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Tipo de evento"
              />
              <label className="block text-sm font-semibold text-gray-700">Estado</label>
              <input
                value={formulario.state}
                onChange={(e) => setFormulario({ ...formulario, state: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Estado"
              />
              <label className="block text-sm font-semibold text-gray-700">Descripción</label>
              <textarea
                value={formulario.description}
                onChange={(e) => setFormulario({ ...formulario, description: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Descripción"
              />
            </div>
            {/* Botones */}
            <div className="flex justify-end gap-4 pt-4">
              {eventoSeleccionado && (
                <button
                  onClick={eliminarEvento}
                  className="text-red-500 hover:underline text-sm"
                >
                  Eliminar
                </button>
              )}
              <button
                onClick={() => setModalAbierto(false)}
                className="text-gray-600 hover:underline text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={guardarEvento}
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