import Express from 'express';
import ip from 'ip';
import DeviceList from './DeviceList';

const app = new Express();
const port = 4000;
const version = '0.0.1';

const devices = new DeviceList();

app.use(Express.json());

app.get('/', (req, res) => {
    res.send({
        version
    });
});

app.get('/devices', (req, res) => {
    res.send(devices.getAll());
});

app.get('/devices/:deviceId', (req, res) => {
    const { deviceId } = req.params;
    res.send(devices.get(deviceId).toJson());
});

app.post('/devices', (req, res) => {
    const { name } = req.body;
    res.send(devices.add(name).toJson());
});

app.delete('/devices/:deviceId', (req, res) => {
    const { deviceId } = req.params;
    res.send(devices.remove(deviceId).toJson());
});

app.get('/devices/:deviceId/outbox', (req, res) => {
    const { deviceId } = req.params;
    res.send(devices.get(deviceId).outbox.getAll());
});

app.get('/devices/:deviceId/outbox/:messageId', (req, res) => {
    const { deviceId, messageId } = req.params;
    res.send(devices.get(deviceId).outbox.get(messageId));
});

app.delete('/devices/:deviceId/outbox/:messageId', (req, res) => {
    const { deviceId, messageId } = req.params;
    res.send(devices.get(deviceId).outbox.remove(messageId));
});

app.post('/devices/:deviceId/outbox', (req, res) => {
    const { number, text } = req.body;
    const { deviceId } = req.params;
    res.send(devices.get(deviceId).outbox.add(number, text));
});

app.get('/devices/:deviceId/inbox', (req, res) => {
    const { deviceId } = req.params;
    res.send(devices.get(deviceId).inbox.getAll());
});

app.get('/devices/:deviceId/inbox/:messageId', (req, res) => {
    const { deviceId, messageId } = req.params;
    res.send(devices.get(deviceId).inbox.get(messageId));
});

app.delete('/devices/:deviceId/inbox/:messageId', (req, res) => {
    const { deviceId, messageId } = req.params;
    res.send(devices.get(deviceId).inbox.remove(messageId));
});

app.post('/devices/:deviceId/inbox', (req, res) => {
    const { number, text } = req.body;
    const { deviceId } = req.params;
    res.send(devices.get(deviceId).inbox.add(number, text));
});

app.use((err, req, res, next) => {
    res.status(500).send({error: err.toString()});
    console.error(`500 - ${req.path}`);
});

app.use((req, res, next) => {
    res.status(404).send({error: 'bad endpoint'});
    console.warn(`404 - ${req.path}`);
})

app.listen(port, () => {
    const server = `http://${ip.address()}:${port}`
    console.log(`Listening on ${server}`);
});
