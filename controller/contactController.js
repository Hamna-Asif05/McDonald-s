const fs = require('fs');
const path = require('path');

const ticketsFilePath = path.join(__dirname, '../data/tickets.json');

const submitTicket = (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, subject and message body are all required.'
      });
    }

    const ticketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);

    const newTicket = {
      ticketId,
      customer: { name, email },
      subject,
      message,
      priority: 'Normal',
      status: 'Open / Assigned to Customer Representative',
      createdDate: new Date().toISOString()
    };

    const tickets = JSON.parse(fs.readFileSync(ticketsFilePath, 'utf8') || '[]');
    tickets.unshift(newTicket);
    fs.writeFileSync(ticketsFilePath, JSON.stringify(tickets, null, 2));

    console.log(`\n📩 [SUPPORT TICKET LOGGED]: Ticket #${ticketId} from ${email}`);

    res.status(201).json({
      success: true,
      message: `Thank you ${name}. Your support inquiry (${ticketId}) has been logged. Our helpdesk will contact you at ${email}.`,
      ticketId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create support ticket.', error: error.message });
  }
};

module.exports = { submitTicket };
