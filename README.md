This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Developing

First, ensure the following **required** environment variables are set
* `NEXT_CMS_CONTENTFUL_SPACE_ID` - the space ID of the contentful app
* `NEXT_CMS_CONTENTFUL_ACCESS_TOKEN` - Access token used to get data from contentful
* `NEXT_CMS_CONTENTFUL_PREVIEW_ACCESS_TOKEN` - Acces token used to preview draft posts from Contentful

These values can usually be found in the settings of contentful, under the "**API Keys**" subheading 

<details>
  <summary><strong>screenshot of settings menu</strong></summary>
  <img src='https://github.com/GeorgeWL/next-app-contentful/blob/master/settings%20menu%20example.png'/>
</details>


then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

As long as there are no errors, pages should auto-update as you edit the file.

## To run a copy of the production app locally

first build the app

```bash
  npm run build
  # or
  yarn build
```

then run the app using the start script

```bash
  npm run start
  # or
  yarn start
```


## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
