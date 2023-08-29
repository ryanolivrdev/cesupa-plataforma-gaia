import type { DefaultSeoProps } from 'next-seo';

const title = "Plataforma Gaia"
const description = "Tudo por amor pelo que se faz e por quem se busca fazer."
const baseURL = "https://plataforma-gaia.vercel.app/"

const config: DefaultSeoProps = {
  defaultTitle: title,
  titleTemplate: '%s | Gaia',
  description,
  canonical: baseURL,
  themeColor: '#02D46E',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: baseURL,
    title,
    description,
    images: [
      {
        url: `${baseURL}static/images/gaia-banner.png`,
        width: 1280,
        height: 720,
      },
    ],
  },
};

export default config;