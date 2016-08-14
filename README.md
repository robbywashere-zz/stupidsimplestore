# StupidSimpleStore (tm)

### Explanation:

  This is a very simple in memory data store leveraging the nature of Common JS module cache'ing via `require('...`. This is essentially used to make for a key value store that maybe shared amongst modules.

  The abstraction is similar to how you might use a single database with 'tables'. Each 'table' is a scoped by its name which contains keys and values

  of the structure is a hash that looks like this:

```
    DB: {
      myTable:{
        key1: val1,
        key2: val3,
        key3: val3
      },

      myTable2:{
        key1: val1,
        key2: val3,
        key3: val3
      },
      myTable3:{
        key1: val1,
        key2: val3,
        key3: val3
      }
    }
```

The `DB` object is what is passed around in the Common JS module cache. Therefore every time you `require('stupidsimplestore')` you will be able to access this same object but with some getter and setters abstractions through Query object.


You must instatiate the DB object by require'ing this `stupidsimplestore` module. It is then recommended you create your tables immediately after. This should be in the same mindset as how you might run a migration - but _ephemeral_

```
let sss = require('stupidsimplestore');

sss.DB.createTable('Users');

```

Then in your other modules you may do:

```
  let sss = require('stupidsimplestore');

  users = new sss.Query('Users');

  users.Set('key1','val1').then((v) => console.log(v) );

  users.Get('key1').then((v) => console.log(v));

  users.Delete('key1').then((id) => console.log(id,' deleted'));

```


_Some things to note:_


* Set, Get, and Delete return _native_ Promises

* The goal of this project was to make a very simple storage adapter which could later be easily replaced with a more robust database solution.

* The code is very small and requires no dependencies

* Take a look at the ./test directory for more insight


_Enhancements:_

Along with the idea of using this as an abstracted storage adapter you may extend the Query class to more carefully model how your ORM or database model might look like

```
let sss = require('./index.js')

class MyORM extends sss.Query {

  constructor() {
    super();
  }

  ...

```

For a more complete example, take a look at `./examples/fake_orm.js`




