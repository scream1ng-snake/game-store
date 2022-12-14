import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartsService } from 'src/carts/carts.service';
import { FilesService } from 'src/files/files.service';
import { Role } from 'src/roles/schemas/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRipository: typeof User,
    private roleService: RolesService,
    private filesService: FilesService,
    private cartService: CartsService) { }

  async createUser(dto: CreateUserDto) {
    const { email, password, username, activationLink } = { ...dto }
    const user = await this.userRipository.create({ email, password, username, activationLink });
    if (dto.image) {
      user.image = await this.filesService.createFile(dto.image);
    }
    const role = await this.roleService.getRoleByValue("USER");
    await user.$set("roles", [role.id]);
    await this.cartService.create(user.id);
    await user.save();
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRipository.findAll({
      attributes: ["id", "email", "username", "banned", "isActivated", "image"],
      include: [{ model: Role, as: "roles", through: { attributes: [] }, attributes: ["value"] }]
    });
    return users;
  }

  async getUsersByEmail(email: string) {
    const user = await this.userRipository.findOne({ where: { email }, include: { model: Role } });
    if (!user) throw new HttpException("Пользователь не найден", HttpStatus.BAD_REQUEST);
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.getUserById(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    await user.$add('role', role.id);
    return dto;
  }

  async ban(dto: BanUserDto) {
    const user = await this.getUserById(dto.userId);
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRipository.findOne({ where: { id }, include: { model: Role } });
    if (!user) throw new HttpException("Пользователь не найден", HttpStatus.BAD_REQUEST);
    return user;
  }
}
