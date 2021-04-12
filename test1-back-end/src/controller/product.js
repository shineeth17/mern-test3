const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify')

exports.createProduct = (req, res)=>{
    // res.status(200).json({ file: req.file, body: req.body});
    const{ name, price, description, productPictures, category, createdBy}= req.body;
    
    
    const product = new Product({
        name :name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        createdBy : req.user._id
    });
    product.save(((error, product) => {
        if(error) return res.status(400).json({error});
        if(product){
            res.status(201).json({product});
        }
    }));
};