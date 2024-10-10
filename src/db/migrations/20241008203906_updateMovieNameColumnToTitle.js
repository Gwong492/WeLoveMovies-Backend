
exports.up = function(knex) {
    return knex.schema.table("movies", (table) => {
        table.renameColumn("name", "title");
    });
};

exports.down = function(knex) {
    return knex.schema.table("movies", (table) => {
        table.renameColumn("title", "name");
      });
};
