This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.



##### On Inital Render:

The Homepage is populated with cryptocurrencies fetched from the coingecko API

https://api.coingecko.com/api/v3/coins/markets

All the headers in the table are sortable, except for the last column.

useing pagination for display more data.
Each page returns 10 items and the rest are spread across the paginated pages.


Clicking a crypto image routes to a details page
This page contains the price chart of the selected asset. 


### Wallet
When a user clicks on the Wallet tab it should open up the wallet page. If Metamask is disconnected, it should
display the Connect wallet button. If Metamask is connected, it should display assets in that wallet. If user switches
the network in Metamask, the page should show assets for that specific network.

#### Theme Switch
Toggle button in the right top corner should switch the theme between dark and light.

#### dependencies

  "dependencies": {
    "@heroicons/react": "^1.0.6",
    "axios": "^0.27.2",
    "chart.js": "2.9.3",
    "ethers": "^5.6.9",
    "next": "12.2.2",
    "next-themes": "^0.2.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-table": "^7.8.0",
    "styled-components": "^5.3.5"
    "tailwindcss": "^3.1.6"
  },









# coinmarketcapdApp
