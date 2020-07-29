import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { setContext } from 'apollo-link-context';

interface User {
  username: string;
  email: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
}

const LoginUser = gql`
  query LoginUser($LoginUserInput: LoginUserInput!){
  login(user: $LoginUserInput) {
    user {
      _id
      username
      email
      firstName
      lastName
      createdAt
      permissions
      enabled
    }
    token
  }
}
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  loginValue = '';
  passwordValue = '';

  user: Auth;
  loading = true;
  error: any;



  constructor(private apollo: Apollo) {}


  ngOnInit() {}

  onKeyLogin(event: any) {
    this.loginValue = event.target.value ;
  }
  onKeyPass(event: any) {
    this.passwordValue = event.target.value ;
  }

  signIn() {
    this.apollo
      .watchQuery({
        query: LoginUser,
        variables: {
          LoginUserInput: {
            username: this.loginValue,
            password: this.passwordValue
          }
        },
      })
      .valueChanges.subscribe(result => {
        this.user = result.data && result.data.login.user;
        localStorage.setItem('token', result.data.login.token);
        console.log(result.data);
        this.loading = result.loading;
        this.error = result.user;

      });
  }
}
