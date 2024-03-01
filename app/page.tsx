import NewsList from "@/components/NewsList";
import { categories } from "@/constants";
import fetchNews from "@/lib/fetchNews";

export default async function Home() {
  // fetch the news data
  const news: NewsResponse = await fetchNews(categories.join(","));

  return (
    <div>
      <NewsList news={news} />
    </div>
  );
}
