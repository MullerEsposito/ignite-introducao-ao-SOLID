import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();
    Object.assign(newUser, { name, email });

    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): User | undefined {
    const foundUser = this.users.find((user) => user.id === id);

    return foundUser;
  }

  findByEmail(email: string): User | undefined {
    const foundUser = this.users.find((user) => user.email === email);

    return foundUser;
  }

  turnAdmin(receivedUser: User): User {
    const foundUser = this.users.find((user) => user.id === receivedUser.id);

    foundUser.admin = true;
    foundUser.updated_at = new Date();

    return foundUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
