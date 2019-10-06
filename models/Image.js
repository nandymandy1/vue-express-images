const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ImageSchema = new Schema({
  imagePath: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

ImageSchema.plugin(mongoosePaginate);

module.exports = Image = model("images", ImageSchema);
