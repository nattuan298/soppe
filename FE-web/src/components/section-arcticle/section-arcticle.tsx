import { Fragment } from "react";

import { NewsArticleModel } from "types/api-response-type";
import cls from "./articles.module.css";
import ItemArcticle from "./itemArticle";

interface PropsType {
  name: string;
  articles: Array<NewsArticleModel>;
}
export function SectionArcticle({ name, articles }: PropsType) {
  if (Array.isArray(articles) && articles.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <div className={`${cls.see_all}  mt-4 sm:mt-0 ml-4 sm:ml-0`}>
        <div className={cls.title}>{name}</div>
      </div>
      <div className={`${cls.articles_sections} w-full pb-6`}>
        {articles.map((article) => (
          <ItemArcticle
            article={article}
            key={article._id}
            isArticle={window.location.pathname === "/news-article" && true}
          />
        ))}
      </div>
    </Fragment>
  );
}
