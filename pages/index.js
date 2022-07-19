import { useEffect, useState } from "react";
import axios from "axios";

import Link from "next/link";


export default function Home() {
  const [coins, setCoins] = useState([]);
  const [params, setParams] = useState({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: 10,
    page: 1,
    sparkline: "false",
  });

  let sortId = true;
  let sortPrice = true;
  let sortVolume = true;
  let sortMarketCap = true;

  //pagination for table

  function paginateBack() {
    params.page -= 1;
    if (params.page == 0) {
      params.page = 1;
    }
    getData();
  }

  function paginateFront() {
    params.page += 1;
    getData();
  }

  //soting table

  const priceSort = () => {
    sortPrice = !sortPrice;
    if (sortPrice) {
      params.order = "gecko_asc";
    } else {
      params.order = "gecko_desc";
    }
    getData();
  };

  const coinSort = () => {
    sortVolume = !sortVolume;
    if (sortVolume) {
      params.order = "id_asc";
    } else {
      params.order = "id_desc";
    }
    getData();
  };

  const volumeSort = () => {
    sortId = !sortId;
    if (sortId) {
      params.order = "volume_asc";
    } else {
      params.order = "volume_desc";
    }
    getData();
  };

  const marketCapSort = () => {
    sortMarketCap = !sortMarketCap;
    if (sortMarketCap) {
      params.order = "market_cap_asc";
    } else {
      params.order = "market_cap_desc";
    }
    getData();
  };

  //coins and charts API's call

  const getData = () => {
    return new Promise((resolve, reject) => {
      setParams(params);
      axios
        .get("https://api.coingecko.com/api/v3/coins/markets", { params })
        .then((res) => {
          for (let i = 0; i <= res.data.length; i++) {
            axios
              .get(
                `https://api.coingecko.com/api/v3/coins/${res.data[i].id}/market_chart?vs_currency=usd&days=7&interval=daily`
              )
              .then((chartData) => {
                res.data[i]["charts"] = chartData.data.market_caps;
              });

            if (i === res.data.length - 1) {
              setCoins(res.data);
              resolve(res.data);
            }
          }

          console.log(res.data);
        })
        .catch((error) => console.log(error));
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex mt flex-col">
      <div className="overflow-hidden ">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="w-11/12">
              <thead className="border-b border-zinc-300">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium  px-6 py-4 text-left cursor-pointer"
                    onClick={coinSort}
                  >
                    Coin
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium  px-6 py-4 text-left"
                  ></th>
                  <th
                    scope="col"
                    className="text-sm font-medium  px-6 py-4 text-left cursor-pointer"
                    onClick={priceSort}
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium  px-6 py-4 text-left cursor-pointer"
                    onClick={volumeSort}
                  >
                    24th volume
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium flex  px-6 py-4 text-left cursor-pointer"
                    onClick={marketCapSort}
                  >
                    Market Cap
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium  px-6 py-4 text-left"
                  >
                    Last 7 days
                  </th>
                </tr>
              </thead>
              <tbody>
                {coins.map((data, index) => {
                  return (
                    <tr className="border-b  border-zinc-300" key={data.id}>
                      <td className="px-6 py-4  text-sm font-medium ">
                        {index + 1 + (params.page * 10 - 10)}
                      </td>
                      <td className="text-sm flex font-light px-6 py-4 ">
                        <section className="h-6 w-6 ">
                          <Link href={`/graph?id=${data.id}`}>
                            <a>
                              {" "}
                              <img src={data.image} alt="screenshot"></img>
                            </a>
                          </Link>
                        </section>
                        <p className="ml-1 mt-0.5 font-medium"> {data.name}</p>
                      </td>
                      <td className="text-sm  font-light px-6 py-4 ">
                        {data.symbol.toUpperCase()}
                      </td>
                      <td className="text-sm  font-light px-6 py-4">
                        ${data.current_price}
                      </td>
                      <td className="text-sm  font-light px-6 py-4">
                        ${data.market_cap_change_24h}
                      </td>
                      <td className="text-sm  font-light px-6 py-4">
                        ${data.market_cap}
                      </td>
                      <td>
                        <div
                          className=" w-6 h-6 ml-10"
                          // onClick={() => {
                          //   localStorage.setItem(
                          //     "graphData",
                          //     JSON.stringify(data.charts)
                          //   );
                          // }}
                        >
                          <Link href={`/graph?id=${data.id}`}>
                            <a>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                />
                              </svg>
                            </a>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="py-5 mt-3">
              <nav className="block"></nav>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    onClick={() => {
                      paginateBack();
                    }}
                    className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-800 text-sm font-medium "
                  >
                    <span>Previous</span>
                  </a>

                  <a
                    onClick={() => {
                      paginateFront();
                    }}
                    className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-800 text-sm font-medium"
                  >
                    <span>Next</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
