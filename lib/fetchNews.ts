import { gql } from "graphql-request"
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    // GraphQL query 
    const GET_QUERY = gql`
        query MyQuery(
            $access_key: String!
            $categories: String!
            $keywords: String
        ) {
            myQuery(
                access_key: $access_key
                categories: $categories
                countries: "es"
                sort: "published_desc"
                keywords: $keywords
            ) {
                data {
                    author
                    category
                    description
                    country
                    language
                    published_at
                    source
                    title
                    url
                    image
                }
                pagination {
                    count
                    limit
                    offset
                    total
                }
            }
        }
    `;

    // Fetch function with Next.js 14 caching...
    const res = await fetch("https://vacarisas.stepzen.net/api/orange-seal/__graphql", {
        method: 'POST',
        cache: isDynamic ? "no-cache" : "default",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `apikey ${process.env.STEPZEN_API_KEY}`
        },
        body: JSON.stringify({
            query: GET_QUERY,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords
            }
        })
    })

    const newsResponse = await res.json()

    // Sort function by images vs not images 
    const news = sortNewsByImage(newsResponse.data.myQuery)

    // return res
    return news
}

export default fetchNews