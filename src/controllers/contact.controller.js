const fs =require('fs')
const express =require('express');
const { body, validationResult } = require('express-validator');

// const session = require('express-session')
// const cookieParser =require('cookie-parser')
const flash= require('connect-flash')

const app = express();

//Konfigurasi Flash Message
// app.use(cookieParser('secret'))
// app.use(session({
//     cookie : {maxAge:6000},
//     secret :'secret',
//     resave : true,
//     saveUninitialized: true
// }))
app.use(flash());





//Menampilkan data Kontak 
exports.contact = (req,res)=>{
    const contacts =loadContact();
    res.render('contact',
    {
        title :'Halaman-Kontak',
        layout:'layouts/template',
        contacts,
        msg : req.flash('msg'),
    })
}

exports.detail =(req,res)=>{
    const contact = findContact(req.params.nama);
    
    res.render('detailContact',
    {
        title :"Halaman-Detail-Kontak",
        layout:'layouts/template',
        contact


    })
}
    exports.addContact=(req,res)=>{
        
        res.render('addContact',
        {
            title :"Halaman-Tambah Kontak",
            layout:'layouts/template',
           
        })
    }

    exports.save= (req,res)=>{
        const errors =validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            res.render('addContact',{
                title : 'Form Tambah Data kontak',
                layout: 'layouts/template',
                errors: errors.array()
                
            })
          }else{

              console.log(req.body)
              addContact(req.body);
              //kirimkan flash message
              req.flash('msg', 'Mantap Data Kontak berhasil ditambahkan')
              res.redirect('/contact');
          }
      
    }

const loadContact= ()=>{
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts=JSON.parse(fileBuffer);
    return contacts;
}

//cari Konttak berdasarkan nama
const findContact = (nama)=>{
    const contacts= loadContact();
    const contact = contacts.find((contact)=>contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

//Menulis dan menimpa file json degan data Baru
const saveConntacts =(contacts)=>{
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}

//Menambahkan data Kontak baru
const addContact= (contact)=>{
    const contacts =loadContact();
    contacts.push(contact)
    saveConntacts(contacts)

}

//Cek Nama yang duplikat
const cekDuplikat=(nama)=>{
    const contacts =loadContact();
    return contacts.find((contact)=> contact.nama === nama);
}

module.exports.cekDuplikat = cekDuplikat;