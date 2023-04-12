import fetch from 'node-fetch';
import  express from 'express';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

var app = express()
// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var image_link;
var tired = "tired"
var tentacles = "insect legs"
var eerie = "mid century medical equipment"

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


// callApi();
app.use(express.static('public'))

app.post('/api', (request, response, next) => {
    console.log("i got a request");
    // console.log(request.body);

    const text2img = request.body;
    let prompt1 = text2img.p1
    let prompt2 = text2img.p2
    console.log(prompt1, prompt2)
    // next();
    var outputimage = callApi(prompt1, prompt2);
    console.log(outputimage);
    outputimage.then((data) => {
      var JSONdata = JSON.stringify(data.output.output_images.protogen_5_3[0]);
      console.log(JSONdata);
      response.send(JSONdata);
      return;
    }).catch((err) => {
      console.error(err)
    });
  
  })
 // Server setup
 app.listen(4000 , ()=>{
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
  