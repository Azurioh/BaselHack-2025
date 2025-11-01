import type { BaseInteraction, CommandInteraction, CommandInteractionOption, User } from 'discord.js';
import type Client from '@/client';

/**
 * @description Custom type for the
 */
type Option = CommandInteractionOption & { description: string; required: boolean };

/**
 * @interface CommandInterface
 * @description This interface defines the structure of the slash commands
 */
export interface CommandInterface {
  /**
   * @description Get the name of the command
   * @returns The name of the command
   */
  getName(): string;

  /**
   * @description Get the description of the command
   * @returns The description of the command
   */
  getDescription(): string;

  /**
   * @description Get the options of the command
   * @returns The options of the command
   */
  getOptions(): Option[] | null;

  /**
   * @description Get the permissions needed for the command
   * @returns The permissions needed of the command
   */
  getPermissions(): bigint;

  /**
   * @description Get the cooldown time of the command
   * @returns The cooldown time of the command
   */
  getCooldownTime(): number;

  /**
   * @description Get the list of users in cooldown for the command
   * @returns The list of users in cooldown for the  the command
   */
  getCooldown(): Set<User>;

  /**
   * @description Run the logic of the command
   *
   * @param interaction The interaction
   * @param client The Client instance
   */
  run(interaction: BaseInteraction, client: Client): Promise<void>;

  /**
   * @description Start the cooldown of an user for the command
   * @param user The user
   */
  startCooldown(user: User): void;
}

/**
 * @abstract CommandAbstract
 * @description Abstract class used to define the common attributes and methods of all slash commands
 */
abstract class CommandAbstract implements CommandInterface {
  protected _name: string; /*<! The name of the command */
  protected _description: string; /*<! The description of the command */
  protected _options: Option[]; /*<! The options of the command */
  protected _permissions: bigint; /*<! The permissions needed to execute the command */
  protected _cooldownTime: number; /*<! The cooldown time before re-use the command */
  protected _cooldown: Set<User>; /*<! The list of the users in cooldown for the command */

  /**
   * Constructor to set all attributes of the abstract class
   *
   * @param name The name of the command
   * @param description The description of the command
   * @param options The options of the command
   * @param permissions The permissions needed to execute the command
   * @param cooldownTime The cooldown time before re-use the command
   */
  constructor(name: string, description: string, options: Option[], permissions: bigint, cooldownTime = 0) {
    this._name = name;
    this._description = description;
    this._options = options;
    this._permissions = permissions;
    this._cooldownTime = cooldownTime;
    this._cooldown = new Set();
  }

  getName(): string {
    return this._name;
  }

  getDescription(): string {
    return this._description;
  }

  getOptions(): Option[] {
    return this._options;
  }

  getPermissions(): bigint {
    return this._permissions;
  }

  getCooldownTime(): number {
    return this._cooldownTime;
  }

  getCooldown(): Set<User> {
    return this._cooldown;
  }

  abstract run(interaction: CommandInteraction, client: Client): Promise<void>;

  startCooldown(user: User): void {
    this._cooldown.add(user);

    setTimeout(() => {
      this._cooldown.delete(user);
    }, this._cooldownTime);
  }
}

export default CommandAbstract;
