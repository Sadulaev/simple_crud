import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { GetUserQueryDto } from "./dto/get-user-query.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller()
export class UserController {
    constructor (
        private userService: UserService
    ) {}

    @Post('create')
    async createUser (@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Get('get')
    async getAllUsers (
        @Query() query: GetUserQueryDto
    ) {
        return await this.userService.getAllUsers(query)
    }

    @Get('get/:id')
    async getUserById (
        @Param('id', ParseIntPipe) id: string,
    ) {
        return await this.userService.getUser(+id)
    }

    @Patch('update/:id')
    async updateUser (
        @Param('id', ParseIntPipe) id: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return await this.userService.updateUser(+id, updateUserDto)
    }

    @Delete('delete')
    async deleteAllUsers () {
        return await this.userService.deleteAllUsers()
    }

    @Delete('delete/:id')
    async deleteUserById (@Param('id', ParseIntPipe) id: string) {
        return await this.userService.deleteUser(+id)
    }
}