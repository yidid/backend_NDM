const db = require("../models");
const Disaster = db.disasters;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Create and Save a new Disaster
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Disaster
    const disaster = new Disaster({
      name:req.body.name,
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });
  
    // Save Disaster in the database
    disaster
      .save(disaster)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Disaster."
        });
      });
  };

// Retrieve all Disasters from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title
  ? { title: { $regex: new RegExp(title), $options: "i" } }
  : {};

const { limit, offset } = getPagination(page, size);


Disaster.paginate(condition, { offset, limit })
.then((data) => {
  res.send({
    totalItems: data.totalDocs,
    disasters: data.docs,
    totalPages: data.totalPages,
    currentPage: data.page + 1,
  });
})
.catch((err) => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving tutorials.",
  });
});
};

    

// Find a single Disaster with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Disaster.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Disaster with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Disaster with id=" + id });
      });
  };

// Update a Disaster by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Disaster.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Disaster with id=${id}. Maybe Disaster was not found!`
          });
        } else res.send({ message: "Disaster was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Disaster with id=" + id
        });
      });
  };

// Delete a Disaster with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Disaster.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Disaster with id=${id}. Maybe Disaster was not found!`
          });
        } else {
          res.send({
            message: "Disaster was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Disaster with id=" + id
        });
      });
  };

// Delete all Disasters from the database.
exports.deleteAll = (req, res) => {
    Disaster.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Disasters were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all disasters."
        });
      });
  };

// Find all published Disasters
exports.findAllPublished = (req, res) => {
    Disaster.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving disasters."
        });
      });
  };