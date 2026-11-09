const fs = require('fs');
const path = require('path');

const careersFilePath = path.join(__dirname, '../data/careers.json');

const submitApplication = (req, res) => {
  try {
    const { name, email, phone, role, experience } = req.body;

    if (!name || !email || !phone || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, contact phone and desired job role are mandatory.'
      });
    }

    const applicationId = 'HR-JOB-' + Date.now().toString().slice(-6);

    const newApplication = {
      applicationId,
      applicant: { name, email, phone },
      position: role,
      experience: experience || 'Entry Level / Fresher Candidate',
      status: 'Under HR Review',
      submittedAt: new Date().toISOString()
    };

    const records = JSON.parse(fs.readFileSync(careersFilePath, 'utf8') || '[]');
    records.unshift(newApplication);
    fs.writeFileSync(careersFilePath, JSON.stringify(records, null, 2));

    console.log(`\n👔 [NEW CAREER APPLICANT]: ${name} applied for "${role}"`);

    res.status(201).json({
      success: true,
      message: `Job Application for "${role}" submitted successfully! Application ID: ${applicationId}`,
      applicationId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Application processing error.', error: error.message });
  }
};

module.exports = { submitApplication };
