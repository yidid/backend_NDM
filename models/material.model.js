module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name:String,
        phone: String,
        material: String,
        reason: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Material = mongoose.model("materials", schema);
    return Material;
  };
