const express = require('express');
const Docker = require('dockerode');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const docker = new Docker();

app.use(cors());


app.get('/api/containers/basic', async (req, res) => {
    try {
        const containers = await docker.listContainers({ all: true });
        res.json(containers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Rutas REST
app.get('/api/containers', async (req, res) => {
    try {
        const containers = await docker.listContainers({ all: true });
        res.json(containers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/volumes', async (req, res) => {
    try {
        const volumes = await docker.listVolumes();
        res.json(volumes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/images', async (req, res) => {
    try {
        const images = await docker.listImages();
        res.json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/networks', async (req, res) => {
    try {
        const networks = await docker.listNetworks();
        res.json(networks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// WebSocket setup
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    console.log('Cliente conectado a WebSocket');
});

// Emitir volúmenes cada 2 segundos
setInterval(async () => {
    try {
        const volumes = await docker.listVolumes();
        io.emit('volumes', volumes.Volumes || []);
    } catch (err) {
        console.error('Error al emitir volúmenes:', err);
    }
}, 2000);

// Emitir imágenes cada 2 segundos
setInterval(async () => {
    try {
        const images = await docker.listImages();
        io.emit('images', images || []);
    } catch (err) {
        console.error('Error al emitir imágenes:', err);
    }
}, 2000);

// Emitir networks cada 2 segundos
setInterval(async () => {
    try {
        const networks = await docker.listNetworks();
        io.emit('networks', networks || []);
    } catch (err) {
        console.error('Error al emitir networks:', err);
    }
}, 2000);

// Emitir contenedores cada 2 segundos
setInterval(async () => {
    try {
        const containers = await docker.listContainers({ all: true });
        // Obtener stats de cada contenedor
        const containersWithCpu = await Promise.all(containers.map(async c => {
            try {
                const container = docker.getContainer(c.Id);
                const stats = await container.stats({ stream: false });
                // Calcular el uso de CPU
                const cpuDelta = stats.cpu_stats.cpu_usage.total_usage - stats.precpu_stats.cpu_usage.total_usage;
                const systemDelta = stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;
                let cpu = 0;
                if (systemDelta > 0 && cpuDelta > 0) {
                    cpu = (cpuDelta / systemDelta) * stats.cpu_stats.online_cpus * 100;
                }
                return { ...c, cpu };
            } catch {
                return { ...c, cpu: null };
            }
        }));
        io.emit('containers', containersWithCpu);
    } catch (err) {
        console.error('Error al emitir contenedores:', err);
    }
}, 2000);

app.post('/api/containers/:id/start', async (req, res) => {
    try {
        const container = docker.getContainer(req.params.id);
        await container.start();
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post('/api/containers/:id/stop', async (req, res) => {
    try {
        const container = docker.getContainer(req.params.id);
        await container.stop();
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

server.listen(3001, () => console.log('API y WebSocket en http://localhost:3001'));