const uuidv4 = require('uuid/v4');

class Box {
    
    constructor() {
        this.items = {};
    }

    add(number, text) {
        const id = uuidv4();
        const item = {
            id,
            time: Date.now(),
            number: formatPhoneNumber(number),
            text
        };
        this.items[id] = item;
        return item;
    }

    get(id) {
        return this.items[id];
    }

    getAll() {
        return this.items;
    }

    remove(id) {
        const item = this.items[id];
        delete this.items[id];
        return item;
    }

    exists(id) {
        return typeof(this.items[id]) !== 'undefined';
    }

}

function formatPhoneNumber(number) {
    return number
        .replace(/[^0-9\+]/g, '') // remove all invalid characters (not quite right)
        .replace(/^0/, '+64');
}

export default Box;
