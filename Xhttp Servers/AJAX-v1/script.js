const btn = document.getElementsByClassName("btn")[0]
let loadDoc = (src) => {
    const xhttp = new XMLHttpRequest()
    console.log(xhttp.readyState, xhttp.statusText)
    xhttp.open("GET", src);
    console.log(xhttp.readyState, xhttp.statusText)
    xhttp.setRequestHeader('Accept','text/plain')
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4) {

            if (this.status === 200) {
                document.getElementsByClassName("child")[0].innerHTML =
                    this.responseText;
            } else {
                document.getElementsByClassName("child")[0].innerHTML =
                    `HTTP error: ${this.status}`;
            }
        }
        console.log(this.getAllResponseHeaders())
    };
    xhttp.onerror = (event) => {
        if (xhttp.status !== 200)
            document.getElementsByClassName("child")[0].innerHTML = (`http response not received! status code": ${event.target.status}`) //catches only network errors!
    }
    xhttp.send();
    console.log("Cookies:", document.cookie);
}
btn.addEventListener("click", (event) => {
    loadDoc("https://jsonplaceholder.typicode.com/users/1")
})