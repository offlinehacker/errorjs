# GeneralError

**Extends Error**

GeneralError

Base error for all other errors

**Examples**

```javascript
const GeneralError = require('errorjs').GeneralError;

class MyFatalError extends GeneralError {
  constructor() {
     get meta() {
         return {httpCode: 500}
     }
  }
}
```

## id

Error id

**Examples**

```javascript
n8lqujm20w4ckw40scss0o8coco0o004k0oc808o0osksooc'
```

## name

Error name

**Examples**

```javascript
NotFoundError
```

## message

Error message

**Examples**

```javascript
User was not found
```

## code

Code of the error

**Examples**

```javascript
user_not_found
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

## error

Parrent error

Returns **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)?** 

## context

Extra error information

**Examples**

```javascript
{"namespace": "errors"}
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## meta

Error meta data

**Examples**

```javascript
{httpCode: 400}
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

## constructor

Creates new error

**Parameters**

-   `code` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `message` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `$2` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
    -   `$2.error`  
    -   `$2.context`   (optional, default `{}`)

## toJSON

Converts error to JSON

# NotImplementedError

**Extends GeneralError**

NotImplementedError

Error raised when functionality is not implemented

# InternalError

**Extends GeneralError**

InternalError

Error raised when there has been internal error

# NotFoundError

**Extends GeneralError**

NotFoundError

Error raised when something is not found

# UnauthorizedError

**Extends GeneralError**

UnauthorizedError

Error raised when access has been unauthorized

# ConnectionError

**Extends GeneralError**

ConnectionError

Error raised when there has been error with a connection

# ValidationError

**Extends GeneralError**

ValidationError

Error raised when there has been error with validation

# ConflictError

**Extends GeneralError**

ConflictError

Error raised when there has been conflict

# LogicalError

**Extends GeneralError**

LogicalError

Error raised when there was error in a logic

# ErrorFactory

Error factory which optionally attaches context to errors

Extending Factory with custom errors:

**Examples**

```javascript
const errors = require('errorjs');

class MyError extends errors.NotFoundError {}

class MyErrorFactory extends errors.Factory {
    MyError: typeof MyError

    constructor(context: ?Object) {
        super(context);

        this.MyError = MyError.withContext(context);
    }
}

module.exports = new MyErrorFactory();
```
