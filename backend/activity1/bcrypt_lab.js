const bcrypt = require('bcrypt');

async function hashPassword() {

try {
  const password = 'mySecurePassword';
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Password:', password);
    console.log(salt);
    console.log('Hashed Password:', hashedPassword);
    } catch (error) {
        console.error('Error:', error);
        }
}


hashPassword();

// Function to compare a password with a hash
async function comparePassword() {
    const inputPassword = 'mySecurePassword'; 
    const hashedPassword = '$2b$10$nd6iYHjX0CW5eotibc05XOkc/prrjhoepqnO0.U44CSxPCAtcOuyK'
  
    try {
      // Compare the input password with the stored hashed password
      const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  
      if (isMatch) {
        console.log('Password is correct.');
      } else {
        console.log('Password is incorrect.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Call the function to compare the password
  comparePassword();