const fs = require('fs');
const path = require('path');

const ordersFilePath = path.join(__dirname, '../data/orders.json');

const createOrder = (req, res) => {
  try {
    const { customerName, phone, deliveryAddress, items } = req.body;

    if (!customerName || !phone || !deliveryAddress || !items || !items.length) {
      return res.status(400).json({
        success: false,
        message: 'Incomplete order payload. Name, phone, address, and food items are required.'
      });
    }

    // Verify and calculate exact prices
    const subtotal = items.reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity || 1)), 0);
    const deliveryFee = 150;
    const salesTax = Math.round(subtotal * 0.05); // 5% food tax
    const totalAmount = subtotal + deliveryFee + salesTax;

    const orderId = 'MCD-PK-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder = {
      orderId,
      customer: {
        name: customerName,
        phone,
        address: deliveryAddress
      },
      orderSummary: {
        items,
        subtotal,
        deliveryFee,
        salesTax,
        grandTotal: totalAmount
      },
      status: 'Order Placed & Preparing in Kitchen',
      kitchenQueueNumber: Math.floor(10 + Math.random() * 89),
      estimatedDeliveryTime: '30 - 40 mins',
      timestamp: new Date().toISOString()
    };

    const existingOrders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8') || '[]');
    existingOrders.unshift(newOrder);
    fs.writeFileSync(ordersFilePath, JSON.stringify(existingOrders, null, 2));

    console.log(`\n🍔 [NEW ORDER DISPATCHED]: ID ${newOrder.orderId} | Total: Rs. ${totalAmount}`);

    res.status(201).json({
      success: true,
      message: 'Your order has been officially received and sent to the nearest kitchen counter!',
      orderId: newOrder.orderId,
      queueNumber: newOrder.kitchenQueueNumber,
      estimatedTime: newOrder.estimatedDeliveryTime,
      totalAmount: totalAmount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Order checkout failed.', error: error.message });
  }
};

const getOrderById = (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = JSON.parse(fs.readFileSync(ordersFilePath, 'utf8') || '[]');
    const matched = orders.find(o => o.orderId.toLowerCase() === orderId.toLowerCase());

    if (!matched) {
      return res.status(404).json({ success: false, message: 'Order ID not found.' });
    }

    res.status(200).json({ success: true, order: matched });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not track order.', error: error.message });
  }
};

module.exports = { createOrder, getOrderById };