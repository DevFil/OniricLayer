// first little module
var xhr = new XMLHttpRequest();
setInterval(()=>{
    var data = "info=asd&origin=asd&date=date";
    xhr.open("GET", "http://localhost:3000/gate");
    xhr.send(data);
    console.log(this.responseText);
},2000)
