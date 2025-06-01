import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Containers() {
    const [containers, setContainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div>
            <h3>Contenedores Docker</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedContainers.map((c, idx) => (
                        <tr key={c.Id}>
                            <th scope="row">{idx + 1}</th>
                            <td>{c.Id.slice(0, 12)}</td>
                            <td>{c.Names.join(', ')}</td>
                            <td>{c.Image}</td>
                            <td>{c.Status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}