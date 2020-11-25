// Use ES6 Imports for mongodb and our mongo client
import mongodb from 'mongodb';
const mongoClient = mongodb.MongoClient;

let dbName = "manuelas_db";
// connection string
const uri = "mongodb+srv://testuser:password1234@cluster0.er9af.mongodb.net/manuelas_db?retryWrites=true&w=majority";

export const getCollectionDocumentByDate = async (collectionName, date) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uriMood, { useUnifiedTopology: true })
    // Retrieve our collection
    console.log("we are looking in this collection.." + collectionName);
    console.log("We are looking for this date..." + date)
    const dataCollection = await mongo.db(dbMood).collection(collectionName).findOne( { "date": date } );
    // Close our connection
    mongo.close();
    return dataCollection;
}

export const getCollectionDocuments = async (collectionName) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    const dataCollection = await mongo.db(dbName).collection(collectionName).find({}).toArray();
    // Close our connection
    mongo.close();
    return dataCollection;
}
export const createCollectionDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Create our document
    if (!data._id) {
        data._id = new mongodb.ObjectID().toString();
        await mongo.db(dbName).collection(collectionName).insertOne(data)
    } else {
        updateCollectionDocument(collectionName, data);
    }
    // Close our connection
    mongo.close();
}
export const updateCollectionDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    var myquery = { _id: new mongodb.ObjectID(data._id) };
    var newvalues = { $set: data };
    await mongo.db(dbName).collection(collectionName).replaceOne(
        { _id : data._id },
        data, 
        { upsert: true} 
    );
    // Close our connection
    mongo.close();
}

export const deleteCollectionDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    // Retrieve our collection
    await mongo.db(dbName).collection(collectionName).deleteOne(
        { _id : data._id }
    );
    // Close our connection
    mongo.close();
}

// linked with new database where we keep track of the mood

let dbMood = "mood_db";
// connection string
const uriMood = "mongodb+srv://testuser:password1234@cluster0.er9af.mongodb.net/mood_db?retryWrites=true&w=majority";

export const getMoodDocuments = async (collectionName) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uriMood, { useUnifiedTopology: true })
    // Retrieve our collection
    const dataCollection = await mongo.db(dbMood).collection(collectionName).find({}).toArray();
    // Close our connection
    mongo.close();
    return dataCollection;
}


export const createMoodDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uriMood, { useUnifiedTopology: true })
    // Create our document
    if (!data._id) {
        data._id = new mongodb.ObjectID().toString();
        await mongo.db(dbMood).collection(collectionName).insertOne(data)
    } else {
        updateMoodDocument(collectionName, data);
    }
    // Close our connection
    mongo.close();
}


export const updateMoodDocument = async (collectionName, data) => {
    // Connect to our database / open our connection
    const mongo = await mongoClient.connect(uriMood, { useUnifiedTopology: true })
    // Retrieve our collection
    const id = new mongodb.ObjectID(data._id).toString();
    var myquery = { _id: id };
    var newvalues = { $set: data };

    console.log("We are going to UPDATE this mood")
    console.log(data);
    data._id = id;

    await mongo.db(dbMood).collection(collectionName).replaceOne(
        { _id : data._id },
        data, 
        { upsert: true} 
    );
    // Close our connection
    mongo.close();
}

