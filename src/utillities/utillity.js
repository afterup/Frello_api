
export async function checkExistId({whereObject, model}){
  const data = await model.findOne({ attributes: ['user_id'], where: whereObject });

  if(!data){ return res.status(406).send({ error: { message: 'ID is not exist' } }); }
  else { return data; }
}