

require('dotenv').config()
const express = require('express');
const path = require('path');
const {leseUebersicht, leseItems} = require('./services/mongoservice');
const app = express();
//const Logger = require("./models/Logger");

// /**
//  * mit @logger .log kann ein die @Logger Klasse aufgerufen
//  * und eine vordefinierte Anzahl von Nachrichten @msg in der Konsole angezeigt werden.
//  * Die @Logger Klasser kann alle Konsole-Ausgaben auf einmal aktivieren oder deaktiveren, zb. den @DEBUG_MODE  
//  */
//let logger = new Logger()

// // eslint-disable-next-line no-undef
//logger.log("Debug mode mit logger",process.env.DEBUG_MODE)
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
//pug wird als View-Engine festgelegt 
app.set(`view engine`, `pug`);
// eslint-disable-next-line no-undef
app.set(`views`, path.join(__dirname, `views`));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, '../public')));

app.get(`/favicon.ico`,(req, res) => res.status(204));

/**
 * Aufruf zur Ausführung der ersten Webseite
 * @param req http request
 * @param res http response
 * @returns liefert Webseite oder Fehlerstatus
 **/

app.get('/', async (req, res) => {
  try{ 
    let Items = await leseUebersicht()
    let kursarray = []
    kurse.forEach((item) => { 
      let id = item [0]
      let name = item [1]
      if (name !== "Training Bahrenfeld" && name !== "Gesamt" ) {
        let wotag = Math.floor (id/10)
        let obj = {id: id, Name: name, Wotag: wotag}
        kursarray.push(obj)
      }
    })
    res.render('index', {
      kurse: kursarray
    })// end render
    
  }catch(err){
    res.status(500).send(err.message)
  }
});

/**
 * Aufruf für die zweite Webseite.
 */
// app.get('/datum/:kursnr', async (req, res) => {
  
//   checkToken(req, res);
//   let kursnr= req.params.kursnr;
//   logger.log(kursnr)
//   let kursrow = await leseKurs(kursnr);
//   let kurs = {Name: kursrow[1], id:kursrow[0],Wotag: Math.floor (kursrow[0]/10)}
//   let Wotag = kurs.Wotag;
//   let datums = calcDatum(Wotag);
//   logger.log(datums);
//   res.render('datum', {
//     datums: datums, kursnr: kursnr
//   });
  
//});

// Aufruf für die dritte Webseite
// app.get('/teilnehmer/:kursid', async (req, res) => {
//   checkToken(req, res);
//   let kursid= parseInt(req.params.kursid);
//   let daturl= req.query.datum;
//   let teilnmrs;
//   let kd= await readkursdatum(kursid+daturl.replaceAll(".","_"))
//   //logger.log(kd)
//   if (!kd)
//   {
//     let rows = await leseTeilnehmer(kursid);
//     //console.log ("nach leseTeilnehmer", rows)
//     let teilnehmers = []
//     rows.forEach((row) => {

//       let tn = {Vorname: row[2], Nachname: row[3], id:parseInt(row[14]), anwesend: false}
//       teilnehmers.push(tn)
       
//     })
//     teilnehmers.sort((row1 , row2) => {
//       if (row1.Vorname < row2.Vorname) {
//         return -1  
//       }
//       else if (row1.Vorname > row2.Vorname) {
//         return +1
//       }
//       else {
//         return 0
//       }
//     })
//     let kursdatum = {id: kursid+daturl.replaceAll(".","_"), Teilnehmer: teilnehmers}  
//     await createkursdatum(kursdatum);
//     teilnmrs = teilnehmers
//   }
//   else{
//     teilnmrs= kd.Teilnehmer;
//   }
//   res.render('teilnehmer', {
//     teilnmr: teilnmrs, kursnr: kursid, datum: daturl, 
//   });
// });

// eslint-disable-next-line no-undef
/**
 * Diese Variable @const Port, wurde durch die ENV überschrieben
**/
const port = (process.env.PORT || 3000);
//npm zeigt an, welcher Port ausgewählt ist

app.listen(port, () => {
    //logger.log(`Server listening on Port ${port}`);

});

console.log("Hier passeirt noch nicht viel")
console.log("aber zumindest gibt es keinen Fehler")