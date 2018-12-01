import Express from 'express';
import bodyParser from 'body-parser';
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

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

let messages = [
    {
        id: 1,
        number: "+64273374547",
        text: "Hello, World!",
    }
];

let maxId = 1;

app.get('/', (req, res) => {
    res.send(JSON.stringify({
        version: '0.0.1'
    }));
});

// checks for any new messages that we can send via SMS
app.get('/outbox', (req, res) => {
    res.send(JSON.stringify(messages));
});

// checks for a specific message id
app.get('/outbox/:id', (req, res) => {
    const { id } = req.params;
    const message = messages.find((message) => message.id == id);
    if (message) {
        res.send(JSON.stringify(message));
    } else {
        res.send(JSON.stringify({}));
    }
});

// removes a message from the outbox to send it out by SMS
app.delete('/outbox/:id', (req, res) => {
    const { id } = req.params;
    const i = messages.findIndex((message) => message.id == id);
    if (i === -1) {
        res.send(JSON.stringify({}));
    } else {
        const message = messages[i];
        res.send(JSON.stringify(message));
        messages = messages.filter((message) => message.id != id);
    }
});

// adds a new message to be sent by SMS
app.post('/outbox', (req, res) => {
    const { number, text } = req.body;
    const id = ++maxId;
    const message = {
        id,
        number: number.replace(/^0/, '+64').replace(/\s/g, ''),
        text,
    };

    messages.push(message);
    res.send(JSON.stringify(message))
    res.end();
});

app.listen(4000, () => {
    console.log('listening on 4000');
});