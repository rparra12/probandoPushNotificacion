const {Router} = require('express')
const router = Router();
const subscriptores = [];

const webpush = require('../webpush');
let pushSubcription;

router.post('/subscription', async (req, res) =>{
    pushSubcription = req.body;
    subscriptores.push(pushSubcription);
    res.status(200).json();
});

router.post('/new-message', async (req, res) =>{
    res.header('Access-Control-Allow-Origin', "*");
   res.header('Access-Control-Allow-Methods', 'POST');
   res.header("Access-Control-Allow-Headers", "accept, content-type");
   res.header("Access-Control-Max-Age", "1728000");
    console.log(subscriptores);
    const {message} = req.body;

    const payload = JSON.stringify({
        title: 'Titulo notificacion',
        message: message
    })

    try {
        for(var i = 0;i<subscriptores.length;i++){
            await webpush.sendNotification(subscriptores[i], payload); 
        }
        
        return res.send({"name":"GeeksforGeeks"});
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;