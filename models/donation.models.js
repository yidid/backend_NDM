module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        bank:String,
        account:String,
        amount:String,
        name: String,
        phone:Number,
        description: String,
       
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Donation = mongoose.model("donation", schema);
    return Donation;
  };