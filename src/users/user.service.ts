import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserQueryDto } from "./dto/get-user-query.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const newUser = new User;
        newUser.full_name = createUserDto.full_name;
        newUser.role = createUserDto.role;
        newUser.efficiency = createUserDto.efficiency;

        const result = await this.usersRepository.save(newUser);

        return { id: result.id };
    }

    async getAllUsers(query: GetUserQueryDto) {
        const foundedUsers = await this.usersRepository.find({ where: query })

        if (!foundedUsers.length) {
            throw new HttpException('Users not found', HttpStatus.NOT_FOUND)
        }

        return { users: foundedUsers }
    }


    async getUser(id: number,) {
        const foundedUsers = await this.usersRepository.find({ where: { id } })

        if (!foundedUsers.length) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return { users: foundedUsers }
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        await this.usersRepository.update(id, updateUserDto);

        return this.usersRepository.findOne({ where: { id } });
    }

    async deleteUser(id: number) {
        const user = await this.usersRepository.findOne({ where: { id: +id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        // Удаляем пользователя и возвращаем данные удаленного объекта
        // особенность команды remove (альтернатива delete)
        return await this.usersRepository.remove(user);
    }

    async deleteAllUsers () {
        await this.usersRepository.delete({});
        return;
    }
}