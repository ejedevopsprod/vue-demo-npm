## Profuturo - Salón del cliente

### Built With

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## Getting Started

### Prerequisites

To run this project you would need the following software already installed.

- npm

  ```sh
  npm install npm@latest -g
  ```

- Node.js 12.x

  ```sh
  npm i node
  ```

- MySQL

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/grupo-profuturo/njs-salon-del-cliente
   ```
2. Create the database
   - In MySQL run the SQL code database.sql to create the database structure. The file is located at:
   ```sh
   ./src/api/database/database.sql
   ```
3. Configure the database connection
   - Once created the database, open the file DBConfig.json and add the credentials for the database. The file is located at:
   ```sh
   ./src/api/config/DBConfig.json
   ```
4. In root folder, install NPM packages
   ```sh
   npm install
   ```
5. Start Node process manager installed in the server like PM2 or forever, for example in the root folder run:
   ```sh
   pm2 start src/index.js
   ```
### NOTE
The service need the port 3001 to serve the api.
