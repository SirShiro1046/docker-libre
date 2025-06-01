import React, { useState } from 'react';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Images from './components/Images';
import Volumes from './components/Volumes';
import Containers from './components/Containers';
import Networks from './components/Networks';

export default function App() {
    const [selected, setSelected] = useState('containers');

    let Content;
    switch (selected) {
        case 'images':
            Content = Images;
            break;
        case 'volumes':
            Content = Volumes;
            break;
        case 'networks':
            Content = Networks;
            break;
        default:
            Content = Containers;
    }

    return (
        <div>
            <Nav />
            <div style={{ display: 'flex', height: '90vh' }}>
                <Sidebar onSelect={setSelected} selected={selected} />
                <main style={{ flex: 1, padding: '2rem' }}>
                    <Content />
                </main>
            </div>
        </div>
    );
}