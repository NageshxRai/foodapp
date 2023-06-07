//About mongoose here
const mongoose = require ('mongoose');
const mongoURI = 'mongodb+srv://Foodiez:foodiez123@foodiez.tlf8b95.mongodb.net/foodiez?retryWrites=true&w=majority'
const mongoDbConnection = async () =>{
   //database connection using mongoose
   await mongoose.connect (mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
  })
  .then (()=>{
    console.log("MongoDB connected")
    //Data fetching from database
    const fetched_data = mongoose.connection.db.collection("food_items");
    fetched_data.find({}).
    toArray() 
    .then(async (data)=>{
      const foodCategory = await mongoose.connection.db.collection("food_category"); 
      foodCategory.find({}).toArray()
      .then((catData)=>{
        global.food_items = data;
         global.foodCategory= catData;
      })
  
    })
    .catch((err)=>{
        console.log('Data retriving failed!', err)
    })
  })
  .catch((err)=>{
    console.log('Connection failed', err)
  })
}
    
module.exports = mongoDbConnection;
 