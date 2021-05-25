import { getCountry } from "./api/country/get"
import { useRouter } from "next/router"

const _ = ({ language, currency, country }) => {
  const { isFallback } = useRouter();

  if (isFallback)
    return <div>Loading...</div>

  if (!language || !currency || !country) return null;

  return (
    <div>
      <h1>{country}</h1>
      <p>{language}</p>
      <p>{currency}</p>
    </div>
  )
}

export default _;

export const getStaticProps = async ({ params }) => {
  const { country } = params;
  const data = await getCountry(country);

  console.log(data);

  if (data.status === "success") {
    return { props: { country, ...data } }
  }
  else {
    return { notFound: true }
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { country: "croatia" }}
    ],
    fallback: true,
  }
}
