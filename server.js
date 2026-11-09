const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} -> ${req.url}`);
  next();
});

// Storage in Memory
const menuCatalog = [
  { id: 1, name: "Big Mac", category: "beef", price: 850, inStock: true },
  { id: 2, name: "Double Cheeseburger", category: "beef", price: 790, inStock: true },
  { id: 3, name: "Spicy McCrispy Deluxe", category: "crispy", price: 820, inStock: true },
  { id: 4, name: "McChicken", category: "chicken", price: 650, inStock: true },
  { id: 5, name: "Omelette Muffin Meal", category: "breakfast", price: 620, inStock: true },
  { id: 6, name: "Chicken Sausage McMuffin", category: "breakfast", price: 690, inStock: true },
  { id: 7, name: "Crispy Wrap with Mayo", category: "wraps", price: 610, inStock: true },
  { id: 8, name: "World Famous Fries (L)", category: "sides", price: 390, inStock: true },
  { id: 9, name: "McFlurry Oreo", category: "dessert", price: 430, inStock: true },
  { id: 10, name: "Mega Family Feast", category: "meals", price: 2850, inStock: true },
  { id: 11, name: "Happy Meal Nuggets Box", category: "meals", price: 690, inStock: true }
];

const branchesList = [
  { id: "B-101", city: "gujranwala", name: "GT Road Branch", address: "Model Town / GT Road Bypass", phone: "+92-55-111000", hours: "Open 24/7" },
  { id: "B-102", city: "gujranwala", name: "Master City Express", address: "Master City Main Commercial", phone: "+92-55-111001", hours: "Open 24/7" },
  { id: "B-103", city: "lahore", name: "Gulberg Boulevard Hub", address: "Near Main Boulevard Gulberg III", phone: "+92-42-111000", hours: "Open 24/7" },
  { id: "B-104", city: "lahore", name: "DHA Phase 5", address: "Sports Complex Sector", phone: "+92-42-111002", hours: "Open 24/7" },
  { id: "B-105", city: "karachi", name: "Sea View Restaurant", address: "Clifton Beach Road", phone: "+92-21-111000", hours: "Open 24/7" },
  { id: "B-106", city: "islamabad", name: "F-9 Park Drive-Thru", address: "Fatima Jinnah Park Corridor", phone: "+92-51-111000", hours: "Open 24/7" }
];

const orders = [];
const jobApplications = [];
const supportTickets = [];
const kitchenTours = [];
const partyBookings = [];
const readingClubMembers = [];
const votes = [];

// ==================== ALL API ROUTES ==================== //

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({ status: "Online", message: "McDonald's Backend Operational 24/7" });
});

// Menu Catalog API
app.get('/api/menu', (req, res) => {
  const { category, search } = req.query;
  let results = menuCatalog;

  if (category && category !== 'all') {
    results = results.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    results = results.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  }

  res.status(200).json({ success: true, count: results.length, data: results });
});

// Branches API
app.get('/api/branches', (req, res) => {
  const { city } = req.query;
  let results = branchesList;

  if (city) {
    results = results.filter(b => b.city.toLowerCase().includes(city.toLowerCase()));
  }

  res.status(200).json({ success: true, count: results.length, data: results });
});

// 1. Kitchen Tour API
app.post('/api/kitchen-tour', (req, res) => {
  const { name, email, phone, branch, date } = req.body;
  const entry = { id: 'TOUR-' + Date.now(), name, email, phone, branch, date, status: 'Confirmed' };
  kitchenTours.push(entry);

  console.log('\n=========================================');
  console.log('🏛️ [KITCHEN TOUR REGISTERED]');
  console.log(`Visitor : ${name} (${phone})`);
  console.log(`Branch  : ${branch}`);
  console.log(`Date    : ${date}`);
  console.log('=========================================\n');

  res.status(201).json({ success: true, message: `Kitchen tour confirmed for ${name} on ${date} at ${branch}!` });
});

// 2. Birthday Party Booking API
app.post('/api/party-booking', (req, res) => {
  const { parentName, childName, age, phone, branch, guests, date } = req.body;
  const entry = { id: 'PARTY-' + Date.now(), parentName, childName, age, phone, branch, guests, date };
  partyBookings.push(entry);

  console.log('\n=========================================');
  console.log('🎉 [BIRTHDAY PARTY BOOKED]');
  console.log(`Child   : ${childName} (Age: ${age})`);
  console.log(`Parent  : ${parentName} (${phone})`);
  console.log(`Branch  : ${branch} | Guests: ${guests}`);
  console.log('=========================================\n');

  res.status(201).json({ success: true, message: `Birthday party booked for ${childName}! Our coordinator will call ${phone}.` });
});

// 3. Reading Club API
app.post('/api/reading-club', (req, res) => {
  const { parentName, email, childName, ageGroup } = req.body;
  const entry = { id: 'READ-' + Date.now(), parentName, email, childName, ageGroup };
  readingClubMembers.push(entry);

  console.log('\n=========================================');
  console.log('📚 [READING CLUB SIGNUP]');
  console.log(`Child   : ${childName} (${ageGroup})`);
  console.log(`Parent  : ${parentName} (${email})`);
  console.log('=========================================\n');

  res.status(201).json({ success: true, message: `Welcome ${parentName}! Reading Club welcome kit dispatched to ${email}.` });
});

// 4. Vote API
app.post('/api/vote', (req, res) => {
  const { design, email, rating } = req.body;
  const entry = { id: 'VOTE-' + Date.now(), design, email, rating, date: new Date().toISOString() };
  votes.push(entry);

  console.log('\n=========================================');
  console.log('🗳️ [NEW VOTE CAST]');
  console.log(`Design  : ${design}`);
  console.log(`Voter   : ${email} | Rating: ${rating} Stars`);
  console.log('=========================================\n');

  res.status(201).json({ success: true, message: `Vote recorded for "${design}"!` });
});

// 5. Food Order API
app.post('/api/order', (req, res) => {
  const { customerName, phone, deliveryAddress, items } = req.body;
  const orderId = 'MCD-PK-' + Math.floor(100000 + Math.random() * 900000);
  const total = items.reduce((acc, curr) => acc + (Number(curr.price) * Number(curr.quantity || 1)), 0);

  const newOrder = { orderId, customerName, phone, deliveryAddress, items, total, status: 'Preparing' };
  orders.push(newOrder);

  console.log('\n=========================================');
  console.log('🍔 [NEW FOOD ORDER PLACED]');
  console.log(`Order ID: ${orderId}`);
  console.log(`Customer: ${customerName} (${phone})`);
  console.log(`Address : ${deliveryAddress}`);
  console.log(`Total   : Rs. ${total}`);
  console.log('=========================================\n');

  res.status(201).json({ success: true, message: 'Order received by kitchen!', orderId });
});

// 6. Careers Job Application API
app.post('/api/careers', (req, res) => {
  const { name, email, phone, role, experience } = req.body;
  const entry = { id: 'APP-' + Date.now(), name, email, phone, role, experience };
  jobApplications.push(entry);

  console.log('\n=========================================');
  console.log('👔 [JOB APPLICATION]');
  console.log(`Applicant: ${name} (${phone}) | Role: ${role}`);
  console.log('=========================================\n');

  res.status(201).json({ success: true, message: `Application for "${role}" received!` });
});

// 7. Contact Support API
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  const entry = { id: 'TKT-' + Date.now(), name, email, subject, message };
  supportTickets.push(entry);

  console.log('\n=========================================');
  console.log('📩 [SUPPORT TICKET]');
  console.log(`From: ${name} (${email}) | Subject: ${subject}`);
  console.log('=========================================\n');

  res.status(201).json({ success: true, message: `Inquiry received! Support will contact ${email}.` });
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: `API Route Not Found: ${req.method} ${req.url}` });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🍟 Server running on http://localhost:${PORT}`);
  console.log(`⚡ All Routes Live: Kitchen Tours, Parties, Reading Club, Votes, Orders`);
  console.log(`======================================================\n`);
});