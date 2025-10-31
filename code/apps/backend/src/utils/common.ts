/**
 * @type Maybe
 *
 * @description A type that represents a value that can be null.
 */
export type Maybe<T> = T | null;

/**
 * @type MaybeUndefined
 *
 * @description A type that represents a value that can be null or undefined.
 */
export type MaybeUndefined<T> = T | null | undefined;

/**
 * @description Excludes properties from an object.
 *
 * @param obj The object to exclude properties from.
 * @param properties The properties to exclude.
 *
 * @returns The object with the properties excluded.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const properties = ['b', 'c'];
 * const newObj = excludeProperties(obj, properties);
 * // newObj = { a: 1 }
 */
export const excludeProperties = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  properties: K[],
): Omit<T, K> => {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !properties.includes(key as K))) as Omit<T, K>;
};

/**
 * @description Excludes properties from an object recursively.
 *
 * @param obj The object to exclude properties from.
 * @param properties The properties to exclude.
 *
 * @returns The object with the properties excluded.
 */
export const excludePropertiesRecursively = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  properties: K[],
): Omit<T, K> => {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => !properties.includes(key as K))
      .map(([key, value]) => [
        key,
        typeof value === 'object' && value !== null && !Array.isArray(value) && key !== 'anyOf'
          ? excludePropertiesRecursively(value as Record<string, unknown>, properties as string[])
          : value,
      ]),
  ) as Omit<T, K>;
};

/**
 * @description Checks if an email is valid.
 *
 * @param email The email to check.
 *
 * @returns True if the email is valid, false otherwise.
 */
export const isEmailValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * @description Checks if a password is valid.
 *
 * @param password The password to check.
 *
 * @returns True if the password is valid, false otherwise.
 */
export const isPasswordValid = (password: string) => {
  return /^[a-zA-Z0-9!@#$%^&*]{8,128}$/.test(password);
};
