import React from "react";
import * as Icon from "@mui/icons-material";

// components
import Article from "src/components/Article";
import LinkList from "src/components/LinkList";

const links = [
  {
    label: "日野市の天気予報",
    href: "https://www.jma.go.jp/bosai/forecast/#area_type=class20s&area_code=1321200",
    icon: <Icon.WbSunny />,
  },
  {
    label: "警報・注意報",
    href: "https://www.jma.go.jp/bosai/warning/#area_type=class20s&area_code=1321200",
    icon: <Icon.Warning />,
  },
  {
    label: "京王線 運行状況",
    href: "https://www.keio.co.jp/unkou/unkou_sp.html",
    icon: <Icon.Train />,
  },
  {
    label: "中央線 運行状況",
    href: "https://traininfo.jreast.co.jp/train_info/line.aspx?gid=1&lineid=chuoline_rapidservice",
    icon: <Icon.Train />,
  },
  {
    label: "横浜線 運行状況",
    href: "https://traininfo.jreast.co.jp/train_info/line.aspx?gid=1&lineid=yokohamaline",
    icon: <Icon.Train />,
  },
];

export default React.memo(() => {
  return (
    <Article title="天気・生活情報">
      <LinkList contents={links} />
    </Article>
  );
});
