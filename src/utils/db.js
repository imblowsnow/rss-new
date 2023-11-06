class Db {
    KEY_CONFIG = 'config';
    KEY_COLLECT = 'article_collects';
    KEY_ARTICLE_PREFIX = 'article_';
    KEY_ARTICLE_INDEXES = 'article_index_';
    KEY_SUBSCRIBES = 'subscribes';

    constructor() {
        this.db = window['utools'] ? new UtoolsStorage(): localStorage;
    }
    clear() {
        this.db.clear();
    }
    getItem(key) {
        return this.db.getItem(key);
    }
    key(index) {
        return this.db.key(index);
    }
    removeItem(key) {
        this.db.removeItem(key);
    }
    setItem(key, value) {
        this.db.setItem(key, value);
    }
}

class UtoolsStorage{
    constructor() {
        this.db = window.utools.dbStorage;
    }

    getItem(key) {
        return this.db.getItem(key);
    }
    removeItem(key) {
        this.db.removeItem(key);
    }
    setItem(key, value) {
        this.db.setItem(key, value);
    }
    key(index) {
        throw new Error('utools dbStorage can not key');
    }
    clear() {
        throw new Error('utools dbStorage can not clear');
    }
}

export default new Db();
