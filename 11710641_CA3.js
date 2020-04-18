var expr=require('express');
const hbs=require('hbs');
const _=require('lodash');
const fs=require('fs');

var app=expr();
const port=process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials')  

app.use((req,res,next)=>{  
    console.log("Running CA3 Project on "+ new Date().getDate()+ "/"+new Date().getMonth());   
    next();
})

app.use((req,res,next)=>{  
    var log=`${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('applogs.log',log+'\n',(err)=>{
        if(err)
        {
            console.log("Error Occured");
        }
    });
    next();
})

app.get('/',(req,res)=>{
    res.render('index.hbs');
    
    // res.send("<h2 style="text-align:center;">Welcome to Inventory Management System! <br> Enter inventory for inventory details. <br> Enter issue for issued inventory list. <br> Enter member for members list. </h2>")
})

app.get('/inventory',(req,res)=>{
    res.render('inventorylist.hbs',{
        
            i_id_1:'INV1',
            i_name_1:'Pen',
            qty_1:'20',
            i_id_2:'INV2',
            i_name_2:'White Chart',
            qty_2:'10',

          
    });
    
});

app.get('/issue',(req,res)=>{
    res.render('issuelist.hbs',{
            i_id_1:'INV1',
            i_name_1:'Pen',
            qty_1:'2',
            m_id_1:'M02',
            i_id_2:'INV2',
            i_name_2:'White Chart',
            qty_2:'1',
            m_id_2:'M01'

        
        
});

});

app.get('/members',(req,res)=>{
    res.render('memberlist.hbs',{
        
       m_id_1:'M01',
       m_name_1:'Thomas Shelby',
       m_id_2:'M02',
       m_name_2:'Harvey Spectre'

});

});


app.get('*',(req,res)=>{
    res.send("<center><h1>Error 404: Page Not Found</h1><center>")
})

//app.listen(3000);
    app.listen(port,()=>{
        console.log('Server is up on port',port);
    });