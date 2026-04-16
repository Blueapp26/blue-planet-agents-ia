import { articles } from '../models/articles-store';

export class KmlService {
  generateKml(): string {
    const kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Blue Planet App Feed</name>
    <description>Office de Tourisme Mondial</description>
    ${articles
      .map(
        (article) => `
    <Placemark>
      <name><![CDATA[[${article.category}] ${article.title}]]></name>
      <description><![CDATA[${article.body_html}]]></description>
      <Style>
        <IconStyle>
          <Icon>
            <href>${article.image_url}</href>
          </Icon>
          <scale>1.0</scale>
        </IconStyle>
      </Style>
      <ExtendedData>
        <Data name="image_url">
          <value>${article.image_url}</value>
        </Data>
        <Data name="category">
          <value>${article.category}</value>
        </Data>
      </ExtendedData>
      <Point>
        <coordinates>${article.lng},${article.lat},0</coordinates>
      </Point>
    </Placemark>`
      )
      .join('')}
  </Document>
</kml>`;
    return kml;
  }
}