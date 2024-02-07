import React from "react";

// components
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

export default React.memo(() => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
});
