let fname=document.getElementById('fname')
let submit=document.getElementById('submit')

submit.onclick=function (){
    let name=fname.value
    if(name=="")
    {
        alert("Name Can't Be Empty")
    }
    else
    {
        alert('Hello :'+name+". You Details have been submitted succesfully")
    }
}