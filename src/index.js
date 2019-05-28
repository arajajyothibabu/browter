export default class Browter {

    constructor(){
        console.log("Browter");
        this.init();
        this._listeners = [];
    }

    _log = (...args) => {
        try{
            console.error(...args);
        } catch(error){
            //?!No idea what to do!
        }
    }

    init = () => {
        if(typeof window === 'object' && window.history){
            this.window = window;
        }else {
            this.window = {};
            this._log("No Window Object detected!");
        }
    }

    _onUpdate = (pathname) => {
        this._listeners.forEach(({callback, path}) => {
            if(typeof path !== 'undefined'){
                try{
                    if(new RegExp(path).test(pathname)){
                        callback(pathname);
                    }
                } catch (err) {
                    this._log("Invalid path matcher!");
                }
            } else {
                callback(pathname);
            }
        });
    }

    _listenForPopState = () => {
        window.onpopstate = () => {
            this._onUpdate(this.window.location.pathname);
        }
    }

    route = (pathOrState, callback) => {
        const origin = this.window.location.origin;
        if(typeof pathOrState === 'object'){
            const { params, title, path } = pathOrState;
            this.window.history.pushState(params, title, origin + path);
        } else if(typeof pathOrState === 'string'){
            this.window.history.pushState({}, undefined, origin + pathOrState);
        }
        if(typeof callback === 'function'){
            callback(this.window.location.pathname);
        }
    }

    on = (path, callback) => {
        if(typeof callback === 'function' && typeof path !== 'undefined'){
            this._listeners.push({callback, path});
        } else {
            this._log("Path and callback required!");
        }
    }

    onUpdate = (callback) => {
        if(typeof callback === 'function'){
            this._listeners.push({callback});
        }
    }

}