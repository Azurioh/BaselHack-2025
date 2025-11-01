import Client from '@/client';

/**
 * Main function of the project
 */
const main = (): void => {
  try {
    const client: Client = new Client();

    client.start();
  } catch {
    return;
  }
};

main();
