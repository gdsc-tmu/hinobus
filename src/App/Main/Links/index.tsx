import React from "react";
import * as Icon from "@mui/icons-material";

// components
import Article from "src/components/Article";
import LinkList from "src/components/LinkList";

const links = [
  {
    label: "時刻表 (PDF)",
    href: "https://www.tmu.ac.jp/campuslife_career/facility/minamiosawa_hino.html",
    icon: <Icon.Schedule />,
  },
  {
    label: "大学からのお知らせ",
    href: "https://www.tmu.ac.jp/news.html",
    icon: <Icon.School />,
  },
  {
    label: "学生課のお知らせ",
    href: "https://gs.tmu.ac.jp/topics/",
    icon: <Icon.Business />,
  },
  {
    label: "教務課のお知らせ",
    href: "https://kyomu.jim.tmu.ac.jp/news.html",
    icon: <Icon.Business />,
  },
  {
    label: "システムデザイン学部のお知らせ",
    href: "https://www.sd.tmu.ac.jp/news.html",
    icon: <Icon.Apartment />,
  },
];

export default React.memo(() => {
  return (
    <Article title="学内リンク">
      <LinkList contents={links} />
    </Article>
  );
});
