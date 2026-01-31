import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    const count = await this.usersService.count();
    if (count > 0) {
      console.log('Seed: Users already exist, skipping.');
      return;
    }

    const TOTAL_USERS = 10;
    const BATCH_SIZE = 2;

    console.log('Seed: Start generating users...');

    for (let i = 0; i < TOTAL_USERS / BATCH_SIZE; i++) {
      const users = Array.from({ length: BATCH_SIZE }).map(() => {
        const fullName = faker.person.fullName();
        const email = fullName
          .toLowerCase()
          .replace(/\s+/g, '.')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') + `@example.com`;
        
        return ({
        name: fullName,
        email: email,
        phone: `+380${Math.floor(100000000 + Math.random() * 900000000)}`,
        birthday: this.generateBirthDate(),
      })});

      await this.usersService.bulkCreate(users);
      console.log(`Seed: Inserted batch ${i + 1}`);
    }

    console.log('Seed: Finished generating users!');
  }

  private generateBirthDate (): string {
  const year = faker.number.int({ min: 1970, max: 2005 });
  const month = faker.number.int({ min: 1, max: 12 });
  const day = faker.number.int({ min: 1, max: 28 });

  const dd = day.toString().padStart(2, '0');
  const mm = month.toString().padStart(2, '0');
  const yyyy = year.toString();

  return `${dd}-${mm}-${yyyy}`;
};
}
