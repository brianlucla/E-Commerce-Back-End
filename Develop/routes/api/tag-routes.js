const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include:[{Model:Product, through:ProductTag, as:"tagged_products"}]
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findOne(req.params.id, {
      include:[{Model:Product, through:ProductTag, as: "tagged_products"}]
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update({
      tag_name:req.body.tag_name,
      where:{
        id:req.body.id,
      }
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {id:req.params.id}
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(tagData);
  }
});

module.exports = router;
