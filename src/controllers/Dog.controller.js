// my Dog controller
const DogModel = require('../models/Dog.model');

// get all Dog list
exports.getDogList = (req, res)=> {
    //console.log('here all Dogs list');
    DogModel.getAllDogs((err, Dogs) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Dogs', Dogs);
        res.send(Dogs)
    })
}

// get Dog by ID
exports.getDogByID = (req, res)=>{
    //console.log('get emp by id');
    DogModel.getDogByID(req.params.id, (err, Dog)=>{
        if(err)
        res.send(err);
        console.log('single Dog data',Dog);
        res.send(Dog);
    })
}

// create new Dog
exports.createNewDog = (req, res) =>{
    const DogReqData = new DogModel(req.body);
    console.log('DogReqData', DogReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        DogModel.createDog(DogReqData, (err, Dog)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'New Dog was inserted Successfully', data: Dog.insertId})
        })
    }
}

// update Dog attributes
exports.updateDog = (req, res)=>{
    const DogReqData = new DogModel(req.body);
    console.log('DogReqData update', DogReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        DogModel.updateDog(req.params.id, DogReqData, (err, Dog)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Dog updated Successfully'})
        })
    }
}

// delete Dog record by id
exports.deleteDog = (req, res)=>{
    DogModel.deleteDog(req.params.id, (err, Dog)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Dog deleted successully!'});
    })
}