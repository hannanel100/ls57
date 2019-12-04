const BASE_URL = 'http://localhost:3201/';
const form = document.getElementById("form");
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const phone = document.getElementById('phone').value + '';
    const responseStatus = getData(BASE_URL + 'login/' + phone).then(res => {

        if (res.status === 202) {
            console.log("success");
            otpFromUser(phone);
        }
        else if (res.status === 401) {
            console.log("not authorized")
        }
    })
})


async function getData(url) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        // body data type must match "Content-Type" header
    });
    return await response; // parses JSON response into native JavaScript objects
}

async function otpFromUser(phone) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    container.innerHTML = `
    <form class="form-signin" id="otp-form">
            <h2 class="form-signin-heading">Please enter OTP number</h2>
            <label for="OTP" class="sr-only">OTP Number: </label>
            <input type="number" id="OTP" class="form-control" placeholder="OTP number" required autofocus>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    `
    const form = document.getElementById("otp-form");
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const otp = document.getElementById('OTP').value;
        const userData = await getData(BASE_URL + 'user/' + otp + ';' + phone);
        const data = await userData.json();
        console.log(data);
        const container = document.getElementById('container');
        container.innerHTML = '';
        container.innerHTML = `
        <h2 >Hello ${data[0].first} ${data[0].last}</h2>
        `

    })
}