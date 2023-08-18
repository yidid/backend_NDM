const db2 = require("../models/index.donation");
const Donation = db2.donations;

// Create and Save a new Donation
exports.create = (req, res) => {
    // Validate request
    if (!req.body.account) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Donation
    const donation = new Donation({
      bank:req.body.bank,
      account:req.body.account,
      amount:req.body.name,
      name: req.body.name,
      phone: req.body.phone,
      description: req.body.description,
     
    });
  
    // Save Donation in the database
    donation
      .save(donation)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Donation."
        });
      });
  };

// Retrieve all Donations from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
   
  
    Donation.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving donations."
        });
      });

    
  };

// Find a single Donation with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Donation.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Donation with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Donation with id=" + id });
      });
  };

// Update a Donation by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Donation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Donation with id=${id}. Maybe Donation was not found!`
          });
        } else res.send({ message: "Donation was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Donation with id=" + id
        });
      });
  };

// Delete a Donation with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Donation.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Donation with id=${id}. Maybe Donation was not found!`
          });
        } else {
          res.send({
            message: "Donation was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Donation with id=" + id
        });
      });
  };

// Delete all Donations from the database.
exports.deleteAll = (req, res) => {
    Donation.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Donations were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all donations."
        });
      });
  };

// Find all published Donations
exports.findAllPublished = (req, res) => {
    Donation.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving donations."
        });
      });
  };