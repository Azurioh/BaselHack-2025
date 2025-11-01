import type { Events } from 'discord.js';
import type Client from '@/client';

/**
 * @interface EventInterface
 * @description This interface defines the structure of the events
 */
export interface EventInterface {
  /**
   * @description Get the name of the event
   */
  getName(): Events;

  /**
   * @description Get the boolean value of the once attribute
   */
  isOnce(): boolean;

  /**
   * @description Run the event logic
   *
   * @param client The Client instance
   * @param args List of variadic arguments
   */
  run(client: Client, ...args: unknown[]): Promise<void>;
}

/**
 * @abstract EventAbstract
 * @description Abstract class used to define common methods and attributes of all events
 */
abstract class EventAbstract implements EventInterface {
  private _name: Events;
  private _once: boolean;

  constructor(name: Events, once = false) {
    this._name = name;
    this._once = once;
  }

  getName(): Events {
    return this._name;
  }

  isOnce(): boolean {
    return this._once;
  }

  abstract run(client: Client, ...args: unknown[]): Promise<void>;
}

export default EventAbstract;
