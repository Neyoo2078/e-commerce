import mongoose from 'mongoose';

const OrderSchma = mongoose.Schema(
  {
    orderitems: [
      {
        brand: {
          type: String,
          require: true,
        },
        category: {
          type: [String],
          require: true,
        },
        countInStock: {
          type: Number,
          require: true,
        },
        description: {
          type: String,
          require: true,
        },

        image: {
          type: String,
          require: true,
        },

        name: {
          type: String,
          require: true,
        },
        numReviews: {
          type: Number,
          require: true,
        },
        price: {
          type: Number,
          require: true,
        },

        quantity: {
          type: Number,
          require: true,
        },
        rating: {
          type: Number,
          require: true,
          default: 5,
        },

        title: {
          type: String,
          require: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Products',
          require: true,
        },
      },
    ],
    ShippingAddress: {
      FirstName: { type: String, require: true },
      Address: { type: String, require: true },
      City: { type: String, require: true },
      PosterCode: { type: String, require: true },
      Country: { type: String, require: true },
    },

    PaymentMethod: {
      type: String,
      require: true,
    },
    itemsPrice: {
      type: Number,
      require: true,
    },
    ShippingPrice: {
      type: Number,
      require: true,
    },
    TaxPrice: {
      type: Number,
      require: true,
    },
    TotalPrice: {
      type: Number,
      require: true,
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_adddress: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      require: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('order', OrderSchma);
