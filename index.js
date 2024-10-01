const express = require("express");

const  app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended : true
}));

const productData =[];

app.listen(2000,()=>{
    console.log("Connected to the server at 200000")
})

//post api
app.post("/api/add_product",(req,res)=>{

    console.log("Result",req.body);
    const pdata= {
        "id": productData.length+1,
        "pname":req.body.pname,
        "pprice":req.body.pprice,
        "pdesc":req.body.pdesc
    };

    productData.push(pdata);
    console.log('Final ',pdata);

    res.status(200).send({
        "status_code":200,
        "message":"Product added Successfully",
        "product":pdata
    });


});

//get api
app.get("/api/get_product", (req,res)=>{
    if (productData.length>0){
        res.status(200).send({
            'status_code':200,
            'products':productData
        });
    }else{
        res.status(200).send({
            'status_code':200,
            'products':[]
        });

    }
});

//update api put

app.put("/api/update/:id", (req,res)=>{

    let id = req.params.id*1;
    let productToUpdate = productData.find(p=>p.id===id);
    let index =productData.indexOf(productToUpdate);

    productData[index]= req.body;

    res.status(200).send({
        'status':"success",
        'message':"Product updated",
        'updated_data':productData
    })
});

//delete api

app.post("/api/delete/:id",(req,res)=>{
    let id =req.params.id*1;
    let productToUpdate= productData.find(p=>p.id === id);
    let index = productData.indexOf(productToUpdate);

    productData.splice(index,1);

    res.status(204).send({
        'status':'success',
        'message':'Product deleted'
    })
})