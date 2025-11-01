import type { EventInterface } from '@events/index';
import { environment } from '@utils/environment';
import { Client as DiscordClient, GatewayIntentBits, REST, Routes } from 'discord.js';
import { glob } from 'glob';
import type { CommandInterface } from '@/abstractCommand';

/**
 * Client class, used to handle the discord bot
 */
class Client {
  private _token: string; /*<! The token used to login to the Discord API */
  private _client: DiscordClient /*<! The instance of the Discord Client */;
  private _commands: Map<string, CommandInterface> /*<! A map to store all slash commands */;
  private _sessions: Map<string, string> /*<! A map to store all sessions */;
  /**
   * Constructor used to set all private attributes
   */
  constructor() {
    this._token = environment.DISCORD_TOKEN;
    this._client = new DiscordClient({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers],
    });
    this._commands = new Map();
    this._sessions = new Map();
  }

  /**
   * Get the Discord Client instance
   *
   * @returns The Discord Client instance
   */
  getDiscordClient(): DiscordClient {
    return this._client;
  }

  /**
   * Get all the commands stored
   * @returns A map of commands
   */
  getCommands(): Map<string, CommandInterface> {
    return this._commands;
  }

  getSessions(): Map<string, string> {
    return this._sessions;
  }

  setSession(discordId: string, session: string): void {
    this._sessions.set(discordId, session);
  }

  getSession(discordId: string): string | undefined {
    return this._sessions.get(discordId);
  }

  deleteSession(discordId: string): void {
    this._sessions.delete(discordId);
  }

  /**
   * Load the commands, load the events, and start the bot
   */
  async start(): Promise<void> {
    try {
      await this.loadCommands();
      await this.loadEvents();
    } catch (err) {
      console.error('An error occured during setting up the bot: ', err);
      return;
    }
    try {
      await this._client.login(this._token);
      await this.registerCommands();
    } catch (err) {
      console.error('An error occured during login to the Discord API: ', err);
    }
  }

  /**
   * Load all events in the events folders
   */
  private async loadEvents() {
    const eventFiles = await glob(`${process.cwd()}/app/events/**/*.ts`);
    await Promise.all(
      eventFiles.map(async (eventPath: string) => {
        const eventFile = await import(eventPath);
        const event: EventInterface = new eventFile.default();
        if (!event) {
          throw new Error(`The file ${eventPath} doesn't have a default export.`);
        }
        if (!event.getName()) {
          return;
        }
        if (event.isOnce()) {
          this._client.once(event.getName() as string, (...args) => {
            event.run(this, ...args);
          });
        } else {
          this._client.on(event.getName() as string, (...args) => {
            event.run(this, ...args);
          });
        }
      }),
    );
  }

  /**
   * Load all the commands in the commands folders
   */
  private async loadCommands() {
    const commandFiles = await glob(`${process.cwd()}/app/commands/**/*.ts`);
    await Promise.all(
      commandFiles.map(async (commandPath: string) => {
        const commandFile = await import(commandPath);
        if (!commandFile.default) {
          return;
        }
        const command: CommandInterface = new commandFile.default();
        if (!command) {
          throw new Error(`The file ${commandPath} doesn't have a default export.`);
        }
        if (!command.getName()) {
          return;
        }
        this._commands.set(command.getName(), command);
      }),
    );
  }

  /**
   * Register the commands in the Discord API
   */
  private async registerCommands() {
    const rest = new REST().setToken(environment.DISCORD_TOKEN);

    try {
      console.log(`Started refreshing application (/) ${this._commands.size} commands.`);
      await rest.put(Routes.applicationCommands(this._client.user?.id || ''), {
        body: [...this._commands.values()].map((cmd) => ({
          name: cmd.getName(),
          description: cmd.getDescription(),
          options: cmd.getOptions(),
          default_member_permissions:
            typeof cmd.getPermissions() === 'bigint' ? cmd.getPermissions().toString() : cmd.getPermissions(),
        })),
      });
      console.log(`Successfully reloaded application (/) ${this._commands.size} commands.`);
    } catch (err) {
      throw new Error(`Can't register the commands - ${err}`);
    }
  }
}

export default Client;
