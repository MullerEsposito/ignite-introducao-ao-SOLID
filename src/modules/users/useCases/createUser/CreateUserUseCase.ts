import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userAlreadyExist = this.usersRepository.findByEmail(email);

    if (userAlreadyExist) throw new Error("E-mail already exists!");

    const createdUser = this.usersRepository.create({ email, name });

    return createdUser;
  }
}

export { CreateUserUseCase };
