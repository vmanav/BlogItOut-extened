// NOT USED IN CURREMNT VERSION


const { MongoClient } = require('mongodb')

var ObjectId = require('mongodb').ObjectID

const url = 'mongodb://localhost:27017';


const connectToDb = (dbName) => {
    return MongoClient.connect(url, { useNewUrlParser: true }).then(client => client.db(dbName))
}

const dbName = 'biodb'
const usersCollection = 'users'

connectToDb(dbName).then(db => {
    console.log("Connected Succesfully.")
})


const addNewUser = user =>
    connectToDb(dbName)
        .then(db => db.collection(usersCollection))
        .then(collection => collection.insertOne(user))

// NOTE *IMPORTANT* - ADD ERROR CHECK FOR USER ALREADY EXIST (duplicate email ID check)



// Deleting All Users in Database

// connectdb(dbName).then(db => {
//     const users = db.collection(usersCollection)
//     return users.deleteMany({})
// })
//     .then(() => console.log("Deleted All Users"))


function deleteAllUsers() {
    connectToDb(dbName).then(db => {
        const users = db.collection(usersCollection)
        return users.deleteMany({})
    })
        .then(() => {
            console.log("Deleted All Users")
        })
}

// addNewUser({
//     name: "Ron",
//     age: "19",
//     skill: "Magic",
// })


// function getAllUsers() {
//     console.log("in getAllUsers fn")

//     return connectToDb(dbName).then(db => {
//         return db.collection(usersCollection).find()
//     })
//         .then(userCursor => userCursor.toArray())
//         .then((usersArray) => {
//             if (usersArray.length == 0)
//                 console.log("0 Blogs in database.")
//             else {
//                 console.log(usersArray)
//                 // to get the id of blogs in blogsArray
//                 // blogsArray.forEach ( (t)=> {
//                 //     console.log(t._id)
//                 // })
//             }
//         })
//         .then(() => {
//             console.log("---------------->")
//             // to check the completeion
//         })
// }
// getAllUsers();


module.exports = {
    addNewUser
}