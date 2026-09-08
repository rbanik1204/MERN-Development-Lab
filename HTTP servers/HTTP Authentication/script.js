const form = document.querySelector(".form");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log(event)
    const username = document.querySelector("#username").value ;
    const password = document.querySelector("#password").value;
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://[::1]:3000");
    xhttp.onreadystatechange = (event)=>{
        if(xhttp.readyState == 4 ){
            if (event.target.status === 200) {
                document.getElementById("message").innerHTML =
                    event.target.responseText;
                    document.getElementById("message").style.color="white"
                console.log(event.target.responseText)
                console.log(xhttp.getResponseHeader("Content-Type"))
            } else {
                document.getElementById("message").innerHTML =
                    `HTTP error: ${event.target.status}`;
            }
        }
    }
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify({username: username ,
                                password: password
    }));
})