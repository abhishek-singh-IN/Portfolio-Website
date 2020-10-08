let fname=document.getElementById('fname')
let email=document.getElementById('email')
let subject=document.getElementById('subject')
let message=document.getElementById('message')
let submit=document.getElementById('submit')

submit.onclick=function (){
    let name=fname.value
    let address=email.value
    let sub=subject.value
    let messagetyped=message.value
    if(name=="")
    {
        alert("Name Can't Be Empty")
        window.location.replace("");
    }
    else if(address=="")
    {
        alert("E-mail Can't Be Empty")
    }
    else if(sub=="")
    {
        alert("Subject Can't Be Empty")
    }
    else if(messagetyped=="")
    {
        alert("Kindly Discribe your message")
    }
    else
    {
        var obj={
            Name:fname,
            Email:email,
            Subject:subject,
            Message:message
        };
        var myJSON=JSON.stringify(obj);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("demo").innerHTML = myJSON;
            }
        };
        xmlhttp.open("GET", "/contactform", true);
        xmlhttp.send();
        window.location.href = ""
        alert('Hello :'+name+". You Details have been submitted succesfully")
    }
}
