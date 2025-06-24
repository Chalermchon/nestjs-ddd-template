import { ResponseBody } from '@common/http/decorators'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateUserRequestBodyDTO } from '@user/application/dtos/create-user.request.dto'
import { CreateUserResponseBodyDTO } from '@user/application/dtos/create-user.response.dto'
import { GetUserParamsDTO } from '@user/application/dtos/get-user.request.dto'
import { GetUserResponseBodyDTO } from '@user/application/dtos/get-user.response.dto'
import {
  RenameUserParamsDTO,
  RenameUserRequestBodyDTO,
} from '@user/application/dtos/rename-user.request.dto'
import { RenameUserResponseBodyDTO } from '@user/application/dtos/rename-user.response.dto'
import { CreateUserUseCase } from '@user/application/use-cases/create-user.use-case'
import { GetUserUseCase } from '@user/application/use-cases/get-user.use-case'
import { RenameUserUseCase } from '@user/application/use-cases/rename-user.use-case'

@Controller()
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly renameUserUseCase: RenameUserUseCase,
  ) {}

  @Post()
  @ResponseBody(CreateUserResponseBodyDTO)
  create(
    @Body() body: CreateUserRequestBodyDTO,
  ): Promise<CreateUserResponseBodyDTO> {
    return this.createUserUseCase.execute(body)
  }

  @Get(':id')
  @ResponseBody(GetUserResponseBodyDTO)
  getUser(@Param() params: GetUserParamsDTO): Promise<GetUserResponseBodyDTO> {
    return this.getUserUseCase.execute(params)
  }

  @Post(':id/rename')
  @ResponseBody(RenameUserResponseBodyDTO)
  rename(
    @Param() params: RenameUserParamsDTO,
    @Body() body: RenameUserRequestBodyDTO,
  ): Promise<RenameUserResponseBodyDTO> {
    return this.renameUserUseCase.execute({ ...params, ...body })
  }
}
