const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL || "mongodb://localhost:27017";
console.log("url",url)
const client = new MongoClient(url);

const dbName = 'ItemDB';


async function leseUebersicht() {
    let db, Itemcollection;
    try{
        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected successfully to server');
        db = client.db(dbName);
        Itemcollection = db.collection('Kurse');
    
        // the following code examples can be pasted here...
        const findResult = await Itemcollection.find({}).toArray();
        console.log('Found documents =>', findResult);
        return findResult;
    }catch(err){
        console.error(err.stack)
        throw err
    }finally{
        client.close()
    }
}

// async function leseUser(userName) {
//     try {
//       // Use connect method to connect to the server
//       await client.connect();
//       const db = client.db(dbName);
//       const collection = db.collection('User');
  
//       const findResult = await collection.find({'user': userName}).toArray();
//       console.log(`readUser(${userName})`, 'Found documents =>', findResult);
//       if (findResult.length > 0) {
//         return findResult[0];
//       } else {
//         return null;
//       }
  
//     } catch(err) {
//       console.error(`readUser(${userName})`, err.message);
//       throw err;
//     }
// }
  





// async function readkursdatum(id) {
//     let db, kurscollection;
//     console.log("readkursdatum",id);
//     try{
//         // Use connect method to connect to the server
//         await client.connect();
//         console.log('Connected successfully to server');
//         db = client.db(dbName);
//         kurscollection = db.collection('Kursdatum');
    
//         // the following code examples can be pasted here...
//         let query={"id":id};
//         const findResult = await kurscollection.find(query).toArray();
//         console.log('Found documents =>', findResult);
//         return findResult[0];
//     }catch(err){
//         console.error(err.stack)
//         throw err
//     }finally{
//         client.close()
//     }

// }

// async function createkursdatum(kursdatum) {
//     let db, kurscollection;
//     try{
//         // Use connect method to connect to the server
//         await client.connect();
//         console.log('Connected successfully to server');
//         db = client.db(dbName);
//         kurscollection = db.collection('Kursdatum');
    
//         console.log("vor dem insertMany",kursdatum)
//         const findResult = await kurscollection.insertMany([ kursdatum ]);
//         console.log('insert documents(kursdatum) =>', findResult);
//         return findResult;
//     }catch(err){
//         console.error(err.stack)
//         throw err
//     }finally{
//         client.close()
//     }
// }

// async function toggleAnwesend(kursdatumId, teilnehmerId) {
//     console.info(`toggleAnwesend(${kursdatumId},${teilnehmerId})`);
//     try{
//         await client.connect();
//         console.log('Connected successfully to server');
//         const db = client.db(dbName);
//         const kurscollection = db.collection('Kursdatum');

//         let kursdatums = await kurscollection.find({ id: kursdatumId }).toArray();
//         if (kursdatums && kursdatums.length > 0) {
//             let kursdatum = kursdatums[0];
            
//             let newValue = true;
//             for (let i=0; i<kursdatum.Teilnehmer.length; i++) {
//                 if (kursdatum.Teilnehmer[i].id == teilnehmerId) {
//                     newValue =  !kursdatum.Teilnehmer[i].anwesend;
//                     break;
//                 }
//             }
            
//             let query = { id: kursdatumId, "Teilnehmer.id": parseInt(teilnehmerId) };
//             let update = { $set: { "Teilnehmer.$.anwesend": newValue } };
//             console.info("toggleAnwesend()", kursdatumId, teilnehmerId, newValue, query, update);
//             let updateResult = await kurscollection.updateOne(
//                 query,
//                 update
//             );
//             console.log(`toggleAnwesend()`, 'updateResult =>', updateResult);
//             return newValue;
//         }   else {
//             // Fehler ausgeben!
//             console.log("Kursdatum nicht gefunden")
//             throw new Error(`toggleAnwesend() Kursdatum mit id=${kursdatumId} nicht gefunden!`);
//             }
//     }catch(err){
//         console.error(err.stack)
//         throw err
//     }finally{
//         client.close()
//     }
// }        

//Tabelle der User
//Entsprechende Zugriffsfunktionen

module.exports = {
    leseUebersicht,
    // createkursdatum,
    // readkursdatum,
    // toggleAnwesend,
    // leseUser,
}