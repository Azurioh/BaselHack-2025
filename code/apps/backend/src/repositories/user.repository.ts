import type { User } from '@baselhack/shared/types/user.types';
import { MongoCollections } from '@enums/mongo-collections-enums';
import type { Db, Filter } from 'mongodb';

export class UserRepository {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async createUser(user: User) {
    const newUser = await this.db.collection<User>(MongoCollections.USERS).insertOne({ ...user });

    return newUser;
  }

  async listAllUsers(filter?: Filter<User>) {
    const users = await this.db
      .collection<User>(MongoCollections.USERS)
      .find(filter || {})
      .toArray();

    return users;
  }

  async findUserByEmail(email: string) {
    const user = await this.db.collection<User>(MongoCollections.USERS).findOne({ email });

    return user;
  }

  async findUserById(id: string) {
    const user = await this.db.collection<User>(MongoCollections.USERS).findOne({ id });

    return user;
  }

  async updateUser(id: string, user: User) {
    const updatedUser = await this.db.collection<User>(MongoCollections.USERS).updateOne({ id }, { $set: user });

    return updatedUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.db.collection<User>(MongoCollections.USERS).deleteOne({ id });

    return deletedUser;
  }
}
