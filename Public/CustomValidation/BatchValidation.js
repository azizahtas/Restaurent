function ItemDetailsValidation()
{
    if(!BatchValid())
    {
  
                   swal({   title: "Batch Present",  
                   text: "The Batch number is already present!\n Try editing the Details of that batch no.",
                   type: "error",   
                   allowEscapeKey:true,
                   allowOutsideClick:true,
                   confirmButtonColor: "#DD6B55",  
                   confirmButtonText: "Ok, Sorry!",   
                   closeOnConfirm: true
                });
            return false;
    }
    else
    {
        return true;
    }
}

function getXMLHttpRequest(){
      var xmlHttpReq = false;
      // to create XMLHttpRequest object in non-Microsoft browsers
      if (window.XMLHttpRequest) {
        xmlHttpReq = new XMLHttpRequest();
      } 
      else if (window.ActiveXObject) {
        try {
          // to create XMLHttpRequest object in later versions
          // of Internet Explorer
          xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (exp1) {
          try {
            // to create XMLHttpRequest object in older versions
            // of Internet Explorer
            xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (exp2) {
            xmlHttpReq = false;
          }
        }
      }
      return xmlHttpReq;
    };

function BatchValidation(str,Id)
    {
        var err="err2";
        var tmp="temp2";
        if (str.length==0) 
        { 
            document.getElementById(err).innerHTML=" Name Should not be Empty.";
            return false;
        }
        else{
                var xmlHttpRequest = getXMLHttpRequest();
                xmlHttpRequest.onreadystatechange =function()
                {
                    if (xmlHttpRequest.readyState < 4 && xmlHttpRequest.readyState > 0)
                    {
                        document.getElementById(err).innerHTML = "<img src='images/loading.gif' alt='checking...' width=25 height=25/>";
                    }
                    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200)
                    {
                        if(xmlHttpRequest.responseText.match("N"))
                        {
                            document.getElementById(err).innerHTML = "<img src='images/ok.png' alt='Name available' width=25 height=25/>";
                            document.getElementById(tmp).innerHTML = ".";
                        }
                        else if(xmlHttpRequest.responseText.match("Y"))
                        {
                            document.getElementById(err).innerHTML = "<img src='images/Wrong.png' alt='Name Used.' width=25 height=25/>";
                            document.getElementById(tmp).innerHTML = "..";
                        }
                        else
                        {
                            document.getElementById(err).innerHTML = "<img src='images/loading.gif' alt='checking...' width=25 height=25/>";
                            document.getElementById(tmp).innerHTML = "..";
                        }
                    }
                };
                var params="T=Batch&Id="+Id+"&Term="+str;
                xmlHttpRequest.open("POST", "CheckMe", true);
                xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xmlHttpRequest.send(params);
            };

    };
function BatchValid(){
    var msg = document.getElementById("temp2").innerHTML;  
    if(msg!='.'){
        return false;
    }
    else{
        return true;
    }
};