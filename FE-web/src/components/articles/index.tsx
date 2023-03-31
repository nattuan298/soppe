import React from "react";
import Image from "next/image";
import { get, isEmpty } from "lodash";
import { ArticlesType } from "types/api-response-type";
import cls from "./articles.module.css";

const defaultImage = "/assets/images/image_not_available.png";

export function Articles({ articles }: { articles: ArticlesType }) {
  if (isEmpty(articles)) {
    return null;
  }
  return (
    <div className={cls.articles}>
      {articles.map((article, index) => {
        return (
          <div className={cls.article} key={index}>
            <div className={cls.wr_image}>
              <Image
                className={cls.article_image}
                width="290"
                height="211"
                src={get(article, "image") || defaultImage}
                alt=""
              />
            </div>
            <div className={cls.title}>{article.title}</div>
            <div className={cls.info_line}>
              <img
                src="/assets/images/date_range_black_24dp.png"
                alt=""
                width="16"
                height="16"
                className={cls.date_icon}
              />
              <div className={cls.date}>{article.date}</div>
              <img
                src="/assets/images/read_black_24dp.png"
                alt=""
                width="16"
                height="16"
                className={cls.view_icon}
              />
              <div className={cls.view}>{article.view.toLocaleString()}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
