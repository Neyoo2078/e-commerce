import Order from '../Models/Order.js';
export const makeOrder = async (req, res) => {
  const { orderitems } = req.body;

  try {
    const newitems = orderitems.map((a) => ({ ...a, product: a._id }));
    const newOrder = { ...req.body, orderitems: newitems, user: req.user.id };
    const data = await Order.create(newOrder);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Order.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Order.findById(id);
    if (data) {
      data.isPaid = true;
      data.paidAt = Date.now();
      data.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_adddress: req.body.email_adddress,
      };
      const newData = await Order.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json(newData);
    } else {
      res.status(400).json('order not found');
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const FetchOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Order.find({ user: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
