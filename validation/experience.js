const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = validateExperienceInput = (data) =>{
  let errors = {};
 
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if(Validator.isEmpty(data.title))
  {
    errors.title = 'Profile title is required';  
  }
  if(Validator.isEmpty(data.company))
  {
    errors.company = 'Profile company name is required';  
  }
  if(Validator.isEmpty(data.from))
  {
    errors.from = 'from Date is required';  
  }
  

  return {
    errors,
    isValid : isEmpty(errors)
  }
};