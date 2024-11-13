import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    // VARCHAR и INTEGER типы можно не указывать 
    // т.к. назначется автоматически 
    // но для прозрачности кода написал
    @Column({type: 'varchar'})
    full_name: string;

    @Column({type: 'varchar'})
    role: string;

    @Column({type: 'integer'})
    efficiency: number;
}