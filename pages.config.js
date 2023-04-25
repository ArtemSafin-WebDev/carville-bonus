import home from "./pages-data/home";
import login from "./pages-data/login";
import registration from "./pages-data/registration";
import rules from "./pages-data/rules";
import news from "./pages-data/news";
import certificates from "./pages-data/certificates";
import stats from "./pages-data/stats";
import statistics from "./pages-data/statistics";
import profile from "./pages-data/profile";

const pagesConfig = {
  ...home,
  ...login,
  ...registration,
  ...rules,
  ...news,
  ...certificates,
  ...stats,
  ...statistics,
  ...profile,
};

export default pagesConfig;
