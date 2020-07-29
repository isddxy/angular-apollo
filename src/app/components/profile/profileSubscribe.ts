import {Injectable} from '@angular/core';
import {Subscription} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserQL extends Subscription {
  document = gql`
    subscription GetUser {
      user(username: "admin") {
        _id
        username
        email
        firstName
        lastName
        createdAt
        enabled
        permissions
      }
    }
  `;
}
