import home from "./pages-data/home";
import login from "./pages-data/login";
import registration from "./pages-data/registration";
import rules from "./pages-data/rules";
import news from "./pages-data/news";
import certificates from "./pages-data/certificates";
import stats from "./pages-data/stats";

const pagesConfig = {
  ...home,
  ...login,
  ...registration,
  ...rules,
  ...news,
  ...certificates,
  ...stats,
};

export default pagesConfig;
