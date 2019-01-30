const mongoose = require('mongoose')

//建表
let personSchema = new mongoose.Schema({
    name:String,
    age: Number
})

//导出PERSON 用上边建的规则
module.exports =  mongoose.model('Person',personSchema)