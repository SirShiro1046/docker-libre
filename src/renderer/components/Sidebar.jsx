import React from 'react';

export default function Sidebar({ onSelect, selected }) {
    return (
        <aside className='aside-menu'>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>
                    <button
                        className={`side-button${selected === 'containers' ? ' active' : ''}`}
                        onClick={() => onSelect('containers')}
                    >
                        <i class="bi bi-box"></i> Containers
                    </button>
                </li>
                <li>
                    <button
                        className={`side-button${selected === 'images' ? ' active' : ''}`}
                        onClick={() => onSelect('images')}
                    >
                        <i class="bi bi-boxes"></i>
                        Images
                    </button>
                </li>
                <li>
                    <button
                        className={`side-button${selected === 'volumes' ? ' active' : ''}`}
                        onClick={() => onSelect('volumes')}
                    >
                        <i class="bi bi-hdd"></i>
                        Volumes
                    </button>
                </li>
                <li>
                    <button
                        className={`side-button${selected === 'networks' ? ' active' : ''}`}
                        onClick={() => onSelect('networks')}
                    >
                        <i class="bi bi-hdd-network"></i>
                        Networks
                    </button>
                </li>
            </ul>
        </aside>
    );
}