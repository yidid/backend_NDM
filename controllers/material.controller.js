const db4= require("../models/index.materials");
const Material = db4.materials;

// Create and Save a new Material
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Material
    const material = new Material({
        name:req.body.name,
        phone:req.body.phone,
        material:req.body.material,
        reason:req.body.reason,
    
     
    });
  
    // Save Material in the database
    material
      .save(material)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Material."
        });
      });
  };

// Retrieve all Materials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { title: { $regex: new RegExp(name), $options: "i" } } : {};
   
  
    Material.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving materials."
        });
      });

    
  };

// Find a single Material with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Material.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Material with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Material with id=" + id });
      });
  };

// Update a Material by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Material.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Material with id=${id}. Maybe Material was not found!`
          });
        } else res.send({ message: "Material was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Material with id=" + id
        });
      });
  };

// Delete a Material with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Material.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Material with id=${id}. Maybe Material was not found!`
          });
        } else {
          res.send({
            message: "Material was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Material with id=" + id
        });
      });
  };

// Delete all Materials from the database.
exports.deleteAll = (req, res) => {
    Material.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Materials were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all materials."
        });
      });
  };

// Find all published Materials
exports.findAllPublished = (req, res) => {
    Material.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving materials."
        });
      });
  };