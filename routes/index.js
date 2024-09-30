var express = require('express');
var router = express.Router();

const {connect} = require("mongoose");
const mongoose = require("mongoose");
const res =require("express/lib/response");
//URL ket noi mongoose
const mongoURI = 'mongodb+srv://tuyenmoc2k4:12345678t@cluster0.jm4sz.mongodb.net/';
//Ket noi mongoose
connect(mongoURI,{
  useNewUrlParser:true,
  useUnifiedTopology: true,
})
    .then(()=> {
      console.log('Ket noi mongoose thanh cong');
    })
    .catch(()=> {
      console.error('Ket noi mongoose that bai',err);
    });

/* GET home page. */
router.get('/', function(req, res, next) {
    // viet các câu lệnh truy vấn tại đây
    User.find({}).then((users) => {
        res.render('index', { title: 'Express',name: "ABC", users: users });
    })
});


router.get('/AddForm', function(req, res, next) {
  res.render('addform',{title: 'Add'});
})

const userSchema
  = new mongoose.Schema({
    name : String,
    password : String,
    email : String,
    age : Number,
    phone : Number,
})

const User = mongoose.model('User',userSchema);

router.post('/add',function(req,res){
    const name = req.body.name;
    const password  = req.body.password;
    const email = req.body.email;
    const age = req.body.age;
    const phone = req.body.phone;
    const newUser = new User({
        name : name,
        password : password,
        email : email,
        age : age,
        phone : phone,
    })
    newUser.save().then(()=>{
        res.send("Thêm User thành công");
    }).catch(()=>{
        res.send(error);
    })
})

router.get('/getUserID/:id', function (req){
    const id = req.params.id;
    User.findById(id).then((user) => {
        res.send(user)
    }).catch((error) => {
        let data = {
            errorCode : 200,
            message: error.message
        }
        res.send(data)
    })
})

router.get('/deleteUser/:id',function (req,res){
    const id = req.params.id;
    let data = {
        errorCode : 200,
        message: "Xoa thanh cong"
    }
    User.findByIdAndDelete(id).then((user) => {
        res.send(data)
    }).catch((error) => {
        data.msg = error.message;
        res.send(data)
    })
})

// hien thi form edit user co id = :id
router.get('/updateUser/:id', function (req, res) {
    const _id = req.params.id;
    // có thể viết câu lệnh truy vấn lấu thông tin user tại đây rồi
    // gửi vào edit để hiển thị
    res.render('edit', {_id: _id})
})

router.post('/editUser', function (req, res) {
    const _id = req.body._id;
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const age = req.body.age;
    const phone = req.body.phone;
    User.findByIdAndUpdate({_id: _id}, {
        name: name,
        password: password,
        email: email,
        age: age,
        phone: phone
    }, {new : true}).then((user) => {
        res.send("Cập nhật thành công : " + user.name)
    }).catch((error) => {
        res.send(error)
    })
})

module.exports = router;
