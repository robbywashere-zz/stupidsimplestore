
class Query {

  constructor(table){

    this.DB = require('./db')

    if (typeof table == "string") {
      this.Get = this.Get.bind(this,table);
      this.Set = this.Set.bind(this,table);
    }

    return this;

  }


  Get(tableName,key) {

    let table = this.DB.getTable(tableName);

    if (table.hasOwnProperty(key)) return Promise.resolve(table[key]);

    else return Promise.reject(undefined);

  }

  Set(tableName, id, val) {

    let table = this.DB.getTable(tableName);
    table[id] = val;
    return Promise.resolve(val);
  }

  Delete(table, id, val) {
    delete this._store[id];
    return Promise.resolve(true);
  }


}



module.exports = Query;
