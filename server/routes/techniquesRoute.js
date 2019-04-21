const express = require('express');
const db = require('../database/dbConfig');
const router = express.Router();

//Get all technique
router.get('/all', async (req, res) => {
	try {
		const alltechnique = await db
			.select('*')
			.from('technique')
			.leftJoin('exercises', 'technique.id', 'exercises.technique_id')
			.reduce((technique, current) => {
				const { user_id, category_id, title, technique_id } = current;

				technique = {
					...technique,
					user_id,
					category_id,
					title,
					id: technique_id
				};

				const { name, weight, sets, reps, id } = current;

				const newEx = {
					name,
					weight,
					sets,
					reps,
					id,
					technique_id
				};

				if (technique.exercises) {
					technique.exercises.push(newEx);
				} else {
					technique.exercises = [newEx];
				}

				return technique;
			}, {});

		res.status(200).json(alltechnique);
	} catch (error) {
		res.status(500).json({
			'Well this is embarrassing': 'Something went wrong',
			error
		});
	}
});

//Get all technique (no exercises) TEST
router.get('/all/technique', async (req, res) => {
	try {
		const alltechnique = await db('technique');

		res.status(200).json(alltechnique);
		//I believe we need to add the technique that come with the technique here
	} catch (error) {
		res.status(500).json({
			'Well this is embarrassing': 'Something went wrong',
			error
		});
	}
});

//Get all exercises TEST
router.get('/all/exercises', async (req, res) => {
	try {
		const allExercises = await db('exercises');

		res.status(200).json(allExercises);
		//I believe we need to add the exercises that come with the technique here
	} catch (error) {
		res.status(500).json({
			'Well this is embarrassing': 'Something went wrong',
			error
		});
	}
});

//GET technique set by user ID
router.get('/', async (req, res) => {
	try {
		//use the user ID to pull the technique associated with the user
		const technique = await db('technique').where('user_id', '=', req.id);
		console.log(technique);

		if (!technique[0]) {
			res.status(200).json('You have no technique');
			return;
		}

		let techniqueArray = [];

		for (const technique of technique) {
			//gets exercises that for the corresponding technique
			const exercises = await db('exercises').where('technique_id', '=', technique.id);
			const category = await db('category').where('id', '=', technique.category_id);
			const workObj = {
				...technique,
				exercises: [...exercises],
				category: category[0]
			};
			techniqueArray.push(workObj);
		}

		res.status(200).json(techniqueArray);
	} catch (error) {
		res.status(500).json({
			'Well this is embarrassing': 'Something went wrong',
			error
		});
	}
});

// Create new technique for a given user ID
router.post('/', async (req, res) => {
	try {
		//Grab user_id from user table
		let userId = req.id;
		//Create Object from req.body data and user_id
		const insertObj = {
			title: req.body.title,
			category_id: req.body.category_id,
			user_id: userId
		};
		//Insert Obj into techniquetable to create the techniqueID
		const addtechnique= await db('technique')
			.returning('id')
			.insert(insertObj);

		const technique= {
			...insertObj,
			id: addtechnique[0]
		};

		if (req.body.exercises) {
			let exercisesArr = req.body.exercises;

			exercisesArr.forEach(ex => (ex.technique_id = technique.id));
			console.log(exercisesArr);

			const addExercises = await db('exercises')
				.returning('id')
				.insert(exercisesArr);

			console.log(addExercises);

			const completeExercises = await db('exercises').where('technique_id', '=', technique.id);

			console.log(completeExercises);
			insertObj.exercises = completeExercises;
		}

		res.status(201).json(insertObj);
	} catch (error) {
		console.log('the error posting a techniqueis: ', error);
		res.status(500).json({ error });
	}
});

// EDIT set of technique
router.put('/edit', async (req, res) => {
	//Grab techniqueID from req.params.id
	const body = req.body;
	const techniqueID = body.id;

	try {
		//Create object from req.body data and user_id
		const edittechnique= {
			title: body.title,
			category_id: body.category_id
		};

		//Update technique table with new edittechniqueobject
		const updatedtechnique= await db('technique')
			.where('id', '=', techniqueID)
			.update(edittechnique);

		// Update each exercise in exercises array
		for (const ex of body.exercises) {
			const id = ex.id;
			const technique_id = ex.technique_id;

			if (id) {
				delete ex.id;
				delete ex.technique_id;

				const updateExercises = await db('exercises')
					.whereIn(['id', 'technique_id'], [[id, technique_id]])
					.update(ex);
			} else {
				await db('exercises')
					.returning('id')
					.insert(ex);
			}
		}

		const technique = await db('technique').where('id', '=', techniqueID);

		let techniqueArray = [];

		for (const techniqueof technique) {
			//gets exercises that for the corresponding technique
			const exercises = await db('exercises').where('technique_id', '=', technique.id);
			const category = await db('category').where('id', '=', technique.category_id);
			const workObj = {
				...technique,
				exercises: [...exercises],
				category: category[0]
			};
			techniqueArray.push(workObj);
		}

		res.status(200).json(techniqueArray);
	} catch (error) {
		res.status(500).json({ error });
	}
});

//Edit Exercise
router.put('/edit/exercise/:id', async (req, res) => {
	const exerciseID = req.params.id;
	const { body } = req;

	// checks if proper id is passed
	console.log('exerciseID is: ', exerciseID);
	if (Number.isInteger(exerciseID)) {
		res.status(400).json({ message: 'id is required' });
		return;
	}

	//checks if the request body has all required fields for an exercise
	const editedExercise = {
		...body,
		id: exerciseID
	};

	const { name, reps, sets, id } = editedExercise;
	if (!name && !reps && sets) {
		res.status(400).json({ message: 'nothing to update' });
		return;
	}

	//Removes the ID from the scheduled exercise insertObj
	const insertObj = { ...editedExercise };
	delete insertObj.id;

	//Finds the scheduled exercise to update and updates that exercise with the insertObj
	const updatedExercise = await db('exercises')
		.whereIn(['id'], [[id]])
		.update(insertObj);

	if (updatedExercise < 1) {
		res.status(400).json({ message: 'Nothing to update' });
		return;
	}

	//Gets the updated exercies that we send back as the response
	const newEx = await db('exercises').where('id', '=', id);

	res.status(200).json(newEx[0]);
});

router.delete('/exercise/delete/:id', async (req, res) => {
	try {
		const deletetechniqueData = await db('exercises')
			.whereIn(['id'], [[req.params.id]])
			.del();
		{
			deletetechniqueData === 0
				? res.status(404).json({ message: 'techniqueID does not exist' })
				: res.status(200).json({ deletetechniqueData });
		}
	} catch (error) {
		res.status(500).json(error, 'error message');
	}
});

//Delete technique
router.delete('/delete/:id', async (req, res) => {
	try {
		const deletetechniqueData = await db('technique')
			.where('id', '=', req.params.id)
			.del();
		{
			deletetechniqueData === 0
				? res.status(404).json({ message: 'techniqueID does not exist' })
				: res.status(200).json({ deletetechniqueData });
		}
	} catch (error) {
		res.status(500).json(error, 'error message');
	}
});

module.exports = router;
