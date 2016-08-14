const chai = require('chai')

const [assert,should,expect] = [chai.assert, chai.should, chai.expect]

let DBSingleton = {};

function setupAndTearDownDBSingleton() {
  before(function(done){
    DBSingleton = require('../lib/db');
    done();
  })
  after(function(done){
    let name = require.resolve('../lib/db');
    DBSingleton = null;
    delete require.cache[name];
    done();
  })
}

describe('class db', function(){




  describe('require DB', function(){

    setupAndTearDownDBSingleton();

    it(`should have access to a cached require'd
       object with a private empty member named "_store"`,function(){
         return assert.deepEqual(DBSingleton._store, {})
       }) 
  })


  describe('createTable', function(done){

    setupAndTearDownDBSingleton();

    it(`should create an object with named 
       keys and attach it under this.DB`,function(){
         DBSingleton.createTable('mytable','key1','key2')
         let expecting = {'key1':{},'key2':{}};
         return assert.deepEqual(DBSingleton._store.mytable,expecting)
       })

  })
});
