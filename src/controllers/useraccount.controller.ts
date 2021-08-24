import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {UserAccount} from '../models';
import {UserAccountRepository} from '../repositories';

export class UseraccountController {
  constructor(
    @repository(UserAccountRepository)
    public userAccountRepository : UserAccountRepository,
  ) {}

  @post('/user-accounts', {
    responses: {
      '200': {
        description: 'UserAccount model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserAccount)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserAccount, {
            title: 'NewUserAccount',
            exclude: ['id'],
          }),
        },
      },
    })
    userAccount: Omit<UserAccount, 'id'>,
  ): Promise<UserAccount> {
    return this.userAccountRepository.create(userAccount);
  }

  @get('/user-accounts/count', {
    responses: {
      '200': {
        description: 'UserAccount model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(UserAccount) where?: Where<UserAccount>,
  ): Promise<Count> {
    return this.userAccountRepository.count(where);
  }

  @get('/user-accounts', {
    responses: {
      '200': {
        description: 'Array of UserAccount model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserAccount, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(UserAccount) filter?: Filter<UserAccount>,
  ): Promise<UserAccount[]> {
    return this.userAccountRepository.find(filter);
  }

  @patch('/user-accounts', {
    responses: {
      '200': {
        description: 'UserAccount PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserAccount, {partial: true}),
        },
      },
    })
    userAccount: UserAccount,
    @param.where(UserAccount) where?: Where<UserAccount>,
  ): Promise<Count> {
    return this.userAccountRepository.updateAll(userAccount, where);
  }

  @get('/user-accounts/{id}', {
    responses: {
      '200': {
        description: 'UserAccount model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserAccount, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserAccount, {exclude: 'where'}) filter?: FilterExcludingWhere<UserAccount>
  ): Promise<UserAccount> {
    return this.userAccountRepository.findById(id, filter);
  }

  @patch('/user-accounts/{id}', {
    responses: {
      '204': {
        description: 'UserAccount PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserAccount, {partial: true}),
        },
      },
    })
    userAccount: UserAccount,
  ): Promise<void> {
    await this.userAccountRepository.updateById(id, userAccount);
  }

  @put('/user-accounts/{id}', {
    responses: {
      '204': {
        description: 'UserAccount PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userAccount: UserAccount,
  ): Promise<void> {
    await this.userAccountRepository.replaceById(id, userAccount);
  }

  @del('/user-accounts/{id}', {
    responses: {
      '204': {
        description: 'UserAccount DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userAccountRepository.deleteById(id);
  }
}
