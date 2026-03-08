-- Users
INSERT INTO users (id, name, email, password, role) VALUES
(1, 'Citizen One', 'citizen1@example.com', '$2a$10$VHq6C/qM6uN1u9/3YqVpoeNykqf8g6b7H7Z5nU3HsHUKnPyaY0k3a', 'CITIZEN'),
(2, 'Admin User', 'admin@example.com', '$2a$10$VHq6C/qM6uN1u9/3YqVpoeNykqf8g6b7H7Z5nU3HsHUKnPyaY0k3a', 'ADMIN');

-- Complaints
INSERT INTO complaints (id, title, category, description, status, location, created_by_id) VALUES
(1, 'Pothole on Main St', 'ROAD', 'Large pothole causing traffic issues', 'PENDING', 'Main Street', 1),
(2, 'Water Leakage', 'WATER', 'Leakage near park', 'ONGOING', 'City Park', 1);
