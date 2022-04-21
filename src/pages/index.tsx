/* eslint-disable no-underscore-dangle */
import { gql } from "@apollo/client";
import { useState } from "react";

import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";

import client from "../apollo/apollo-client";
import MovieTiles from "../components/MovieTiles";
import Sort from "../components/Sort";

const Index = ({ data, error }) => {
  const [sortedData, setSortedData] = useState(data);

  return (
    <Main
      meta={
        <Meta
          title="Sci-Fi Base"
          description="Sci-Fi Base is a small collection of Sci-Fi movies."
        />
      }
    >
      <div className="mx-auto w-[83%]">
        <Sort data={data} setSortedData={setSortedData} />
      </div>
      <main className="mx-auto my-4 flex w-[85%] flex-wrap items-center justify-center gap-4">
        {error && <p>GraphQL error :(</p>}
        {sortedData && !error && <MovieTiles data={sortedData} />}
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
          releaseDate
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
