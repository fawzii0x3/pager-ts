import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationUpdateUserArgs = {
  data: UserInput;
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  Users: Array<User>;
  deleteUser: Scalars['Boolean'];
  user?: Maybe<User>;
};


export type QueryDeleteUserArgs = {
  id: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  age: Scalars['Int'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
};

export type UserInput = {
  age: Scalars['Float'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, firstName: string, lastName: string, age: number } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', Users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, age: number }> };


export const CreateUserDocument = gql`
    mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
    id
    firstName
    lastName
    age
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const UsersDocument = gql`
    query Users {
  Users {
    id
    firstName
    lastName
    age
  }
}
    `;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options });
};