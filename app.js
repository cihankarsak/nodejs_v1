var http = require('http');

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

