import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './components/invites/create/create.component';
import { ListComponent } from './components/invites/list/list.component';
import { DeleteComponent } from './components/invites/delete/delete.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegComponent } from './components/auth/reg/reg.component';
import { ProfileComponent } from './components/profile/profile.component';
import ApolloClient from 'apollo-client';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ListComponent,
    DeleteComponent,
    LoginComponent,
    RegComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    GraphQLModule,
    HttpClientModule,
  ],
  // providers: [{
  //   provide: APOLLO_OPTIONS,
  //   useFactory: (httpLink: HttpLink) => {
  //     return {
  //       cache: new InMemoryCache(),
  //       link: httpLink.create({
  //         uri: 'http://localhost:3000/graphql',
  //       })
  //     };
  //   },
  //   deps: [HttpLink]
  // }],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink) => {
      return new ApolloClient({
        cache: new InMemoryCache(),
        link:  httpLink.create({
          uri: 'http://localhost:3000/graphql',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      });
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(
  //   apollo: Apollo,
  //   httpLink: HttpLink
  // ) {
  //   const link = httpLink.create({
  //     uri: 'http://localhost:3000/graphql',
  //     withCredentials: true
  //   });
  //
  //   apollo.create({
  //     link,
  //     cache: new InMemoryCache()
  //     // other options like cache
  //   });
  // }
}
