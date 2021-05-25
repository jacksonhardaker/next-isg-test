const db = {
  "new-zealand": {
    language: "Maōri/English",
    currency: "New Zealand Dollar",
  },
  croatia: {
    language: "Croatian",
    currency: "Croatian Kuna",
  },
  namibia: {
    language: "Afrikaans/Oshiwambo",
    currency: "Namibian Dollar",
  },
  spain: {
    language: "Spanish",
    currency: "Euro",
  },
}

export const getCountry = async (country) => {
  const data = db[country]

  // simulate long build
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    status: data ? "success" : "not-found",
    ...(data || {})
  }
}

const get = async (req, res) => {
  const { query } = req;
  const data = await getCountry(query?.country);

  res.status(
    data.status === "success" ? 200 : 404
  ).json(data)
}

export default get;
