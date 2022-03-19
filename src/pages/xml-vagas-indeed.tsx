import configs from '../configs'
import Axios from '../utils/axios'

import moment from 'moment'

function ExpiracaoDate(date: any, dias: number): Date {
    //@ts-ignore
    return moment(date).add(dias, 'days').toDate().toISOString();
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


const toUrl = (host, route) =>
  `${validateEmail(route.application) ? `
  <job>
  <title><![CDATA[${route.title}]]></title>
  <date><![CDATA[${route.created_on}]]></date>
  <referencenumber>MVES-${route.slug}</referencenumber>
  <url><![CDATA[${configs.siteUrl}/${route.company.slug}/${route.slug}/?utm_source=Indeed&utm_medium=Indeed&utm_campaign=Indeed]]></url>
  <company><![CDATA[${route.company.title}]]></company>
  <soucename><![CDATA[${route.company.title}]]></soucename>
  <city><![CDATA[${route.place.title}]]></city>
  <state><![CDATA[${configs.sufix == 'es' ? "ES" : route.place.title}]]></state>
  <country><![CDATA[${configs.sufix == 'es' ? "BR" : "PT"}]]></country>
  <postalcode><![CDATA[]]></postalcode>
  <email><![CDATA[${validateEmail(route.application) ? route.application : ""}]]></email>
  <description><![CDATA[${route.description}]]></description>
  <salary><![CDATA[]]></salary>
  <education><![CDATA[]]></education>
  <jobtype><![CDATA[fulltime]]></jobtype>
  <category><![CDATA[]]></category>
  <experience><![CDATA[]]></experience>
  </job>`: ``}`
 ;

const createSitemap = (host, routes) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <source>
    <publisher>${configs.title}</publisher>
    <publisherurl>${configs.siteUrl}</publisherurl>
    <lastBuildDate>${moment().format('D, d M Y h:i:s')}</lastBuildDate>

    ${routes.map((route) => toUrl(host, route)).join("")} 
    </source>
    </urlset>`; 

const Sitemap = () => {}; 

Sitemap.getInitialProps = async ({ res, req }) => {  
  const urlReq = `items/${configs.sufix}_jobs?limit=1000&fields=*.*`
  const ax = await Axios.get(urlReq)  
  const sitemap = createSitemap(req.headers.host, ax.data.data);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return res;
};

export default Sitemap;