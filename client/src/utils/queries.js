import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query getCategories {
    categories {
      _id
      categoryname
      materials{
        _id
        materialname
      }
    }
  }
`;
export const QUERY_MATERIALS = gql`
query materials{
  materials {
    _id
    materialname
  }
}
`;

export const QUERY_MATERIAL_RECYCLING_CENTRES = gql`
query materialRecycleCenters($recycling_materials: String!) {
  materialRecycleCenters(recycling_materials: $recycling_materials){
    _id
    name
    address
    lattitude
    longitude
  }
}
`;

export const QUERY_CATEGORIES_AND_MATERIALS = gql`
query getcategoriesandmaterials{
  categories {
    _id
    categoryname
    materials{
      materialname
    }               
  }
materials {
    _id
    materialname
  }
}
`;