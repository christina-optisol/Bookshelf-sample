'use strict';
const User = require('../models/userModel');
module.exports = {
    create: function(req, res) {
        const data ={ id : req.body.id,
            userName :req.body.userName,
            email : req.body.email,
            password : req.body.password,
            location : req.body.location,
            mobile :req.body.mobile}
        

        User.forge(data).save(null, {method: 'insert'}).then(function(user) {
            res.status(200).json({
                status: "Success",
                user: user
              });
            }).catch(function(err) {
             res.send(err);
            });
    },

    getUser : function(req,res) {
        User.fetchAll().then(function(data){
            res.send(data);
        }).catch(function(err){
            res.send(err)
        })
    },

    update : function(req,res){
        User
        .where({userName: req.body.userName})
        .save({mobile: req.body.mobile},{patch:true}).then(function(data){
            res.send(data);
        }).catch(function(err){
            res.send(err)
        })
    },

    delete : function(req,res){
        User.where({userName: req.body.userName})
        .fetch({require: true}).then(function(data){
            console.log(data);
            data.destroy().then(function(msg){
                res.send(msg);
            })
        }).catch(function(err){
            res.send(err)
        })
    }
}  



