// user-entities.repository.ts
import { UserEntities } from '@db/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntities)
export class UserEntitiesRepository extends Repository<UserEntities> {
  
}