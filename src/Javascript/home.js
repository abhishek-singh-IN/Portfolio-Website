function Validatecontactform()
{
    var x=document.forms["contact1"]["name"].value;
    if(x==""){
        alert("Name must be filled out");
        return false;
    }
}