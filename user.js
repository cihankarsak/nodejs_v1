var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String, 
    createDate: Date
});

/**
 * Save komutunda önce çalış ve create Date'i setle
 */
userSchema.pre('save',function (next){
    var cDate = new Date();
    this.createDate = cDate;
    next();
})

var User = mongoose.model('User',userSchema);

module.exports = User