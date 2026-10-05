# Smart University Transport Management System (SUTMS)

This repository contains the code for the **Smart University Transport Management System**. 

## Shifting/Setting up the Project on a New Laptop

If you want to shift this project to another laptop, follow these simple steps:

1. **Copy the Project Folder**: Copy the entire `SUTMS_ITMS` folder from your current laptop and paste it onto the new laptop.
2. **Open in Editor with Antigravity**: Open the workspace folder on the new laptop and start the Antigravity chat.
3. **Run Setup Prompt**: Copy the prompt below and paste it into the Antigravity chat on the new laptop.

---

### Copy-Paste Prompt for New Laptop's Antigravity:

```text
Please set up and run the "Smart University Transport Management System" project on this new laptop. Follow these steps carefully:

1. DEPENDENCY INSTALLATION:
   - Go to the `backend` folder and run `npm install`.
   - Go to the `frontend` folder and run `npm install`.

2. DATABASE SETUP (MS SQL Server):
   - Check if MS SQL Server is running locally.
   - If SQL Server is available:
     a. Create a database named `SUTMS` if it doesn't already exist.
     b. Run the SQL script located at `backend/database/sqlserver_setup.sql` to create all tables and insert the seed data.
     c. Generate correct bcrypt hashes for password 'admin123' (for admin) and 'student123' (for student roles) and update the Users table in the SQL Server database.
     d. Ensure `backend/.env` is configured for MS SQL Server using Windows Authentication (DB_TYPE=mssql, DB_SERVER=localhost, DB_NAME=SUTMS, DB_USER=, DB_PASSWORD=, DB_TRUST_CERT=true).
   - If SQL Server is NOT available, configure the backend `.env` to fallback to SQLite (`DB_TYPE=sqlite`).

3. STARTING THE SERVERS:
   - Start the Express backend server (port 5000) using `npm start` in the backend folder.
   - Start the Vite frontend server (port 5173) using `npm run dev` in the frontend folder.
   - Verify that both servers start successfully and the login works (admin/admin123).
```

---

### What this Prompt will do:
* **Install Dependencies**: Automatically install `node_modules` for both backend and frontend.
* **Database Setup**: Check for SQL Server, create the `SUTMS` database, run the setup script, update user passwords with correct bcrypt hashes, and fallback to SQLite if SQL Server is not available.
* **Run Servers**: Start both Express and Vite development servers to verify everything is working.
