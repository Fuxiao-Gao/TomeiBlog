const sessionCache = {
    set(key, value) {
        //sessionStorage is a webAPI that can store data in the browser
        if (!sessionStorage) {
            return
        }
        if (key != null && value != null) {
            sessionStorage.setItem(key, value)
        }
    },
    get(key) {
        if (!sessionStorage) {
            return null
        }
        if (key == null) {
            return null
        }
        return sessionStorage.getItem(key)
    },
    setJSON(key, jsonValue) {
        if (jsonValue != null) {
            this.set(key, JSON.stringify(jsonValue))
        }
    },
    getJSON(key) {
        const value = this.get(key)
        if (value != null) {
            // JSON.parse() method parses a JSON string, 
            //constructing the JavaScript value or object described by the string.
            return JSON.parse(value)
        }
    },
    remove(key) {
        sessionStorage.removeItem(key);
    }
}


const localCache = {
    set(key, value) {
        if (!localStorage) {
            return
        }
        if (key != null && value != null) {
            localStorage.setItem(key, value)
        }
    },
    get(key) {
        if (!localStorage) {
            return null
        }
        if (key == null) {
            return null
        }
        return localStorage.getItem(key)
    },
    setJSON(key, jsonValue) {
        if (jsonValue != null) {
            this.set(key, JSON.stringify(jsonValue))
        }
    },
    getJSON(key) {
        const value = this.get(key)
        if (value != null) {
            return JSON.parse(value)
        }
    },
    remove(key) {
        localStorage.removeItem(key);
    }
}

export default {
    /**
     * session cache
     */
    session: sessionCache,
    /**
     * local cache
     */
    local: localCache
}
