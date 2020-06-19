var http = require('http');
//Mongoose 'ı ekledik
var mongoose = require('mongoose');
//User Schema mız
var User = require('./user');

const uri = 'mongodb+srv://testUser:Test1234@cihankarsak.exgxd.mongodb.net/testDB';

mongoose.connect(uri, {useNewUrlParser: true }).then( () => {
  console.log('MongoDB ye bağlanti başarili')
})
.catch( (err) => console.error(err));


/**
 * Dinleyeceğimiz port numarasını aws içindeki environment larda PORT değişkeninden alalım eğer Port değişkeni yok ise default olarak 8081 portunu i dinleyelim.
 */
var port = normalizePort(process.env.PORT || '8081');

const express = require('express');
const app = express();


/**
 * bir get apisi ile ekrana mesajımızı yazdıralım
 */
app.get('/',(req,res) => {
    res.send("Uygulama başarılı ayağa kalktı");
})

/**
 * Şimdi portumuzu dinleyelim.
 */
app.listen(port, () =>{
    console.log("port dinlemek super oldu");
});

/**
 * Port numarası yok ise false, var ise number formatında döndürmek için kullanıyoruz.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }

/**
 * Body Parser
 */

/* BodyPaser*/
var bodyparser = require('body-parser');
var urlencoded = bodyparser.urlencoded({extended: false});

/* CRUD Fonksiyon Örneklerimiz */
/**
 * User Create edelim
 */
app.post('/create_user',urlencoded,(req,res) => {
  var user = new User({
    name: req.body.name,
    email:req.body.email
  });
  
  user.save().then(() => {
    console.log('kayit başarili');
    res.send(req.body.name + " isimli User kayit edildi");
  })
  .catch( (err) => res.send(error + " hatası alındı") );
})

/**
 * Read : İsme göre kayıtları listeleyelim
 */
app.post('/getUserList',urlencoded,(req,res) => {
  User.find({},(err,user) => {
    if (err){  
      throw err;
    }
    res.send(user);
  }).sort('name');
})

/**
 * Read : İsme göre kayıt getir
 */
app.post('/getUserByName',urlencoded,(req,res) => {
  User.find({name:req.body.name},(err,user) => {
    if (err){  
      throw err;
    }
    res.send(user);
  }).sort('name');
})


/**
 * Read : Id ye göre getir
 */
app.post('/getUserById',urlencoded,(req,res) => {
  User.findById(req.body.id,(err,user) => {
    if (err){  
      throw err;
    }
    res.send(user);
  })
})

/**
 * Read : Email adresine göre kayıt getir
 */
app.post('/getUserByWhereEmail',urlencoded,(req,res) => {
  User.find({},(err,user) => {
    if (err){  
      throw err;
    }
    res.send(user);
  }).where('email').equals(req.body.email);
})

/**
 * Read : Email adresi aynı olan kayıtlardan sadece bir tane kayıt getir
 */
app.post('/getUserByWhereEmailLimit',urlencoded,(req,res) => {
  User.find({},(err,user) => {
    if (err){  
      throw err;
    }
    res.send(user);
  }).where('email').equals(req.body.email).limit(1);
})

/**
 * UPDATE: Email adresi aynı olan kayıtlardan sadece bir tane kayıt getir
 */
app.post('/updateUser',urlencoded,(req,res) => {
  User.findById(req.body.id,(err,data) => {
    if (err){  
      throw err;
    }
    var oldName = data.name;
    data.name=req.body.updateName
   
    data.save((error) => {
      if (error){  
        throw error;
      }
      res.send(oldName + " isimli User ismi, " + req.body.updateName + " ismi ile güncellendi");
    });
  });
})


/**
 * DELETE: Email adresi aynı olan kayıtlardan sadece bir tane kayıt getir
 */
app.post('/deleteUser',urlencoded,(req,res) => {
  User.findById(req.body.id,(err,data) => {
    if (err){  
      throw err;
    }
    var deletedData = data;
    data.remove((error) => {
      if (error){  
        throw error;
      }
      res.send(deletedData.name + " isimli User silindi");
    });
  });
})