import React from "react";
import * as Mui from "@mui/material";
import * as Icon from "@mui/icons-material";

// components
import Article from "src/components/Article";
import ShareButton from "./ShareButton";

const openTwitter = () => {
  window.open(
    "https://twitter.com/compose/tweet?text=%E6%97%A5%E9%87%8E%E3%83%90%E3%82%B9%E6%99%82%E5%88%BB%E8%A1%A8%20-%20https://hinobus.natsume.tech/"
  );
};

const copyUrl = () => {
  navigator.clipboard.writeText("https://hinobus.natsume.tech/");
};

const share = () => {
  navigator.share({
    url: "https://hinobus.natsume.tech/",
    text: "日野バス時刻表",
  });
};

export default React.memo(() => {
  return (
    <Article title="シェア">
      <Mui.Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <ShareButton
          title="Twitter"
          onClick={openTwitter}
          icon={<Icon.Twitter color="primary" />}
        />
        <ShareButton
          title="リンクをコピー"
          onClick={copyUrl}
          icon={<Icon.Link />}
        />
        <ShareButton title="外部に共有" onClick={share} icon={<Icon.Share />} />
      </Mui.Box>
    </Article>
  );
});
