const {Router} = require('express')
const router = Router();
const cors = require('cors')
const subscriptores = [];
let pushSubcription = [];

const webpush = require('../webpush');


router.use(cors({
    origin: '*'
}));

router.post('/subscription', async (req, res) =>{
    pushSubcription = req.body;
    res.status(200).json();
});

router.post('/new-message', async (req, res) =>{
 
        const message = req.body;
        console.log("Hola")
        console.log(message.sub)

        const payload = JSON.stringify({
            title: 'Titulo notificacion',
            message: message.message
        })
    
        try {
            if(message.sub != undefined){
                if(message.sub.length>1){
                    for (var i=0;i<message.sub.length;i++){
                        await webpush.sendNotification(message.sub[i], payload); 
                    }
                }else{
                    await webpush.sendNotification(message.sub, payload); 
                }
                
                res.json({ msg: message.sub})
            }else{
                res.json({ msg: message })
            }
                
        } catch (error) {
            res.json({ msg: error })
        }
    
    
})


module.exports = router;