import Knex from 'knex'; // REFERENCIANDO AOS TIPOS DO COMANDO KNEX, POR ISSO USAMOS A LETRA MAIUSCULA

export async function up(knex: Knex) {
  // CRIAR A TABELA
  return knex.schema.createTable('items', (table) => {
    table.increments('id').primary(); // sequencia automatica de numeração na chave primária
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('items');
  // VOLTAR ATRÁS (DELETAR A TABELA)
  // O MÉTODO DOWN DEVE SEMPRE TRABALHAR CONTRÁRIO AO MÉTODO UP
}
