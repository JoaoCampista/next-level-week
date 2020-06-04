import Knex from 'knex'; // REFERENCIANDO AOS TIPOS DO COMANDO KNEX, POR ISSO USAMOS A LETRA MAIUSCULA

export async function up(knex: Knex) {
  // CRIAR A TABELA
  return knex.schema.createTable('point_items', (table) => {
    table.increments('id').primary(); // sequencia automatica de numeração na chave primária

    //prettier-ignore
    table.integer('point_id')
    .notNullable()
    .references('id')
    .inTable('points');

    //prettier-ignore
    table.integer('item_id')
    .notNullable()
    .references('id')
    .inTable('items');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('point_items');
  // VOLTAR ATRÁS (DELETAR A TABELA)
  // O MÉTODO DOWN DEVE SEMPRE TRABALHAR CONTRÁRIO AO MÉTODO UP
}
