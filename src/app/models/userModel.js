const Schema = require ('bookshelf-schema');
const bcrypt = require('bcrypt');
const knex = require('knex')({client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'User',
      charset: 'utf8'
    }
  },
)

    const bookshelf = require('bookshelf')(knex);
    bookshelf.plugin('registry');
    const User = bookshelf.Model.extend({
      tableName: 'users',
      initialize: function() {
        this.on('creating', this.hashPassword, this);
      },
      hashPassword: function(model, attrs, options) {
        return new Promise(function(resolve, reject) {
          bcrypt.hash(model.attributes.password, 10, function(err, hash) {
            if( err ) reject(err);
            model.set('password', hash);
            resolve(hash); // data is created only after this occurs
          });
        });
      }
})

    console.log("hai")
    module.exports = bookshelf.model('User', User);
