/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const restaurant = /* GraphQL */ `
  query Restaurant($id: Int!) {
    restaurant(id: $id) {
      id
      storeId
      tableNumber
      available
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const getRestaurant = /* GraphQL */ `
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
      id
      storeId
      tableNumber
      available
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants(
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        storeId
        tableNumber
        available
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
