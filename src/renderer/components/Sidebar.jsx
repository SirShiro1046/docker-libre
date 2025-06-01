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
                        <i className="bi bi-box icon-aside"></i> Containers
                    </button>
                </li>
                <li>
                    <button
                        className={`side-button${selected === 'images' ? ' active' : ''}`}
                        onClick={() => onSelect('images')}
                    >
                        <i className="bi bi-boxes icon-aside"></i>
                        Images
                    </button>
                </li>
                <li>
                    <button
                        className={`side-button${selected === 'volumes' ? ' active' : ''}`}
                        onClick={() => onSelect('volumes')}
                    >
                        <i className="bi bi-hdd icon-aside"></i>
                        Volumes
                    </button>
                </li>
                <li>
                    <button
                        className={`side-button${selected === 'networks' ? ' active' : ''}`}
                        onClick={() => onSelect('networks')}
                    >
                        <i className="bi bi-hdd-network icon-aside"></i>
                        Networks
                    </button>
                </li>
            </ul>
        </aside>
    );
}