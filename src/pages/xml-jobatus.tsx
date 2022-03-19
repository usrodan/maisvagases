//XML JOBATUS
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

`${validateEmail(route.application) ? 
  `  
<ad>

    <url><![CDATA[${configs.siteUrl}/${route.company.slug}/${route.slug}/?utm_source=Jobatus&utm_medium=Jobatus&utm_campaign=Jobatus]]></url>

    <title><![CDATA[${route.title}]]></title>

    <content><![CDATA[${route.description}]]></content>

    <company><![CDATA[${route.company.title}]]]></company>

    <contract><![CDATA[${route.type.title}]]></contract>

    <salary><![CDATA[0]]></salary>

    <city><![CDATA[${route.place.title}]]]></city>

    <region><![CDATA[${route.place.title}]]]></region>

</ad>`: ``}` 

const createSitemap = (host, routes) =>
  `<?xml version="1.0" encoding="utf-8"?>

  <jobatus>

    ${routes.map((route) => toUrl(host, route)).join("")} 
    </jobatus>`;

const Sitemap = () => { };

Sitemap.getInitialProps = async ({ res, req }) => {
  const urlReq = `items/es_jobs?limit=1000&fields=*.*`
  const ax = await Axios.get(urlReq)
  const sitemap = createSitemap(req.headers.host, ax.data.data);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return res;
};

export default Sitemap;