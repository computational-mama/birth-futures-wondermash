

var loader = document.getElementById("lds-ellipsis");
// loader.style.display = "none"
function submitMe() {
    // form.submit();
    // console.log(form)
    loader.style.display = "inline-block"
    var prompting1 = document.getElementById("prompt1").value
    var prompting2 = document.getElementById("prompt2").value
    console.log(prompting1,prompting2)
    if(prompting1 !== "" && prompting2 !== ""){
        sendData(prompting1,prompting2)
    }

};


async function sendData(prompt1, prompt2) {
    
    const promptdata = { 
        "p1" : prompt1,
        "p2" : prompt2
     };
     
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(promptdata)
    };

    fetch('/api', options).then(response => {
        console.log(response)
        return response.text();
    }).then(data => {
        console.log(data)
        loader.style.display = "none"
        if(data!= ""){
            let c_data = data.replace(/"/g, '');
            var aimg = document.getElementById("addimage");
            aimg.src = c_data
            document.getElementById('imagepush').appendChild(aimg);
        } else {
            const t = document.createElement('p')
            t.innerHTML('loading...')
        }
       
        //   return data;
    }).catch(ex => {
        console.error(ex);
    })

}


// sendData(prompting1,prompting2)