import Image from "next/image";

const ListView = ({ data }) => {
  return (
    <section className="w-full flex flex-col justify-center items-start gap-2 border-l-4 border-gray-500">
      {data.map((item) => {
        const { name } = item.person;
        let { url, altText, metadata, width, height, revAspectRatio } = true;
        if (item.person.image) {
          ({ url, altText, metadata } = item.person.image.asset);
          ({ width, height } = metadata.dimensions);
          revAspectRatio = height / width;
        }

        return (
          <div
            key={name}
            className="flex flex-row justify-start items-center gap-4 ml-4"
          >
            {item.person.image && (
              <Image
                src={url}
                alt={altText}
                height={150}
                width={150 / revAspectRatio}
              />
            )}
            {!item.person.image && (
              <div className="w-[100px] h-[150px] flex justify-center items-center bg-black text-white text-center">
                Image Not Available
              </div>
            )}
            {item.characterName && (
              <div className="text-2xl text-yellow-200 flex flex-row gap-2 justify-start items-start">
                <p className="uppercase">{name}</p>
                <p className="text-white"> as </p>
                <p className="uppercase">{item.characterName}</p>
              </div>
            )}
            {item.job && (
              <div className="text-2xl text-yellow-200 flex flex-row justify-start items-start">
                <p className="uppercase">{name}</p>
                <p className="text-white">, {item.job}</p>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
export default ListView;
