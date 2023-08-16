module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name:String,
      title: String,
      description: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Disaster = mongoose.model("tutorial", schema);
  return Disaster;
};