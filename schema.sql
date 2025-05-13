-- Create the database
CREATE DATABASE asset_management;

-- Create employees table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(15),
  status BOOLEAN DEFAULT TRUE, -- TRUE = Active, FALSE = Inactive
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create asset_categories table
CREATE TABLE asset_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create assets table
CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  unique_id VARCHAR(100) UNIQUE NOT NULL, -- e.g., internal inventory code
  serial_number VARCHAR(100) UNIQUE NOT NULL,
  make VARCHAR(100),
  model VARCHAR(100),
  purchase_date DATE,
  purchase_price NUMERIC(12, 2),
  status VARCHAR(20) DEFAULT 'in_stock', -- in_stock, issued, scrapped
  asset_category_id INTEGER REFERENCES asset_categories(id) ON DELETE SET NULL,
  branch VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create asset_transactions table
CREATE TABLE asset_transactions (
  id SERIAL PRIMARY KEY,
  asset_id INTEGER REFERENCES assets(id) ON DELETE CASCADE,
  employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
  issue_date TIMESTAMP,
  return_date TIMESTAMP,
  return_reason VARCHAR(255),
  action VARCHAR(10) CHECK (action IN ('issue', 'return')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create scrapped_assets table
CREATE TABLE scrapped_assets (
  id SERIAL PRIMARY KEY,
  asset_id INTEGER UNIQUE REFERENCES assets(id) ON DELETE CASCADE,
  scrap_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reason TEXT
);
