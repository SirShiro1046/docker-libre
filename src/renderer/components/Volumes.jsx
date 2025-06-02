import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Volumes() {
    const [volumes, setVolumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Carga inicial rápida con REST
        fetch('http://localhost:3001/api/volumes')
            .then(res => res.json())
            .then(data => {
                setVolumes(data.Volumes || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        // Luego escucha por WebSocket
        const socket = io('http://localhost:3001');
        socket.on('volumes', (data) => {
            setVolumes(data);
        });
        socket.on('connect_error', () => setError('WebSocket error'));
        return () => socket.disconnect();
    }, []);

    if (loading) return <div>Cargando volúmenes...</div>;
    if (error) return <div>Error: {error}</div>;

    const sortedVolumes = [...volumes].sort((a, b) => a.Name.localeCompare(b.Name));

    return (
        <div className="main-content">
            <h3>Volúmenes Docker</h3>
            <section className="table-section">
                <table className="table table-datos">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Driver</th>
                            <th scope="col">Mountpoint</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedVolumes.map((v, idx) => (
                            <tr key={v.Name}>
                                <td>{v.Name}</td>
                                <td>{v.Driver}</td>
                                <td>{v.Mountpoint}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}