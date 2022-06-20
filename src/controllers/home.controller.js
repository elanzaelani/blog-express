exports.index= (req,res)=>{
    const mahasiswa =[
        {
             nama:"Mita",
             kelas :"PAI"
         },
         {
             nama:'Nadhifa',
             kelas:'Dokter'
         },
         {
             nama:"SISI",
             kelas:'PGSD'
         }
     
     ]
  
    res.render('index',{
        title:"Halaman Home",
        layout: 'layouts/template',
        mahasiswa
    })
}