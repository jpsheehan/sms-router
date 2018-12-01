import uuidv4 from 'uuid/v4';
import Device from './Device';

export default class DeviceList {

    constructor() {
        const debugData = {
            "id": "e1abbcc5-5243-41b2-9368-c77b408b9bb3",
            "name": "Samsung S6"
        };
        
        this.devices = {
            [debugData.id]: new Device(debugData.id, debugData.name)
        };
    }

    add(name) {
        const id = uuidv4();
        const device = new Device(id, name);
        this.devices[id] = device;
        return device;
    }

    get(id) {
        return this.devices[id];
    }

    getAll() {        
        return Object.keys(this.devices).map(id => this.devices[id].toJson());
    }

    remove(id) {
        const device = this.devices[id];
        delete this.devices[id];
        return device;
    }

    exists(id) {
        return typeof(this.devices[id]) !== 'undefined';
    }

}