exports.up = function(knex, Promise) {
	return knex.schema.createTable('exercises', function(tbl) {
		tbl.increments();
		tbl.biginteger('technique_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('techniques')
			.onDelete('CASCADE')
			.index();
		tbl.string('name');
		tbl.integer('weight');
		tbl.integer('sets');
		tbl.integer('reps');
	});
};

exports.down = function(knex, Promise) {
	return Promise.all([knex.schema.dropTableIfExists('exercises')]);
};
