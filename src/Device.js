import Box from './Box';

class Device {

    constructor(id, name) {

        this.id = id;
        this.name = name;
        this.inbox = new Box();
        this.outbox = new Box();

    }

    toJson() {
        return {
            id: this.id,
            name: this.name
        };
    }

}

export default Device;
