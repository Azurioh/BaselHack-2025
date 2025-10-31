import bcrypt from 'bcrypt';

/**
 * Hashes a password using bcrypt
 * @param inputPassword - The plain text password to hash
 * @returns Promise<string> - The hashed password
 * @throws Error if password validation fails or hashing fails
 */
export const hashPassword = async (inputPassword: string): Promise<string> => {
  try {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(inputPassword, saltRounds);

    return hashedPassword;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Password hashing failed: ${error.message}`);
    }
    throw new Error('Password hashing failed: Unknown error');
  }
};

/**
 * Verifies a password against a stored hash
 * @param inputPassword - The plain text password to verify
 * @param storedHash - The stored password hash
 * @returns Promise<boolean> - true if password matches, false otherwise
 * @throws Error if verification fails
 */
export const verifyPassword = async (inputPassword: string, storedHash: string): Promise<boolean> =>
  bcrypt.compare(inputPassword, storedHash);
