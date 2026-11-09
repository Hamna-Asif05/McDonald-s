const fs = require('fs');
const path = require('path');

const branchesFilePath = path.join(__dirname, '../data/branches.json');

const getBranches = (req, res) => {
  try {
    const branches = JSON.parse(fs.readFileSync(branchesFilePath, 'utf8') || '[]');
    const { city, search } = req.query;

    let matched = branches;

    if (city) {
      matched = matched.filter(b => b.city.toLowerCase().includes(city.toLowerCase()));
    }

    if (search) {
      matched = matched.filter(b => 
        b.name.toLowerCase().includes(search.toLowerCase()) || 
        b.address.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json({
      success: true,
      count: matched.length,
      data: matched
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch branches.', error: error.message });
  }
};

module.exports = { getBranches };
