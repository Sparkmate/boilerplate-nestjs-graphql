import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "../auth/dto/create-user.input";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async save(createUserInput: CreateUserInput): Promise<User> {
    return this.userRepository.save(createUserInput);
  }

  async findAll(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async update(
    userId: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userRepository.preload({
      userId,
      ...updateUserInput,
    });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(userId: string): Promise<Partial<User>> {
    const user = await this.findOne(userId);
    await this.userRepository.remove(user);
    return {
      userId,
      firstName: "",
      lastName: "",
      email: "",
    };
  }
}
