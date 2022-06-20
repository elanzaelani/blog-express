module.exports=(app)=>{

    const homeController=require('../controllers/home.controller');
    const contactController=require('../controllers/contact.controller');
    const router = require('express').Router()
    const {cekDuplikat}=require('../controllers/contact.controller')
    const { body, validationResult ,check} = require('express-validator');

    //ROUTES 
    router.get('/',homeController.index),
    router.get('/contact/',contactController.contact),
    router.get('/contact/add',contactController.addContact)
    router.get('/contact/:nama',contactController.detail)
    router.post('/contact',
    [
      body('nama').custom((value)=>{
        const duplikat =cekDuplikat(value);
        if(duplikat){
          throw new Error('Nama sudah digunakan');
        }
        return true;
      }),
      check('email','Email tidak Valid').isEmail(),
      check('nohp','No HP tidak valid').isMobilePhone('id-ID')
    ],contactController.save)

 

    app.use('/', router);

    app.use('/', (req, res) => {
        res.status(404)
        res.send('<h1>404</h1>')
      })
}