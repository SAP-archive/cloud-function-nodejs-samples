'use strict';

class Guard {
    constructor(resolve, reject) {
        this._resolve = resolve;
        this._reject = reject;
        this._error = null;
        this._locks = 0;
    }
    lock() {
        if (this._error)
            return false;
        this._locks += 1;
        return true;
    }
    unlock(error) {
        if (error) {
            this._error = error;
        }
        if (this._locks > 1) {
            this._locks -= 1;
        } else if (this._error) {
            this._locks = 0;
            this._reject(this._error);
        } else {
            this._locks = 0;
            this._resolve();
        }
    }
}

module.exports = Guard;

