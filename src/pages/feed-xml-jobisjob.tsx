//JOBISJOB TEMPLATE 
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
<job-id>${route.slug}</job-id>
<title>
<![CDATA[${route.title}]]>
</title>
<description>
<full-text>
<![CDATA[${route.description}]]>
</full-text>
<skill>
<![CDATA[]]>
</skill>
<skill>
<![CDATA[]]>
</skill>
</description>
<location>
<address>
<![CDATA[]]>
</address>
<city>
<![CDATA[${route.place.title}]]>
</city>
<administrative-area>
<![CDATA[]]>
</administrative-area>
<postal-code>
<![CDATA[]]>
</postal-code>
<country>
<![CDATA[Brasil]]>
</country>
</location>
<company-name>
<![CDATA[${route.company.title}]]>
</company-name>
<url>
<![CDATA[${configs.siteUrl}/${route.company.slug}/${route.slug}]]>
</url>
<compensation>
<salary>
<![CDATA[]]>
</salary>
<salary-currency>
<![CDATA[]]>
</salary-currency>
<other>
<![CDATA[]]>
</other>
</compensation>
<job-type>
<![CDATA[${route.type.title}]]>
</job-type>
<categories>
<category>
<![CDATA[${route.category.title}]]>
</category> 
</categories>
<insert-date>
<![CDATA[ ${route.created_on} ]]>
</insert-date>
<!--  COMPULSORY  -->
<update-date>
<![CDATA[ ${route.created_on}]]>
</update-date>
<!--  optional  -->
<expire-date>
<![CDATA[ ${ExpiracaoDate(route.created_on,15)}]]>
</expire-date>
`;

const createSitemap = (host, routes) =>
  `<?xml version="1.0" encoding="UTF-8"?>
  <data xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://static.jobisjob.com/feed/jobs.xsd">
   
  <jobs>
    ${routes.map((route) => toUrl(host, route)).join("")}
    </jobs>  
</data>`; 

const Sitemap = () => {}; 

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