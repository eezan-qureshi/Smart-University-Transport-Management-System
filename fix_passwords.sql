-- Fix password hashes to match: admin=admin123, students=student123
UPDATE Users SET PasswordHash = '$2a$10$etiim83Jp512ZDwfSdF5LeuGAXKaXfPGYc441JOrOX2S6DDYxVFH6' WHERE Username = 'admin';
UPDATE Users SET PasswordHash = '$2a$10$sLVr.hNGa6KRz3oOVtBJFeAw3y7hLPWOf/jxQrgTUamWCBAEHUzui' WHERE Role = 'Student';
SELECT Username, LEFT(PasswordHash,20) as HashPreview FROM Users;
