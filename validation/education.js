const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = validateExperienceInput = (data) =>{
  let errors = {};
 
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';

  if(Validator.isEmpty(data.school))
  {
    errors.school = 'Profile school is required';  
  }
  if(Validator.isEmpty(data.degree))
  {
    errors.degree = 'Profile degree name is required';  
  }
  if(Validator.isEmpty(data.fieldofstudy))
  {
    errors.fieldofstudy = 'field of study  is required';  
  }
  

  return {
    errors,
    isValid : isEmpty(errors)
  }
};