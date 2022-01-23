import { useEffect, useState } from "react";
import { Loader } from "..";
import { NewsType } from "../../pages/pages.types";
import styles from "./News.module.css";

export function News(): JSX.Element {
  const [news, setNews] = useState<NewsType[] | null>(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch(
      "https://newsapi.org/v2/everything?q=tech&from=2022-01-20&sortBy=popularity&apiKey=fcd1ec4a5f1a4f549c6a258874d1d23b"
    )
      .then((response) => response.json())
      .then((data) => {
        const limitedArtile = data.articles?.slice(0, 5);
        setLoader(false);
        setNews(limitedArtile);
      });
  }, []);

  return (
    <div className={styles.newsContainer}>
      <h3>What's happening</h3>
      {loader && <Loader />}
      {news?.map(({ source, title, url, urlToImage }, index) => {
        return (
          <a
            href={url}
            key={`${source.id}-${index}`}
            className={styles.news}
            target="_blank"
            rel="noreferrer"
          >
            <p>{title}</p>
            <img src={urlToImage} alt="" />
          </a>
        );
      })}
    </div>
  );
}
