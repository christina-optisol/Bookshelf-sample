'use strict';
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwToken = require('../services/jwtToken');
module.exports = {
    create: function(req, res) {
        const data ={ id : req.body.id,
            userName :req.body.userName,
            email : req.body.email,
            password : req.body.password,
            location : req.body.location,
            mobile :req.body.mobile
        }
        User.forge(data).save(null, {method: 'insert'}).then(function(user) {
            res.status(200).json({
                status: "Success",
                user: user,
                token : jwToken.issue({id:user.id})
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
    },

    login : function(req,res){
        User.where({userName : req.query.userName})
         .fetch({require: true}).then(function(data){
             if(!data){
                 console.log("No User");
                 res.send("User Not Found")
             }
             else{
                console.log("Comparing Password"); 
                bcrypt.compare(req.query.password,data.attributes.password,function (err,compare){
                    console.log(compare)
                    if(err){
                        console.log('password incorrect');
                        res.send('password incorrect');
                      }
                      else {
                        console.log('password is correct send JWT');
                        res.send({
                            message:"Successfully Login",
                            token : jwToken.issue({id:data.attributes.id})
                        })
                      }
                })
             }
           
         }).catch(function (err){
             res.send(err)
         })
    },

    verifyToken : function(req,res){
        jwToken.verify(req.query.key, function ( err, token) {
            if(err) {  
               res.send(err);       
            } else{
              res.send({
                  message:"Token verified"
              })
            }     
            
          })    

    }
}  



