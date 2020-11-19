var dbConn  = require('../../config/db.config');

var Dog = function(Dog){
    this.name     =   Dog.name;
    this.breed    =   Dog.breed;
    this.color    =   Dog.color;
    this.created_at   =   new Date();
    this.updated_at   =   new Date();
}
// name, breed,, color, created_at, updated_at
// get all Dogs
Dog.getAllDogs = (result) =>{
    dbConn.query('SELECT * FROM Dogs WHERE is_deleted=0', (err, res)=>{
        if(err){
            console.log('Error while fetching Dogs', err);
            result(null,err);
        }else{
            console.log('Dogs list fetched successfully');
            result(null,res);
        }
    })
}

// get Dog by ID from DB
Dog.getDogByID = (id, result)=>{
    dbConn.query('SELECT * FROM Dogs WHERE id=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching Dog by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// create new Dog
Dog.createDog = (DogReqData, result) =>{
    dbConn.query('INSERT INTO Dogs SET ? ', DogReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('Dog created successfully');
            result(null, res)
        }
    })
}


Dog.updateDog = (id, DogReqData, result)=>{
    dbConn.query("UPDATE Dogs SET name=?,breed=?,color=?,created_at=?,updated_at=? WHERE id = ?", [DogReqData.name,DogReqData.breed,DogReqData.color,DogReqData.created_at,DogReqData.updated_at, id], (err, res)=>{
        if(err){
            console.log('Error while updating the Dog');
            result(null, err);
        }else{
            console.log("Dog info updated successfully");
            result(null, res);
        }
    });
}

// delete Dog
Dog.deleteDog = (id, result)=>{
    // dbConn.query('DELETE FROM Dogs WHERE id=?', [id], (err, res)=>{
    //     if(err){
    //         console.log('Error while deleting the Dog');
    //         result(null, err);
    //     }else{
    //         result(null, res);
    //     }
    // })
    dbConn.query("UPDATE Dogs SET is_deleted=? WHERE id = ?", [1, id], (err, res)=>{
        if(err){
            console.log('Error while the Dog');
            result(null, err);
        }else{
            console.log("Dog deleted successfully");
            result(null, res);
        }
    });
}

module.exports = Dog;