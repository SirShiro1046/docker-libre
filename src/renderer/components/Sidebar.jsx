import React from 'react';

export default function Sidebar({ onSelect }) {
    return (
        <aside style={{ width: '200px', background: '#eee', padding: '1rem' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><button onClick={() => onSelect('containers')}>Containers</button></li>
                <li><button onClick={() => onSelect('images')}>Images</button></li>
                <li><button onClick={() => onSelect('volumes')}>Volumes</button></li>
                <li><button onClick={() => onSelect('networks')}>Networks</button></li>
            </ul>
        </aside>
    );
}