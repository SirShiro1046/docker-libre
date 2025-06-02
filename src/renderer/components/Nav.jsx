import React from 'react';

export default function Nav() {
    const handleMinimize = () => window.electronAPI.minimize();
    const handleMaximize = () => window.electronAPI.maximize();
    const handleClose = () => window.electronAPI.close();

    return (
        <nav className="nav-component">
            <div className="container-fluid d-flex align-items-center">
                {/* Marca a la izquierda */}
                                <h4 className='nav-title'>
                  Docker.Libre <span className="nav-linux">PERSONAL LINUX</span>
                </h4>

                {/* Zona de búsqueda + botones, empujada a la derecha */}
                <div className="d-flex align-items-center ms-auto" style={{ WebkitAppRegion: 'no-drag' }}>
                    {/* Formulario de búsqueda */}
                    <form className="d-flex me-2" role="search">
                        <input
                            className="nav-search"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-sm btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>

                    {/* Botones de ventana */}
                    <div className="d-flex gap-1">
                        <button className='nav-button' onClick={handleMinimize} title="Minimizar"> <i class="bi bi-dash"></i> </button>
                        <button className='nav-button' onClick={handleMaximize} title="Maximizar / Restaurar"><i class="bi bi-square"></i></button>
                        <button className='nav-button' onClick={handleClose} title="Cerrar"> <i class="bi bi-x-lg"></i> </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
