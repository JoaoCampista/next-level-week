import Knex from 'knex'; // REFERENCIANDO AOS TIPOS DO COMANDO KNEX, POR ISSO USAMOS A LETRA MAIUSCULA

export async function up(knex: Knex) {
  // CRIAR A TABELA
  return knex.schema.createTable('points', (table) => {
    table.increments('id').primary(); // sequencia automatica de numeração na chave primária
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('points');
  // VOLTAR ATRÁS (DELETAR A TABELA)
  // O MÉTODO DOWN DEVE SEMPRE TRABALHAR CONTRÁRIO AO MÉTODO UP
}
