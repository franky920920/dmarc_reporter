// Import snsPayloadLoggerHandler function from sns-payload-logger.mjs
import {mimeProcessor} from '../../../src/handlers/sns-payload-logger.mjs';
import {simpleParser} from "mailparser";
import microsoft from '../../../events/microsoft.json' assert {type: "json"};
import g1 from '../../../events/google.json' assert {type: 'json'};
import g2 from '../../../events/g2.json' assert {type: 'json'};
import yahoo from '../../../events/yahoo.json' assert {type: 'json'};


describe('DmarcReportParseTest', function () {
	it('should Microsoft parsed', async () => {
		let mine = atob(JSON.parse(microsoft.Records[0].Sns.Message).content)
		let parsed = await simpleParser(mine)
		await mimeProcessor(parsed.attachments).then(xml => {
			expect(xml.replace(/\s+/g, "")).toBe(`<?xml version=\"1.0\"?>
    <feedback xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
      <version>1.0</version>
      <report_metadata>
        <org_name>Outlook.com</org_name>
        <email>dmarcreport@microsoft.com</email>
        <report_id>5ed7a85842b34c8d8510a1d781214d1c</report_id>
        <date_range>
          <begin>1703030400</begin>
          <end>1703116800</end>
        </date_range>
      </report_metadata>
      <policy_published>
        <domain>awseducate.tw</domain>
        <adkim>r</adkim>
        <aspf>r</aspf>
        <p>quarantine</p>
        <sp>quarantine</sp>
        <pct>100</pct>
        <fo>0</fo>
      </policy_published>
      <record>
        <row>
          <source_ip>54.240.11.17</source_ip>
          <count>1</count>
          <policy_evaluated>
            <disposition>none</disposition>
            <dkim>pass</dkim>
            <spf>pass</spf>
          </policy_evaluated>
        </row>
        <identifiers>
          <envelope_to>hotmail.com</envelope_to>
          <envelope_from>ses.awseducate.tw</envelope_from>
          <header_from>awseducate.tw</header_from>
        </identifiers>
        <auth_results>
          <dkim>
            <domain>awseducate.tw</domain>
            <selector>aj3wocnwxm3wyik6mh7ekdtlwulmodts</selector>
            <result>pass</result>
          </dkim>
          <dkim>
            <domain>amazonses.com</domain>
            <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
            <result>pass</result>
          </dkim>
          <spf>
            <domain>ses.awseducate.tw</domain>
            <scope>mfrom</scope>
            <result>pass</result>
          </spf>
        </auth_results>
      </record>
      <record>
        <row>
          <source_ip>54.240.8.56</source_ip>
          <count>1</count>
          <policy_evaluated>
            <disposition>none</disposition>
            <dkim>pass</dkim>
            <spf>pass</spf>
          </policy_evaluated>
        </row>
        <identifiers>
          <envelope_to>hotmail.com</envelope_to>
          <envelope_from>ses.awseducate.tw</envelope_from>
          <header_from>awseducate.tw</header_from>
        </identifiers>
        <auth_results>
          <dkim>
            <domain>awseducate.tw</domain>
            <selector>aj3wocnwxm3wyik6mh7ekdtlwulmodts</selector>
            <result>pass</result>
          </dkim>
          <dkim>
            <domain>amazonses.com</domain>
            <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
            <result>pass</result>
          </dkim>
          <spf>
            <domain>ses.awseducate.tw</domain>
            <scope>mfrom</scope>
            <result>pass</result>
          </spf>
        </auth_results>
      </record>
    </feedback>`.replace(/\s+/g, ""))
		})
	});
	it('should Google type 1 parsed', async () => {
		let mine = atob(JSON.parse(g1.Records[0].Sns.Message).content)
		let parsed = await simpleParser(mine)
		await mimeProcessor(parsed.attachments).then(xml => {
			expect(xml.replace(/\s+/g, "")).toBe(`<?xml version="1.0" encoding="UTF-8" ?>
<feedback>
  <report_metadata>
    <org_name>google.com</org_name>
    <email>noreply-dmarc-support@google.com</email>
    <extra_contact_info>https://support.google.com/a/answer/2466580</extra_contact_info>
    <report_id>13666349793127425269</report_id>
    <date_range>
      <begin>1707955200</begin>
      <end>1708041599</end>
    </date_range>
  </report_metadata>
  <policy_published>
    <domain>arcloud.com.tw</domain>
    <adkim>r</adkim>
    <aspf>r</aspf>
    <p>quarantine</p>
    <sp>quarantine</sp>
    <pct>100</pct>
    <np>quarantine</np>
  </policy_published>
  <record>
    <row>
      <source_ip>2a01:111:f400:feae::71e</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>fail</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>v.arcloud.com.tw</header_from>
    </identifiers>
    <auth_results>
      <spf>
        <domain>v.arcloud.com.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>2a01:111:f403:2011::700</source_ip>
      <count>4</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>arcloud.com.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>arcloud.com.tw</domain>
        <result>pass</result>
        <selector>selector1</selector>
      </dkim>
      <spf>
        <domain>arcloud.com.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>2a01:111:f400:feae::71a</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>fail</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>v.arcloud.com.tw</header_from>
    </identifiers>
    <auth_results>
      <spf>
        <domain>v.arcloud.com.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>101.53.172.223</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>quarantine</disposition>
        <dkim>fail</dkim>
        <spf>fail</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>v.arcloud.com.tw</header_from>
    </identifiers>
    <auth_results>
      <spf>
        <domain>agx1x0biflkviqbp.db65x8hao86javks.0fbko.5j-d9yi7eaf.ap27.bnc.salesforce.com</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>101.53.172.223</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>quarantine</disposition>
        <dkim>fail</dkim>
        <spf>fail</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>v.arcloud.com.tw</header_from>
    </identifiers>
    <auth_results>
      <spf>
        <domain>pt83lt13s3d51q58.3af3kcfn4d06dg0u.e7j0h.5j-d9yi7eaf.ap27.bnc.salesforce.com</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
</feedback>`.replace(/\s+/g, ""))
		})
	});
	it('should Google type 2 parsed', async () => {
		let mine = atob(JSON.parse(g2.Records[0].Sns.Message).content)
		let parsed = await simpleParser(mine)
		await mimeProcessor(parsed.attachments).then(xml => {
			expect(xml.replace(/\s+/g, "")).toBe(`<?xml version="1.0" encoding="UTF-8" ?>
<feedback>
  <report_metadata>
    <org_name>google.com</org_name>
    <email>noreply-dmarc-support@google.com</email>
    <extra_contact_info>https://support.google.com/a/answer/2466580</extra_contact_info>
    <report_id>12440404711762669067</report_id>
    <date_range>
      <begin>1708387200</begin>
      <end>1708473599</end>
    </date_range>
  </report_metadata>
  <policy_published>
    <domain>awseducate.tw</domain>
    <adkim>r</adkim>
    <aspf>r</aspf>
    <p>quarantine</p>
    <sp>quarantine</sp>
    <pct>100</pct>
    <np>quarantine</np>
  </policy_published>
  <record>
    <row>
      <source_ip>54.240.8.21</source_ip>
      <count>2</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.11.80</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.48.181</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.48.183</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.11.73</source_ip>
      <count>2</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.11.78</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.11.127</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.48.179</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.48.178</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.11.131</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.48.184</source_ip>
      <count>3</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.11.123</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.11.75</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.11.32</source_ip>
      <count>3</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.8.18</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.11.173</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.11.124</source_ip>
      <count>1</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
  <record>
    <row>
      <source_ip>54.240.48.177</source_ip>
      <count>2</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>awseducate.tw</domain>
        <result>pass</result>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
      </dkim>
      <dkim>
        <domain>amazonses.com</domain>
        <result>pass</result>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
</feedback>`.replace(/\s+/g, ""))
		})
	});
	it('should yahoo parsed', async () => {
		let mine = atob(JSON.parse(yahoo.Records[0].Sns.Message).content)
		let parsed = await simpleParser(mine)
		await mimeProcessor(parsed.attachments).then(xml => {
			expect(xml.replace(/\s+/g, "")).toBe(`<?xml version="1.0"?>
<feedback>
  <report_metadata>
    <org_name>Yahoo</org_name>
    <email>dmarchelp@yahooinc.com</email>
    <report_id>1706490254.86742</report_id>
    <date_range>
      <begin>1706400000</begin>
      <end>1706486399</end>
    </date_range>
  </report_metadata>
  <policy_published>
    <domain>awseducate.tw</domain>
    <adkim>r</adkim>
    <aspf>r</aspf>
    <p>quarantine</p>
    <pct>100</pct>
  </policy_published>
  <record>
    <row>
      <source_ip>54.240.8.56</source_ip>
      <count>2</count>
      <policy_evaluated>
        <disposition>none</disposition>
        <dkim>pass</dkim>
        <spf>pass</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <header_from>awseducate.tw</header_from>
    </identifiers>
    <auth_results>
      <dkim>
        <domain>amazonses.com</domain>
        <selector>224i4yxa5dv7c2xz3womw6peuasteono</selector>
        <result>pass</result>
      </dkim>
      <dkim>
        <domain>awseducate.tw</domain>
        <selector>z6pinv7h6ugvuchi7eu2tgwkjtxv727y</selector>
        <result>pass</result>
      </dkim>
      <spf>
        <domain>ses.awseducate.tw</domain>
        <result>pass</result>
      </spf>
    </auth_results>
  </record>
</feedback>`.replace(/\s+/g, ""))
		})
	});
});
