const Product = require("../Models/Product");
/*

exports.getAllproducts = async (req, res) => {
    try {
        const products= await Product.find()
      
        res.render('Products',{products})

    } catch (error) {
        res.status(500).render('error',{message:error.message})
    }
};*/
exports.getAllproducts = async (req, res) => {
  try {
    const products = await Product.find();

    // Vérifie la présence d'un paramètre de requête pour la vue
    if (req.query.view === "shoping") {
      res.render("shoping", { products });
    } else {
      res.render("Products", { products });
    }
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};
// detaille
exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).render("error", { message: "Product not found" });
    }
    res.render("detaille", { product });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

/*
exports.getSingleProduct = async (req, res) => {
    try {
        const {id}=req.params
        const product=await Product.findById(id)
        res.render('Product',product)
      
    } catch (error) {
        res.status(500).render('error',{message:error.message})

    }
};

*/

/*
exports.addSingleProduct = async (req, res) => {
    try {
        await  Product.create(req.body)
        res.redirect('/Products')
        
    } catch (error) {
        res.status(500).render('error',{message:error.message})

    }
};

*/

/*
exports.addSingleProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body); // Utilisez 'Product' au lieu de 'product'
        res.redirect('/products');
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
};
*/

exports.addSingleProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
      return res.status(400).render("error", {
        message: "All fields (name, price, description) are required.",
      });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    await newProduct.save();
    res.redirect("/products");
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).render("error", { message: error.message });
  }
};

exports.updateSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body);
    res.redirect("/Products");
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

exports.deleteSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/Products");
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};
