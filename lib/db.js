

//the intention is to only have one DB,
//therefore this is a singleton which is cached by nature of the
//common js module system
//
class DB {

  constructor() {
    this._store = {};
    return this
  }

  createTable(name, ...keys){
    this._store[name] = {};
    keys.forEach((k) => this._store[name][k] = {});
  }

  getTable(name) {
    if (!this._store[name]) { throw new Error(`Table ${name} does not exist in _store`) } 
    return this._store[name];

  }

}

module.exports = (function(){ 
  return new DB()
})();
