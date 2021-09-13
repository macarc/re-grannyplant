// Simple sign in page

import { View } from './View';
import { h } from 'snabbdom';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const SignIn = new View('sign-in', '/sign-in');

SignIn.triedBefore = false;

SignIn.view = function () {
  return h('main#sign-in', [
    h('h2', ['Sign in']),
    this.triedBefore
      ? h('p.incorrect-login', ['Incorrect login. Please try again.'])
      : null,
    h(
      'form',
      {
        on: {
          submit: (e) => {
            e.preventDefault();
            this.triedBefore = true;
            const email = document.getElementById('email').value;
            const pwd = document.getElementById('pwd').value;

            this.goto(
              'spinner',
              new Promise((res) =>
                signInWithEmailAndPassword(this.auth, email, pwd)
                  .then(() => res('plants'))
                  .catch(() => res('sign-in'))
              )
            );
          },
        },
      },
      [
        h('label', [
          'Email:',
          h('input#email', {
            attrs: { type: 'email', autocomplete: 'email' },
          }),
        ]),
        h('label', [
          'Password:',
          h('input#pwd', {
            attrs: { type: 'password', autocomplete: 'password' },
          }),
        ]),
        h('input', {
          attrs: { type: 'submit', value: 'Login' },
        }),
      ]
    ),
  ]);
};
