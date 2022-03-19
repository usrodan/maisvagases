//XML JOOBLE
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
  `
  <job>
      <id>${route.slug}</id>
      <link><![CDATA[${configs.siteUrl}/${route.company.slug}/${route.slug}]]></link>
      <name><![CDATA[${route.title}]]></name>
      <region><![CDATA[${route.place.title}]]></region>
      <address><![CDATA[]]></address>
      <salary><![CDATA[]]></salary>
      <description><![CDATA[${route.description}]]></description>
      <company><![CDATA[${route.company.title}]]></company>
      <companyinfo><![CDATA[]]></companyinfo>
      <contacts><![CDATA[]]></contacts>
      <updated><![CDATA[${route.created_on}]]></updated>
      <expire><![CDATA[${ExpiracaoDate(route.created_on,15)}]]></expire>
      <jobtype><![CDATA[CLT EFETIVO]]></jobtype>
      <salary><![CDATA[]]></salary>
      <apply><![CDATA[${configs.siteUrl}/${route.company.slug}/${route.slug}]]></apply>
      <email><![CDATA[${validateEmail(route.application) ? route.application : ""}]]></email>
      <phone><![CDATA[]]></phone>
      </job> `;

const createSitemap = (host, routes) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <jobs>
    ${routes.map((route) => toUrl(host, route)).join("")}
    </jobs>
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