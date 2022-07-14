const PUBLIC_VAPID_KEY = 'BBoo9vWf710TvujEsmg-n6bFsJZUp3OSUMUQeSCPmYVg_23nBtY-rYM-F82xd_UBGOwN9PqF1-5giEexaHuPqrQ';

let subcription;
const subscription = async () => {

    //ServiceWorker
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });

    subcription= await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: PUBLIC_VAPID_KEY
    });

    console.log(JSON.stringify(subcription));

    /*await fetch('/subscription', {
        method: 'POST',
        body: JSON.stringify(subcription),
        headers: {
            "Content-type": "application/json"
        }
    });*/

}

const form = document.querySelector('#envio');
const mensaje = document.querySelector('#mensaje');
//const form = document.querySelector('#envio');

form.addEventListener('submit', e =>{
    e.preventDefault();
    fetch('/new-message', {
        method: 'POST',
        body: JSON.stringify({message: mensaje.value, sub: subcription}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {console.log(res.json())});

    form.reset();
})

subscription();