import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import Countries from "./components/Countries/Countries";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql", // GraphQL sunucu adresinizi buraya ekleyin
  cache: new InMemoryCache(),
});

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      currency
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(LIST_COUNTRIES);

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  const country = data.countries;

  const countryClean = country.map((country) => ({
    id: country.code, // Eğer ülkelerin ID'leri varsa
    title: country.name,
    currency: country.currency,
    // Diğer özellikleri burada ekleyin
  }));

  return (
    <div>
      <Countries items={countryClean} />{" "}
      {/* DUMMY_EXPENSES yerine GraphQL sorgusundan gelen verileri kullanıyoruz */}
    </div>
  );
};

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default ApolloApp;
