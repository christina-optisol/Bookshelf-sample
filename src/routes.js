
'use strict';

module.exports = function(app) {
 // Insert routes below
app.use('/user', require('./app/routers/userRouter'));
};