const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/database');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running!',
    timestamp: new Date().toISOString() 
  });
});

// Get all tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const [tickets] = await db.query(`
      SELECT 
        t.*,
        c.name as category_name,
        b.name as building_name,
        CONCAT(u_reporter.first_name, ' ', u_reporter.last_name) as reporter_name,
        CONCAT(u_assigned.first_name, ' ', u_assigned.last_name) as assigned_to_name
      FROM tickets t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN buildings b ON t.building_id = b.id
      LEFT JOIN users u_reporter ON t.reported_by = u_reporter.id
      LEFT JOIN users u_assigned ON t.assigned_to = u_assigned.id
      ORDER BY t.created_at DESC
    `);
    
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// Get single ticket by ID
app.get('/api/tickets/:id', async (req, res) => {
  try {
    const [tickets] = await db.query(
      'SELECT * FROM tickets WHERE id = ?',
      [req.params.id]
    );
    
    if (tickets.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    res.json(tickets[0]);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

// Create new ticket
app.post('/api/tickets', async (req, res) => {
  try {
    const { title, description, category_id, priority, building_id, floor, room_number, reported_by } = req.body;
    
    // Generate ticket number
    const ticket_number = `TKT-${Date.now().toString().slice(-6)}`;
    
    const [result] = await db.query(`
      INSERT INTO tickets (
        ticket_number, title, description, category_id, 
        priority, status, building_id, floor, room_number, reported_by
      ) VALUES (?, ?, ?, ?, ?, 'new', ?, ?, ?, ?)
    `, [ticket_number, title, description, category_id, priority, building_id, floor, room_number, reported_by]);
    
    res.status(201).json({ 
      message: 'Ticket created successfully',
      ticket_id: result.insertId,
      ticket_number 
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories WHERE is_active = TRUE');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get all buildings
app.get('/api/buildings', async (req, res) => {
  try {
    const [buildings] = await db.query('SELECT * FROM buildings WHERE is_active = TRUE');
    res.json(buildings);
  } catch (error) {
    console.error('Error fetching buildings:', error);
    res.status(500).json({ error: 'Failed to fetch buildings' });
  }
});

// Get dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const [stats] = await db.query(`
      SELECT 
        COUNT(CASE WHEN status = 'new' THEN 1 END) as open_tickets,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
        COUNT(CASE WHEN is_escalated = TRUE THEN 1 END) as escalated,
        COUNT(CASE WHEN priority = 'critical' THEN 1 END) as critical_tickets
      FROM tickets
      WHERE status NOT IN ('closed')
    `);
    
    res.json(stats[0]);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Serve static files from the React app dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
});