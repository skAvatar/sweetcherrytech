
module.exports = function(app){
	const { check, validationResult } = require('express-validator/check');
	var Product = require ('../models/product');

	// GET ALL
	findAllProducts = function(req, res){

		let search = { active: true };
		if(req.query.nameProduct != undefined){
			var nameP = req.query.nameProduct;
			search.nameProduct = new RegExp(nameP);
		}
		Product.find(search, function(err, product){
			if(!err) res.json(product);
			else console.log('Fail in method findAllProducts: ' + err);
		});
	};

	// GET ONE
	findById = function(req, res){				
		Product.findById(req.params.id, function(err, product){
			if(!err) res.json(product);
			else console.log('Fail in method findById: ' + err);
		});
	};

	// DELETE ONE
	deleteById = function(req, res){
		Product.findById(req.params.id, function(err, product){
			console.log('req.params.id: ' + req.params.id);
			//console.log('product: ' + product);
			product.active = false;
			product.save(function(err){
				if(!err) console.log('Product saved');
				else console.log('Fail in method deleteById: ' + err);
			});
			if(!err) res.json(product);
			else console.log('Fail in method deleteById: ' + err);
		});
	}

	// POST ONE 
	addProduct = function(req, res){
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		    return res.status(400).json({ errors: errors.array() });
		}
		
		console.log('Post Body: nameProduct ' + req.body.nameProduct);
		console.log('Post Body: description ' + req.body.description);
		console.log('Post Body: price ' + req.body.price);
		//console.log('Post Body: imageUrl ' + req.body.imageUrl);

		var product = new Product ({
			nameProduct: req.body.nameProduct,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
			price: req.body.price,
			active: true
		});

		product.save(function(err){
			if(!err) console.log('Product saved');
			else console.log('Fail in method addProduct: ' + err);
		});

		res.send(product);
	};

	// PATCH
	patchProduct = function(req, res){
		console.log('Post Body: nameProduct ' + req.body.nameProduct);
		console.log('Post Body: description ' + req.body.description);
		console.log('Post Body: imageUrl ' + req.body.imageUrl);

		Product.findById(req.params.id, function(err, product){
			if(err) {
				console.log('Fail in method patchProduct: ' + err);
				return;
			}
			
			product.nameProduct =  req.body.nameProduct,
			product.description = req.body.description,
			product.imageUrl = req.body.imageUrl,
			res.json(product);

			product.save(function(err){
				if(!err) console.log('Product patched');
				else console.log('Fail in method addProduct: ' + err);
			});
		});

	};

	// API Routes
	app.get('/products', findAllProducts);
	app.get('/products/:id', findById);
	app.post('/products', 
		[check("nameProduct").not().isEmpty(),
		 check("price").isNumeric()], 
        addProduct);
	app.delete('/products/:id', deleteById);
	app.patch('/products/:id', patchProduct);

}