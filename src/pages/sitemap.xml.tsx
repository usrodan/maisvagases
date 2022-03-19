import configs from '../configs'
import Axios from '../utils/axios'

const toUrl = (host, route) =>
  `<url><loc>${configs.siteUrl}${route}</loc></url>`;

const createSitemap = (host, routes) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map((route) => toUrl(host, route)).join("")}
    </urlset>`;

const Sitemap = () => {};

Sitemap.getInitialProps = async ({ res, req }) => {
 

  const urlReq = `items/${configs.sufix}_jobs?limit=200&fields=slug,company,company.slug`
  const ax = await Axios.get(urlReq) 
  var urls = []
  const r = (Object.values(ax.data.data))
  //@ts-ignore
  r.map(rr=> urls.push(`/${rr.company.slug}/${rr.slug}`)) 
  const sitemap = createSitemap(req.headers.host, urls);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return res;
};

export default Sitemap;