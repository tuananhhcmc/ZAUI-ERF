const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/my_market_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Định nghĩa schema
const OrderItemSchema = new mongoose.Schema({
  product: Object,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema({
  status: String,
  paymentStatus: String,
  createdAt: Date,
  receivedAt: Date,
  items: [OrderItemSchema],
  delivery: Object,
  total: Number,
  note: String,
});

const Order = mongoose.model('Order', OrderSchema);

// API lấy danh sách đơn hàng
app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// API thêm đơn hàng mới
app.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('API server running on port 3001'));