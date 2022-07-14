const {Router} = require('express')
const router = Router();
const cors = require('cors')
const subscriptores = [];

const webpush = require('../webpush');
let pushSubcription;

router.use(cors());

router.post('/subscription', async (req, res) =>{
    pushSubcription = req.body;
    subscriptores.push(pushSubcription);
    res.status(200).json();
});

router.post('/new-message', async (req, res) =>{

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