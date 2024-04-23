const mongo_db = require("mongoose")
mongo_db.connect("mongodb://localhost:27017/details").then(
    ()=>{
        console.log("Connected!")
    }
).catch(
        (e)=>{
        console.log(e)
}
)
