import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Containers() {
    const [containers, setContainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleToggleContainer = async (id, running) => {
        const action = running ? 'stop' : 'start';
        try {
            await fetch(`http://localhost:3001/api/containers/${id}/${action}`, { method: 'POST' });
            // Refresca la tabla rápido con la lista básica (sin CPU)
            fetch('http://localhost:3001/api/containers/basic')
                .then(res => res.json())
                .then(data => setContainers(data));
        } catch (err) {
            alert(`No se pudo ${running ? 'detener' : 'iniciar'} el contenedor`);
        }
    };

    useEffect(() => {
        // Carga inicial rápida con REST
        fetch('http://localhost:3001/api/containers')
            .then(res => res.json())
            .then(data => {
                setContainers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        // Luego escucha por WebSocket
        const socket = io('http://localhost:3001');
        socket.on('containers', (data) => {
            setContainers(data);
        });
        socket.on('connect_error', () => setError('WebSocket error'));
        return () => socket.disconnect();
    }, []);

    if (loading) return <div>Cargando contenedores...</div>;
    if (error) return <div>Error: {error}</div>;

    // Ordena por nombre para evitar saltos visuales
    const sortedContainers = [...containers].sort((a, b) => a.Names[0].localeCompare(b.Names[0]));

    // Helper para mostrar puertos
    const formatPorts = (ports) =>
        ports && ports.length
            ? ports.map(p => `${p.PrivatePort}${p.PublicPort ? `→${p.PublicPort}` : ''}/${p.Type}`).join(', ')
            : '—';

    return (
        <div className="main-content">
            <h3>Contenedores Docker</h3>
            <section className="table-section">
                <table className="table table-datos">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">ID</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Puertos</th>
                            <th scope="col">CPU (%)</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedContainers.map((c) => (
                            <tr key={c.Id}>
                                <td>{c.Names.map(n => n.replace(/^\//, '')).join(', ')}</td>
                                <td>{c.Id.slice(0, 12)}</td>
                                <td>{c.Image}</td>
                                <td>{formatPorts(c.Ports)}</td>
                                <td>{typeof c.cpu === 'number' ? c.cpu.toFixed(2) : '—'}</td>
                                <td>{c.Status}</td>
                                <td>
                                    <button
                                        className={`btn btn-sm ${c.State === 'running' ? 'btn-danger' : 'btn-success'}`}
                                        onClick={() => handleToggleContainer(c.Id, c.State === 'running')}
                                    >
                                        {c.State === 'running' ? 'Stop' : 'Run'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}