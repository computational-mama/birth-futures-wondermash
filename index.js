import fetch from 'node-fetch';
import  express from 'express';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
const port = process.env.PORT || "8080";
var appExpress = express()
// For parsing application/json
appExpress.use(express.json());
 
// For parsing application/x-www-form-urlencoded
appExpress.use(express.urlencoded({ extended: true }));

var image_link;
var tired = "tired"
var tentacles = "insect legs"
var eerie = "mid century medical equipment"

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }




  
// callApi();
appExpress.use(express.static('public'))

appExpress.post('/api', (request, response, next) => {
    console.log("i got a request");
    // console.log(request.body);

    const text2img = request.body;
    let prompt1 = text2img.p1
    let prompt2 = text2img.p2
    console.log(prompt1, prompt2)
    // next();
    var outputimage = callApi(prompt1, prompt2);
    // var fullprompt = "an archival photograph of a tired ((young)) indian (((mother))) with" + prompt1 +", in the background there is" + "("+prompt2+")" + "inside a bombay hospital, cinematic, film noir, grainy, ilford, hasselblad, albumen print"
    console.log(outputimage);
    outputimage.then((data) => {
        // writeNewPost(fullprompt, data)
      var JSONdata = JSON.stringify(data.output.output_images.protogen_5_3[0]);
      console.log(JSONdata);
      response.send(JSONdata);
      return;
    }).catch((err) => {
      console.error(err)
    });
  
  })
 // Server setup
 appExpress.listen(port , ()=>{
     console.log("server running");
 });

 async function callApi(p1, p2) {
    const response = await fetch("https://api.gooey.ai/v2/CompareText2Img/", {
      method: "POST",
      headers: {
          "Authorization": "Bearer " + process.env.GOOEY_API_KEY,
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "seed": getRandomInt(3008484884),
        "text_prompt": "an archival photograph of a tired ((young)) indian (((mother))) with (((" + p1 +"))), in the background there is" + "(("+p2+"))" + "inside a bombay hospital, cinematic, film noir, grainy, ilford, hasselblad, albumen print",
        "negative_prompt": "out of frame, old, older woman, modelshoot"
      }),
    });
    console.log("an archival photograph of a tired ((young)) indian (((mother))) with" + p1 +", in the background there is" + "("+p2+")" + "inside a bombay hospital, cinematic, film noir, grainy, ilford, hasselblad, albumen print")
    const data = await response.json();
    image_link = data.output.output_images.protogen_5_3[0]
    console.log(response.status, image_link);
    return data
  }
  

//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "firebase/app";
//   import { getAnalytics } from "firebase/analytics";
//   import { getDatabase, ref, child, push, update } from "firebase/database";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC4tAaD5F1uoY06KOBiIUUMkYmEqpKHLHE",
//   authDomain: "archive-lost-mothers.firebaseapp.com",
//   projectId: "archive-lost-mothers",
//   storageBucket: "archive-lost-mothers.appspot.com",
//   messagingSenderId: "292387369053",
//   appId: "1:292387369053:web:a4795e1310d4b651881db4",
//   measurementId: "G-Z420Y6VGSP",
//   databaseURL: "https://archive-lost-mothers-default-rtdb.asia-southeast1.firebasedatabase.app",

// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// function writeNewPost(prompt, link) {
//   const db = getDatabase();

//   // A post entry.
//   const postData = {
//     prompt: prompt,
//     link: link,
//     // startedAt: firebase.database.ServerValue.TIMESTAMP
//   };

//   // Get a key for a new Post.
//   const newPostKey = push(child(ref(db), 'link')).key;

//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   const updates = {};
//   updates['/posts/' + newPostKey] = postData;
//   updates['/user-posts/' + '/' + newPostKey] = postData;

//   return update(ref(db), updates);
// }