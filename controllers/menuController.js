const fs = require('fs');
const path = require('path');

const menuFilePath = path.join(__dirname, '../data/menu.json');

const getMenu = (req, res) => {
  try {
    const rawData = fs.readFileSync(menuFilePath, 'utf8');
    const menu = JSON.parse(rawData);
    const { category, search } = req.query;

    let results = menu;

    if (category && category !== 'all') {
      results = results.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      results = results.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve menu catalog.', error: error.message });
  }
};

module.exports = { getMenu };
