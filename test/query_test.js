const chai = require('chai')

const query = require('../lib/query');

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

describe('class query', function(){


  describe('constructor', function(){

    setupAndTearDownDBSingleton();

    it(`should create a member which references the
       cached DB object`,function(){
         cachedDB = require('../lib/db');
         let q = new query();
         return assert.deepEqual(q.DB, cachedDB)
       }) 

    it (`should set & get a value by tablename and key and value`,function(done){
         cachedDB = require('../lib/db');
         cachedDB.createTable('myTable');
         let q = new query();
         q.Set('myTable',1,2).then(function(){
           return q.Get('myTable',1).then((v) => assert.equal(v,2))
         }).then(done)
    })

    it (`should bind set & get methods to provided tablename `,function(done){
         cachedDB = require('../lib/db');
         cachedDB.createTable('myTable');
         let myTable = new query('myTable');
         myTable.Set(1,2).then(function(){
           return myTable.Get(1).then((v) => assert.equal(v,2))
         }).then(done)
    })

  })


});
