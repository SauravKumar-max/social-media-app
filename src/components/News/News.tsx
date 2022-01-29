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
      "https://google-news.p.rapidapi.com/v1/top_headlines?lang=en&country=US",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "google-news.p.rapidapi.com",
          "x-rapidapi-key":
            "2a9a1344d9mshc84ff6613e36527p1a6e38jsn6ae8a7e78cdb",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoader(false);
        if ("articles" in data) {
          const limitedData = data.articles.slice(0, 5);
          setNews(limitedData);
        }
      });
  }, []);

  return (
    <>
      {news && (
        <div className={styles.newsContainer}>
          <h3>What's happening</h3>
          {loader && <Loader />}
          {news?.map(({ title, link }, index) => {
            return (
              <a
                href={link}
                key={index}
                className={styles.news}
                target="_blank"
                rel="noreferrer"
              >
                <p>{title}</p>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
