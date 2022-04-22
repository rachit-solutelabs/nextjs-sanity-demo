/* eslint-disable no-underscore-dangle */
import { gql } from "@apollo/client";
import Image from "next/image";

import { FaGreaterThan } from "react-icons/fa";
import { useRouter } from "next/router";
import { PortableText } from "@portabletext/react";
import YouTube from "react-youtube";
import { useState, useRef } from "react";
import { Transition } from "react-transition-group";
import { Meta } from "../layout/Meta.tsx";
import { Main } from "../templates/Main.tsx";
import { transitionsTop, transitionsLeft } from "../utils/Transitions";

import client from "../apollo/apollo-client";
import ListView from "../components/ListView";
import MovieTiles from "../components/MovieTiles";

const Movie = ({ data, error }) => {
  const [castList, setCastList] = useState(false);
  const [crewList, setCrewList] = useState(false);
  const [relatedList, setRelatedList] = useState(false);
  const router = useRouter();
  const refCast = useRef();
  const refCrew = useRef();
  const refRelated = useRef();

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
      <main className=" w-[78%] mx-auto flex flex-col justify-center items-center">
        <button
          type="button"
          className="bg-black px-4 py-2 mb-6 hover:bg-slate-900 transition-all duration-200"
          onClick={buttonHandler}
        >
          All Movies
        </button>
        <div className="w-full flex flex-row gap-8 xl:flex-col">
          <div
            className={`relative w-[${width / 2}px] h-[${
              height / 2
            }px] flex justify-center items-center`}
          >
            <Image
              src={data.poster.asset.url}
              alt={data.poster.asset.altText}
              width={width}
              height={height}
            />
          </div>
          <div className="flex flex-col justify-between items-start text-2xl">
            <h1 className="text-5xl text-yellow-200">{data.title}</h1>
            <p className="text-xl">
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
                height={`45rem`}
                className="hover:brightness-125 transition-all duration-200"
              />
            </a>
          </div>
        </div>
        <YouTube
          videoId={data.youtube}
          className="my-10 xl:max-w-full xl:aspect-video xl:h-auto"
        />
        <div
          className="flex justify-start items-center self-start gap-4 mb-4 cursor-pointer group"
          onClick={() => {
            setCastList((s) => !s);
          }}
        >
          <FaGreaterThan
            className={`text-orange-300 group-hover:text-orange-500 ${
              castList ? "rotate-90" : ""
            } transition-all duration-100`}
            size="3rem"
          />
          <h2 className="text-4xl">Cast</h2>
        </div>
        {/* {castList && <ListView data={data.castMembers} />} */}
        <Transition in={castList} timeout={100} nodeRef={refCast}>
          {(state) => (
            <div
              style={{
                transition: "all .2s",
                transform: "scaleY(0)",
                display: "none",
                ...transitionsTop[state],
              }}
              ref={refCast}
              className="w-[96.25%] origin-top"
            >
              <ListView data={data.castMembers} />
            </div>
          )}
        </Transition>

        <div
          className="flex justify-start items-center self-start gap-4 mt-6 mb-4 cursor-pointer group"
          onClick={() => {
            setCrewList((s) => !s);
          }}
        >
          <FaGreaterThan
            className={`text-orange-300 group-hover:text-orange-500 ${
              crewList ? "rotate-90" : ""
            } transition-all duration-100`}
            size="3rem"
          />
          <h2 className="text-4xl">Crew</h2>
        </div>
        {/* {crewList && <ListView data={data.crewMembers} />} */}
        <Transition in={crewList} timeout={100} nodeRef={refCrew}>
          {(state) => (
            <div
              style={{
                transition: "all .2s",
                transform: "scaleY(0)",
                display: "none",
                ...transitionsTop[state],
              }}
              ref={refCrew}
              className="w-[96.25%] origin-top"
            >
              <ListView data={data.crewMembers} />
            </div>
          )}
        </Transition>

        {data.related?.length > 0 && (
          <>
            <div
              className="flex justify-start items-center self-start gap-4 mt-6 mb-4 cursor-pointer group"
              onClick={() => {
                setRelatedList((s) => !s);
              }}
            >
              <FaGreaterThan
                className={`text-orange-300 group-hover:text-orange-500 ${
                  relatedList ? "rotate-90" : ""
                } transition-all duration-100`}
                size="3rem"
              />
              <h2 className="text-4xl">Related Movies</h2>
            </div>
            <section className="mx-auto my-4 w-[96.25%] border-l-4 border-gray-500">
              <Transition in={relatedList} timeout={100} nodeRef={refRelated}>
                {(state) => (
                  <div
                    style={{
                      transition: "all 0.1s",
                      transform: "scale(0)",
                      display: "flex",
                      ...transitionsLeft[state],
                    }}
                    ref={refRelated}
                    className="ml-4 flex flex-wrap items-center justify-start gap-4 origin-left"
                  >
                    <MovieTiles data={data.related} />
                  </div>
                )}
              </Transition>
            </section>
          </>
        )}
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
            releaseDate
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
