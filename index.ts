import dotenv from 'dotenv';
import server from './src/server/index';
import { LogError, LogSuccess } from './src/utils/logger';

//* Configuration the .env file
dotenv.config();

const port = process.env.PORT || 8000;

//* Execute SERVER
server.listen(port, () => {
  LogSuccess(`Server On: Running in http://localhost:${port}/api`);
});

//* Control SERVER ERROR
server.on('error', (error) => {
  LogError(`Server Error: ${error}`);
});
