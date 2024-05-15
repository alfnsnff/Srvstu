"use client"
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [data, setData] = useState<string>("");
  const [dataPicks, setDataPicks] = useState<string[]>([]);
  const [dataMaps, setDataMaps] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/home`);
        if (!res.ok) {
          throw new Error("Failed to fetch home data");
        }
        const homeData = await res.json();
        setData(homeData["Name"]);

        const resPicks = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/toppicks`);
        if (!resPicks.ok) {
          throw new Error("Failed to fetch top picks");
        }
        const dataPicks = await resPicks.json();
        setDataPicks(dataPicks["Top Picks"]);

        const resMaps = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/topmaps`);
        if (!resMaps.ok) {
          throw new Error("Failed to fetch top maps");
        }
        const dataMaps = await resMaps.json();
        setDataMaps(dataMaps["Top Map"]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="container max-w-[1024px] mx-auto p-5">
      <div className="container max-w-[512px] mx-auto">
        <hgroup>
          <h1 className="text-center text-5xl font-bold m-4">{data}</h1>
          <p className="text-center text-xl opacity-60 m-4">Top Picks</p>
        </hgroup>
        <form className="animate-in fade-in duration-700">
          <div className="flex mt-4">
            <input
              id="prompt-input"
              type="text"
              name="prompt"
              placeholder="Describe the image you want to create..."
              className="block w-full flex-grow rounded-l-md border border-input focus:outline-none focus:border-primary px-4 py-3"
            />

            <button
              className="bg-primary text-primary-foreground inline-block px-5 py-3 flex-none rounded-r-md hover:bg-primary/80 transition duration-300"
              type="submit"
            >
              Go
            </button>
          </div>
        </form>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Top Picks:</h2>
          <ul>
            {dataPicks.map((pick: string, index: number) => (
              <li key={index} className="text-lg mb-1">
                {pick}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Top Map:</h2>
          <ul>
            {dataMaps.map((map: string, index: number) => (
              <li key={index} className="text-lg mb-1">
                {map}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Home;
