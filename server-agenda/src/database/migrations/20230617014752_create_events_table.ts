import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("events", (table) => {
    table.string("eventId").primary();
    table.string("userId").notNullable();
    table.jsonb("events").notNullable();
    table.string("createdAt").notNullable();
    table.string("updatedAt").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("events");
}
