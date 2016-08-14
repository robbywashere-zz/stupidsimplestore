
let sss = require('../index.js')

class MyORM extends sss.Query {

  constructor() {
    super();
  }


  findByID(table,id) {
    return this.Get(table,id)
  }

  findByEmail(userTable,email) {
    let tableObj = this.DB.getTable(userTable);
    for (let id in tableObj) {
      if (tableObj.hasOwnProperty(id) && tableObj[id]['email'] === email) {
          return Promise.resolve(tableObj[id]);
      }
    }
    return Promise.reject(undefined);
  }

  findOrCreate(table, id, data) {
    return new Promise((resolve) => {
      this.Get(table, id)
        .then(resolve)
        .catch(() => {
          this.Set(table, id,data).then(resolve);
        })
    })
  }

}


sss.DB.createTable('Users');

orm = new MyORM();

userID = 1007;
userName = 'John';
userEmail = 'john@example.com'

orm.findOrCreate('Users',userID,{'username':userName, 'email':userEmail})
  //find by userID
  .then(function() { 
    orm.findByID('Users',1007).then((v)=> console.log(v)) 
  })

  //Find by user email
  .then(function() { 
    orm.findByEmail('Users',userEmail).then((v) => console.log(v))  
})



