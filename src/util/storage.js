class Storage {
    setItem(key, value) {
        localStorage.setItem(key, value);
    }

    getItem(key) {
        return localStorage.getItem(key);
    }
}

const INSTANCE = new Storage();

export default INSTANCE;