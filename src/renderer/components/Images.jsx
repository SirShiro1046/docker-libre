import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Images() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Carga inicial rápida con REST
        fetch('http://localhost:3001/api/images')
            .then(res => res.json())
            .then(data => {
                setImages(data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        // Luego escucha por WebSocket
        const socket = io('http://localhost:3001');
        socket.on('images', (data) => {
            setImages(data);
        });
        socket.on('connect_error', () => setError('WebSocket error'));
        return () => socket.disconnect();
    }, []);

    if (loading) return <div>Cargando imágenes...</div>;
    if (error) return <div>Error: {error}</div>;

    // Ordena por repo/tag para evitar saltos visuales
    const sortedImages = [...images].sort((a, b) => {
        const repoA = (a.RepoTags && a.RepoTags[0]) || '';
        const repoB = (b.RepoTags && b.RepoTags[0]) || '';
        return repoA.localeCompare(repoB);
    });

    return (
        <div className="main-content">
            <h3>Imágenes Docker</h3>
            <section className="table-section">
                <table className="table table-datos">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">RepoTags</th>
                            <th scope="col">Tamaño</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedImages.map((img, idx) => (
                            <tr key={img.Id}>
                                <td>{img.Id.slice(0, 12)}</td>
                                <td>{img.RepoTags ? img.RepoTags.join(', ') : '(sin tag)'}</td>
                                <td>{(img.Size / (1024 * 1024)).toFixed(2)} MB</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}