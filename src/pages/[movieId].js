/* eslint-disable no-underscore-dangle */
import { gql } from "@apollo/client";
import Image from "next/image";
// import Link from "next/link";

import { useRouter } from "next/router";
import { PortableText } from "@portabletext/react";
import YouTube from "react-youtube";
import { Meta } from "../layout/Meta.tsx";
import { Main } from "../templates/Main.tsx";

import client from "../apollo/apollo-client";

const Movie = ({ data, error }) => {
  const router = useRouter();

  const buttonHandler = () => {
    router.push("/");
  };

  const dateSplit = data.releaseDate?.slice(0, 10).split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { width, height } = data.poster.asset.metadata.dimensions;

  if (error) {
    return (
      <h1 className="text-center">
        GraphQL Error: Sorry, couldn&apost get the info :(
      </h1>
    );
  }

  return (
    <Main
      meta={
        <Meta
          title={`${data.title} - Sci-Fi Base`}
          description={`Know about ${data.title} on Sci-Fi Base`}
        />
      }
    >
      <main className="flex flex-col justify-center items-center">
        <button
          type="button"
          className="bg-black px-4 py-2 mb-6 hover:bg-slate-900"
          onClick={buttonHandler}
        >
          All Movies
        </button>
        <div className="w-[75%] flex flex-row gap-8">
          <div className={`relative w-[${width / 2}px] h-[${height / 2}px]`}>
            <Image
              src={data.poster.asset.url}
              alt={data.poster.asset.altText}
              width={width}
              height={height}
            />
          </div>
          <div className="flex flex-col justify-between items-start">
            <h1 className="text-5xl text-yellow-200">{data.title}</h1>
            <p>
              {dateSplit[2]} {months[dateSplit[1] - 1]} {dateSplit[0]}
            </p>
            <PortableText value={data.overviewRaw} />
            <a
              href={`https://www.imdb.com/title/${data.imdb}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={`${router.basePath}/assets/images/imdb.svg`}
                alt="IMDB Logo"
                width={`85rem`}
                height={`85rem`}
                className="hover:brightness-125"
              />
            </a>
          </div>
        </div>
        <YouTube videoId={data.youtube} className="mt-10" />
      </main>
    </Main>
  );
};

export default Movie;

export async function getStaticProps(context) {
  const { movieId } = context.params;

  const { data, error } = await client.query({
    query: gql`
      query Single_Movie($id: ID!) {
        Movie(id: $id) {
          _id
          title
          slug {
            current
          }
          imdb
          youtube
          overviewRaw
          releaseDate
          externalId
          popularity
          poster {
            asset {
              url
              altText
              metadata {
                dimensions {
                  width
                  height
                }
              }
            }
          }
          castMembers {
            characterName
            person {
              name
              image {
                asset {
                  url
                  altText
                  metadata {
                    dimensions {
                      width
                      height
                    }
                  }
                }
              }
            }
          }
          crewMembers {
            department
            job
            person {
              name
              image {
                asset {
                  url
                  altText
                  metadata {
                    dimensions {
                      width
                      height
                    }
                  }
                }
              }
            }
          }
          related {
            _id
            title
            poster {
              asset {
                url
                altText
              }
            }
          }
        }
      }
    `,
    fetchPolicy: "no-cache",
    variables: {
      id: movieId,
    },
  });

  if (error) {
    return {
      props: {
        data: "",
        error,
      },
      revalidate: 10,
    };
  }

  return {
    props: {
      data: data.Movie,
      error: "",
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        allMovie {
          _id
        }
      }
    `,
    fetchPolicy: "no-cache",
  });

  const paths = data.allMovie.map((item) => {
    return {
      params: {
        movieId: item._id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}
