import {test} from 'node:test';
import assert from 'node:assert/strict';
import {loginError} from '../lib/login-errors';
test('authentication feedback distinguishes credentials, confirmation and service failures',()=>{
 assert.equal(loginError({code:'invalid_credentials'}).status,401);
 assert.match(loginError({code:'email_not_confirmed'}).message,/confirmed/);
 assert.equal(loginError({status:429}).status,429);
 assert.equal(loginError({status:500}).status,503);
});
