const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(promptdata)
};

fetch('/gallery', options).then(response => {
    console.log(response)
    return response.text();
}).then(data => {
    // console.log(data)
    const obj = JSON.parse(data);
    Object.keys(obj).forEach(key => {
        let link = obj[key].link;
        let c_data = link.replace(/"/g, '');
        var aimg = document.createElement("img");
        aimg.src = c_data
        document.getElementById('gallerypush').appendChild(aimg);
      });

   
    //   return data;
}).catch(ex => {
    console.error(ex);
})
