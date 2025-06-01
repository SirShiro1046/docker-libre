import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Networks() {
    const [networks, setNetworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Carga inicial rápida con REST
        fetch('http://localhost:3001/api/networks')
            .then(res => res.json())
            .then(data => {
                setNetworks(data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        // Luego escucha por WebSocket
        const socket = io('http://localhost:3001');
        socket.on('networks', (data) => {
            setNetworks(data);
        });
        socket.on('connect_error', () => setError('WebSocket error'));
        return () => socket.disconnect();
    }, []);

    if (loading) return <div>Cargando redes...</div>;
    if (error) return <div>Error: {error}</div>;

    // Ordena por nombre para evitar saltos visuales
    const sortedNetworks = [...networks].sort((a, b) => a.Name.localeCompare(b.Name));

    return (
        <div>
            <h3>Redes Docker</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Driver</th>
                        <th scope="col">Scope</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedNetworks.map((n, idx) => (
                        <tr key={n.Id}>
                            <th scope="row">{idx + 1}</th>
                            <td>{n.Id.slice(0, 12)}</td>
                            <td>{n.Name}</td>
                            <td>{n.Driver}</td>
                            <td>{n.Scope}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}