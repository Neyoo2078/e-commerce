import mongoose from 'mongoose';

const seedProduct = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    title: {
      type: String,
      require: true,
      unique: true,
    },
    category: {
      type: [String],
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    countInStock: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
    },
    numReviews: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Products', seedProduct);
