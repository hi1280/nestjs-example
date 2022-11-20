import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post', (table) => {
    table.increments('id');
    table.string('title', 255).notNullable();
    table.string('description', 255);
    table.dateTime('created_at').notNullable;
    table.dateTime('updated_at').notNullable;
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('post');
}
