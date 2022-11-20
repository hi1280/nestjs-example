import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('post', (table) => {
    table.string('email', 255).after('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('post', (table) => {
    table.dropColumn('email');
  });
}
