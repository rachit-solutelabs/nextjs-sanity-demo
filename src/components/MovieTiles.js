/* eslint-disable no-underscore-dangle */
import Link from "next/link";
import Image from "next/image";

const MovieTiles = ({ data }) => {
  return data.map((item) => {
    return (
      <Link key={item._id} href={`/${item._id}`}>
        <a className="cursor-pointer hover:scale-105 hover:no-underline transition-all duration-200">
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
  });
};

export default MovieTiles;
