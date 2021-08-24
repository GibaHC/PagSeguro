import {Entity, model, property} from '@loopback/repository';

@model()
export class UserAccount extends Entity {

  @property({
    type: 'number',
    required: true,
    id:true,
    generated: true
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<UserAccount>) {
    super(data);
  }
}

export interface UserAccountRelations {
  // describe navigational properties here
}

export type UserAccountWithRelations = UserAccount & UserAccountRelations;
