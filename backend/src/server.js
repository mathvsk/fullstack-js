
import {app} from './app.js';
import dotenv from 'dotenv';

dotenv.config(); // Executa as variaveis de ambiente

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


