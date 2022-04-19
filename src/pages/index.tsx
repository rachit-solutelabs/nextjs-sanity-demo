/* eslint-disable no-underscore-dangle */
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";

import client from "../apollo/apollo-client";

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
        {!error &&
          data.map((item) => {
            return (
              <Link key={item._id} href={`/${item._id}`}>
                <a className="cursor-pointer hover:scale-105 hover:no-underline">
                  <div className="flex flex-col items-center justify-center rounded-2xl bg-black text-white shadow-xl">
                    <Image
                      src={item.poster.asset.url}
                      alt={item.poster.asset.altText}
                      width={780 / 4}
                      height={1170 / 4}
                      className="min-h-fit min-w-fit rounded-t-2xl"
                    />
                    <h2 className="my-2 flex h-[60px] max-w-[195px] items-center justify-center text-center text-xl">
                      {item.title}
                    </h2>
                  </div>
                </a>
              </Link>
            );
          })}
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
