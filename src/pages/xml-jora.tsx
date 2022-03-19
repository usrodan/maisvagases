//XML JORA
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
  <title>
    <![CDATA[ ${route.title}]]>
  </title>
  <url>
  </url>
  <id>
    <![CDATA[ ${route.slug} ]]>
  </id>
  <listed_date>
    <![CDATA[${moment(route.created_on).toISOString()}]]>
  </listed_date>
  <closing_date>
    <![CDATA[${ExpiracaoDate(route.created_on,15)} ]]>
  </closing_date>
  <source>
    <![CDATA[ ${route.company.title} ]]>
  </source>
  <location>
    <![CDATA[ ${configs.sufix == "es" ? `${route.place.title}, Espirito Santo, Brasil` : `${route.place.title}, Portugal`} ]]>
  </location>
  <city>
    <![CDATA[ ${configs.sufix == "es" ? route.place.title : ""} ]]>
  </city>
  <state>
    <![CDATA[ ${configs.sufix == "es" ? "Espirito Santo" : route.place.title} ]]>
  </state>
  <postcode></postcode>
  <country>
    <![CDATA[ ${configs.sufix == "es" ? "BR" : "PT"} ]]>
  </country>
  <description>
    <![CDATA[ ${route.description} ]]>
  </description>
  <salary>
    <type>hourly</type>
    <min>0</min>
    <max>0</max>
    <currency>${configs.sufix == "es" ? "BRL" : "EUR"}</currency>
    <additionalText></additionalText>
  </salary>
  <jobtype>
    <![CDATA[${route.type.title}]]>
  </jobtype>
  <url>
    <![CDATA[ ${configs.siteUrl}/${route.company.slug}/${route.slug}/?utm_source=Jora&utm_medium=Jora&utm_campaign=Jora ]]>
  </url>
</job>   
      `
  ;

const createSitemap = (host, routes) =>
  `<?xml version="1.0" encoding="utf-8"?>

  <source>
  <publisher>${configs.sufix == "es" ? "maisvagases.com.br": "maisvagas.pt"}</publisher>
  <lastBuildDate>${moment().toISOString()}</lastBuildDate>
 
   

    ${routes.map((route) => toUrl(host, route)).join("")} 
    </source>`;

const Sitemap = () => { };

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