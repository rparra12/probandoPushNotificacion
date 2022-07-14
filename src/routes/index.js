const {Router} = require('express')
const router = Router();
const cors = require('cors')
const subscriptores = [];

const webpush = require('../webpush');
let pushSubcription;

router.use(cors({
    origin: '*'
}));

router.post('/subscription', async (req, res) =>{
    pushSubcription = req.body;
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
        await webpush.sendNotification(subscriptores, payload); 
        
        res.json({ msg: subscriptores })
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;