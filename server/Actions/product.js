import { set } from 'mongoose';
import { data } from '../data.js';
import seedModel from '../Models/seed.js';

export const seedProduct = async (req, res) => {
  try {
    // await seedModel.deleteMany({});
    const productdata = await seedModel.insertMany(data);
    res.send(productdata);
    // res.send('all deleted.');
  } catch (error) {
    console.log(error);
  }
};

export const FetchProduct = async (req, res) => {
  try {
    const data = await seedModel.find({});
    res.json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const ProductDeatils = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const product = await seedModel.findById(id);
      res.status(200).json(product);
    } else {
      res.status(400).json({ msg: 'Product not found' });
    }
  } catch (error) {
    res.json(error);
  }
};

export const ProductSearch = async (req, res) => {
  const PageSize = 3;
  const { Category, Ratings, Sort, q, Price, Page } = req.query;
  const qQuery =
    q && q !== 'All'
      ? {
          name: {
            $regex: q,
            $options: 'i',
          },
        }
      : {};
  const CategoryQuery =
    Category && Category !== 'All'
      ? {
          category: { $in: [Category] },
        }
      : {};
  const RatingsQuery =
    Ratings && Ratings !== 'All'
      ? {
          rating: {
            $gt: Number(Ratings.split('-')[0]),
            $lt: Number(Ratings.split('-')[1]),
          },
        }
      : {};
  const PriceQuery =
    Price && Price !== 'All'
      ? {
          price: {
            $gt: Number(Price.split('-')[0]),
            $lt: Number(Price.split('-')[1]),
          },
        }
      : {};
  console.log(PriceQuery);
  const SortQuery =
    Sort === 'newest'
      ? { createdAt: -1 }
      : Sort === 'lowest'
      ? { price: 1 }
      : Sort === 'highest'
      ? { price: -1 }
      : Sort === 'toprated'
      ? {
          rating: -1,
        }
      : { _id: -1 };
  try {
    const data = await seedModel
      .find({ ...CategoryQuery, ...RatingsQuery, ...PriceQuery, ...qQuery })
      .sort(SortQuery)
      .skip(PageSize * (Page - 1))
      .limit(PageSize);

    const count = await seedModel
      .find({ ...CategoryQuery, ...RatingsQuery, ...PriceQuery, ...qQuery })
      .countDocuments();
    const NoPages = Math.ceil(count / PageSize);

    res.json({
      data,
      query: { ...CategoryQuery, ...RatingsQuery, ...PriceQuery, ...qQuery },
      page: Page,
      numberOfPages: NoPages,
    });
  } catch (error) {
    console.log(error);
  }
};

export const ProductCategory = async (req, res) => {
  try {
    const fetchAll = await seedModel.find({});
    if (fetchAll) {
      console.log(fetchAll);
      const cat = fetchAll.reduce((a, b) => a.concat(b.category), []);
      const Nodupli = [...new Set(cat)];
      res.status(200).json({ data: Nodupli });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
