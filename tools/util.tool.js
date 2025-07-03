/**
 * Return key-value representation of an object where 
 * each value is a list of unique value
 * {
    key: [ 'value' ],
    key: [ 'value' ],
    key: [ 'value' ],
   } 
   ==========>
   {
    key: 'value',
    key: 'value',
    key: 'value'
   }

 * @param {Object} object  
 * @returns the new object { key: value }
 */
function formidableFormParser(object) {
    let keys = Object.keys(object);
    let values = Object.values(object);

    let parsedObject = {};

    for (let i = 0; i < keys.length; i++) {
        parsedObject[keys[i]] = values[i][0];
    }

    return parsedObject;
}

/**
 * Process and return the error message returne by
 * mongoose validateSync
 * 
 * @param {Object} validationError 
 * @returns the error message within the validation error
 */
function mongooseValidationErrorMessage(validationError) {

      /**
       * modelError = ValidationError: description: Description is required
       *
       * modelError.errors = {
       *                   properties: {
       *                       validator: [Function (anonymous)],
       *                       message: 'Description is required',
       *                       type: 'required',
       *                       path: 'description',
       *                       value: undefined
       *                   },
       *                   kind: 'required',
       *                   path: 'description',
       *                   value: undefined,
       *                   reason: undefined,
       *                   [Symbol(mongoose:validatorError)]: true
       *               }
       *
       * To get the error message we have to do: modelError.errors['description'].message
       *
       * We get the keys: Object.keys(modelError.errors) = ['description']
       *
       * And: Object.keys(modelError.errors)[0] = 'description'
       *
       * Finally: modelError.errors[`${Object.keys(modelError.errors)[0]}`].message = 'Description is required'
       *
       */

      /**
       * paths will look like ['password', 'username']
       * we getting the last element because somehow
       * validateSync return the last errored fields as
       * first element of the list
       * if our model looks like:
       *
       *
       *   username: {
       *       type: String,
       *       required: true,
       *   },
       *   password: {
       *       type: String,
       *       required: true,
       *   },
       *
       * the last field will be the last element to be process
       * and it will end up as first element of the list like
       * the algorithm push to start and not to end. That's why
       * the paths in the errors list looks like ['password', 'username']
       *
       * so we want the user to check the fields from the first to the
       * last that's why we get the last elemnt of the list and get it's
       * message.
       *
       */
      let paths = Object.keys(validationError.errors);
      let validationMessage = validationError.errors[`${paths[paths.length - 1]}`].message;
      validationMessage = validationMessage.replace('Path', 'Field');
      return validationMessage;
}

module.exports = {
    formidableFormParser: formidableFormParser,
    mongooseValidationErrorMessage: mongooseValidationErrorMessage
}