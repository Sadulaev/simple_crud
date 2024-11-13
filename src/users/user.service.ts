import { Injectable } from "@nestjs/common";
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
        newUser.fullName = createUserDto.fullName;
        newUser.role = createUserDto.role;
        newUser.efficiency = createUserDto.efficiency;

        const result = await this.usersRepository.save(newUser);

        return { id: result.id };
    }

    async getUser(id: number, getUserQueryDto: GetUserQueryDto) {
        const foundedUsers = await this.usersRepository.find({ where: { id, ...getUserQueryDto } })

        return { users: foundedUsers }
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        await this.usersRepository.update(id, updateUserDto);
        const userAfterUpdate = await this.usersRepository.findOne({ where: { id } })

        return userAfterUpdate;
    }

    async deleteUser(id?: string) {
        if (id) {
            const user = await this.usersRepository.findOne({ where: { id: +id } });
            if (!user) {
                throw new Error('User not found');
            }
            // Удаляем пользователя и возвращаем данные удаленного объекта
            return await this.usersRepository.remove(user);
        } else {
            await this.usersRepository.delete({})
            return;
        }
    }
}