# ErrorJS

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/offlinehacker/errorjs.svg)](https://greenkeeper.io/)
[![Travis](https://img.shields.io/travis/offlinehacker/errorjs.svg)](https://travis-ci.org/offlinehacker/errorjs)
[![Coveralls](https://img.shields.io/coveralls/offlinehacker/errorjs.svg)](https://coveralls.io/github/offlinehacker/errorjs)
[![Dev Dependencies](https://david-dm.org/offlinehacker/errorjs/dev-status.svg)](https://david-dm.org/offlinehacker/errorjs?type=dev)

Extendable javascript errors

## About

After extending javascript `Error` class in every single project and copying
allways different bad snippets from stackoverflow, i wanted to have a good
error base that i can reuse in different javascript/typescript projects.
This library tries to provide good simple base for javascript errors.

## Install

```
npm install --save errorjs
```

## Features

### Sane predefined errors

ErrorJS has a list of predefined error defined, that you can reuse while devloping a service.

```javascript
import {
  NotImplementedError,
  InternalError,
  NotFoundError,
  UnauthorizedError,
  ConnectionError,
  ValidationError,
  ConflictError,
  LogicalError
 } from 'errorjs';

throw new NotImplementedError('some_feature_not_implemented');
throw new InternalError('something_internally');
throw new NotFoundError('something_was_not_found');
throw new UnauthorizedError('access_was_unauthroized');
throw new ConnectionError('error_with_connection_to_server');
throw new ValidationError('error_validating_resource');
throw new ConflictError('some_conflict');
throw new LogicalError('some_logic_error');
```

### Enforced error codes

Every error has to have error code provided, which should uniquely identify an error

```javascript
import {ConflictError} from 'errorjs';

throw new ConflictError(); // <-- invalid since no error code is provided
throw new ConflictError('some_error_code'); // <-- good, since error code is provided
```

### Support for error context

Additional context can be passed when creating an error

**Simple error context**

```javascript
import {ConflictError} from 'errorjs';

throw new ConflictError('some_error_code', {some: 'context'});
```

**Predefined error context**

```javascript
const ConflictWithContext = ConflictError.withContext({some: 'context'});

throw new ConflictWithContext('some_error_code', {some: 'othercontext'});
```

**Error factory with predefined error context**

```javascript
import {errors} from 'errorjs';

const contextErrors = errors.withContext({userId: '<some_user_id>'});

const error = new contextErrors.ConflictError('user_exists', {errorId: '<some_error_id>'});

error.context // {userId: '<some_user_id>', errorId: '<some_error_id>'}
```

### Support for base Errors

Base errors can be passed to an error to encapsulate child error

```javascript
import {ConflictError} from 'errorjs';

const baseError = new Error('some base error');
const baseError2 = new Error('some other error');

throw new ConflictError('some_error_code', baseError, baseError2);
```

### Variable arguments

Error constructor accepts variable number of arguments. This enable to
pass multiple context objects to error.

```javascript
import {ValidationError} from 'errorjs';

const baseError = new Error('some error has happend');

throw new ValidationError('some_error_code', baseError, {some: 'context'}, {some: 'other_context'});
```

### TypeScript/flowtype support

ErrorJS is tightly integrated with typescript and provides type information.

```javascript
import {errors} from 'errorjs';

errors.NotImplemented // <--- autocomplete here

new errors.NotFoundError( /* autocomplete here */ );
```

### Extendable error factory and base error

Error factory can be extended with new errors classes and base error can be redefined.

```javascript
import {ExtendedErrorFactory} from 'errorjs';

class MyVeryBadErrorFactory extends ExtendedErrorFactory {
  BaseError = class BaseError extends this.BaseError {
    isVeryBadError = true;

    get isUserError() {
      return this.context.userID;
    }
  };

  MyError = this.defineErrorClass(
    class MyError extends this.BaseError {
      meta = {httpCode: 500};
    }
  );
}

const factory = new MyErrorFactory();
const error = factory.NotFoundError('some_error', {userID: '123-123'});

error.isVeryBadError // <-- extended functionality here

throw new factory.MyError('some_error_code');
```

## Examples

### TypeScript

```javascript
import {ExtendedErrorFactory} from 'errorjs';

class MyErrorFactory extends ExtendedErrorFactory {
  BaseError = class MyBaseError extends this.BaseError {
    scope = 'global';

    get isUserError() {
      return this.context.userId;
    }
  };

  TransactionError = this.defineErrorClass(
    class TransactionError extends this.ConflictError {
      scope = 'transaction';

      get userMessage() {
        return `{${this.scope}} ${super.userMessage}`;
      }
    }
  );
}

const errorFactory = new MyErrorFactory();

const userErrors = factory.withContext({userId: '<some_user_id>'});

throw new userErrors.TransactionError('transaction_not_found', 'transaction was not found', {
  id: '<transaction_id>
});
```

### JavaScript

```javascript
const {ExtendedErrorFactory} = require('errorjs');

class MyErrorFactory extends ExtendedErrorFactory {
  constructor(...args) {
    super(...args);

    this.BaseError = class MyBaseError extends this.BaseError {
      scope = 'global';

      get isUserError() {
        return this.context.userId;
      }
    };

    this.TransactionError = this.defineErrorClass(
      class TransactionError extends this.ConflictError {
        get scope() {
          return 'transaction';
        }

        get userMessage() {
          return `{${this.scope}} ${super.userMessage}`;
        }
      }
    );
  }
}

const errorFactory = new MyErrorFactory();

const userErrors = factory.withContext({userId: '<some_user_id>'});

throw new userErrors.TransactionError('transaction_not_found', 'transaction was not found', {
  id: '<transaction_id>
});
```

## Development

 - `npm t`: Run test suite
 - `npm start`: Runs `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generage bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)

## Credits

Made with :heart: by [@offlinehacker](https://twitter.com/offlinehacker)
