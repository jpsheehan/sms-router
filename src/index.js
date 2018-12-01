import Express from 'express';
import bodyParser from 'body-parser';
import ip from 'ip';
// import QRCode from 'qrcode';
// app.get('/', (req, res) => {
//     QRCode.toDataURL('test', (err, uri) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(uri);
//         }
//     })
// })

const app = new Express();
const port = 4000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

let outbox = [];
let inbox = [];

let maxOutboxId = 0;
let maxInboxId = 0;

app.get('/', (req, res) => {
    res.send(JSON.stringify({
        version: '0.0.1'
    }));
});

// checks for any new messages that we can send via SMS
app.get('/outbox', (req, res) => {
    res.send(JSON.stringify(outbox));
});

// checks for a specific message id
app.get('/outbox/:id', (req, res) => {
    const { id } = req.params;
    const message = outbox.find((message) => message.id == id);
    if (message) {
        res.send(JSON.stringify(message));
    } else {
        res.send(JSON.stringify({}));
    }
});

// removes a message from the outbox to send it out by SMS
app.delete('/outbox/:id', (req, res) => {
    const { id } = req.params;
    const i = outbox.findIndex((message) => message.id == id);
    if (i === -1) {
        res.send(JSON.stringify({}));
    } else {
        const message = outbox[i];
        res.send(JSON.stringify(message));
        outbox = outbox.filter((message) => message.id != id);
    }
});

// adds a new message to be sent by SMS
app.post('/outbox', (req, res) => {
    const { number, text } = req.body;
    const id = ++maxOutboxId;
    const message = {
        id,
        number: number.replace(/^0/, '+64').replace(/\s/g, ''),
        text,
    };

    outbox.push(message);
    res.send(JSON.stringify(message))
    res.end();
});

// gets all of the messages in the inbox
app.get('/inbox', (req, res) => {
    res.send(JSON.stringify(inbox));
});

// gets a specific message
app.get('/inbox/:id', (req, res) => {
    const { id } = req.params;
    const message = inbox.find((message) => message.id == id);
    if (message) {
        res.send(JSON.stringify(message));
    } else {
        res.send(JSON.stringify({}));
    }
});

// removes a specific message from the inbox
app.delete('/inbox/:id', (req, res) => {
    const { id } = req.params;
    const inboxIndex = inbox.findIndex((message) => message.id == id);
    if (inboxIndex === -1) {
        res.send(JSON.stringify({}));
    } else {
        const message = inbox[inboxIndex];
        res.send(JSON.stringify(message));
        inbox = inbox.filter((message) => message.id != id);
    }
});

// puts a new message in the inbox
app.post('/inbox', (req, res) => {
    const { number, text } = req.body;
    const id = ++maxInboxId;
    const message = {
        id,
        number,
        text
    };
    inbox.push(message);
    res.send(JSON.stringify(message));
});

app.listen(port, () => {
    const server = `http://${ip.address()}:${port}`
    console.log(`Listening on ${server}`);
});