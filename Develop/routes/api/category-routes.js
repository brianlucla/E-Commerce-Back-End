const router = require('express').Router();
const { Model } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({include:[Product]});

    res.status(200).json(categoryData);

  } catch(error){

    res.status(500).json(error);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findOne({
      where:{id:req.params.id},
      include: [Product],
    });

    res.status(200).json(categoryData);
  
  } catch (error){

    res.status(500).json(error);
    
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch(error){
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = await Category.update({
      category_name: req.body.category_name,
    },
    {
      where: {
        id:req.params.id,
      }
    });
    res.status(200).json(categoryData);
  } catch (error){
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({where:{id:req.params.id}});
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
