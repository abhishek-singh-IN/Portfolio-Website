function Validatecontactform()
{
    var x=document.forms["contact1"]["name"].value;
    if(x==""){
        alert("Name must be filled out");
        return false;
    }
}
let fname=document.getElementById('fname')
let submit=document.getElementById('submit')

submit.onclick=function (){
    let name=fname.value
    alert('Hello'+name)
}