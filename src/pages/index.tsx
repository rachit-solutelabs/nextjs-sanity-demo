/* eslint-disable no-underscore-dangle */
import { gql } from "@apollo/client";

import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";

import client from "../apollo/apollo-client";
import MovieTiles from "../components/MovieTiles";

const Index = ({ data, error }) => {
  return (
    <Main
      meta={
        <Meta
          title="Sci-Fi Base"
          description="Sci-Fi Base is a small collection of Sci-Fi movies."
        />
      }
    >
      <main className="mx-auto my-4 flex w-[85%] flex-wrap items-center justify-center gap-4">
        {error && <p>GraphQL error :(</p>}
        {!error && <MovieTiles data={data} />}
      </main>
    </Main>
  );
};

export async function getServerSideProps() {
  const { data, error } = await client.query({
    query: gql`
      query {
        allMovie {
          _id
          externalId
          title
          poster {
            asset {
              url
              altText
            }
          }
        }
      }
    `,
    fetchPolicy: "no-cache",
  });

  if (error) {
    return {
      props: {
        data: "",
        error,
      },
    };
  }

  return {
    props: {
      data: data.allMovie,
      error: "",
    },
  };
}

export default Index;
