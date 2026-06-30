import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Skilmálar og ábyrgðarfrávik · Flugvellir',
  description: 'Skilmálar notkunar og ábyrgðarfrávik Flugvellir — upplýsingaþjónustu fyrir íslenska flugmenn.',
}

export default function SkilmalarPage() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link href="/" className="legal-back">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Til baka
        </Link>
        <h1 className="legal-title">Skilmálar / Terms &amp; Disclaimer</h1>
        <p className="legal-meta">Flugvellir · Útgáfa 1.0 · Gildistaka 1. júlí 2026</p>
      </header>

      <div className="legal-body">

        {/* ── SAFETY BANNER ── */}
        <div className="legal-safety-banner">
          <div className="legal-safety-icon" aria-hidden="true">⚠</div>
          <div>
            <strong>Þetta er EKKI opinber flugupplýsingaþjónusta.</strong>
            <br />
            This is NOT an official Aeronautical Information Service (AIS).
            <br />
            Gögn á þessum vef mega <em>aldrei</em> koma í stað opinberra veðurtilkynninga,
            NOTAM-þjónustu eða AIP Íslands áður en flug hefst.
            <br />
            <span className="legal-safety-en">Data on this site must <em>never</em> replace official pre-flight briefings, NOTAM services, or the Icelandic AIP.</span>
          </div>
        </div>

        {/* ── 1 ── */}
        <section className="legal-section">
          <h2 className="legal-h2">1. Rekstraraðili / Operator</h2>
          <p>
            Flugvellir (<span className="legal-mono">flugvellir.is</span>) er rekin af{' '}
            <strong>Foxel ehf.</strong>, skráðs félags á Íslandi. Fyrirspurnir vegna þjónustunnar
            sendist á <a href="mailto:foxel@foxel.is">foxel@foxel.is</a>.
          </p>
          <p className="legal-en">
            Flugvellir is operated by Foxel ehf., a company registered in Iceland.
            Enquiries may be directed to <a href="mailto:foxel@foxel.is">foxel@foxel.is</a>.
          </p>
        </section>

        {/* ── 2 ── */}
        <section className="legal-section">
          <h2 className="legal-h2">2. Eðli þjónustunnar / Nature of service</h2>
          <p>
            Flugvellir er <strong>óopinber, sjálfboðaliðaþjónusta</strong> sem safnar saman
            og birtir veðurupplýsingar, dagljóstíma og flugvallargögn fyrir flugmenn á Íslandi
            í kynningarlegum tilgangi. Þjónustan er ekki hluti af opinberri
            flugupplýsingaþjónustu (AIS) samkvæmt ICAO Annex 15, og er ekki viðurkennd af
            Samgöngustofu eða Isavia ANS ohf. sem rekur opinbera AIS-þjónustu Íslands.
          </p>
          <p className="legal-en">
            Flugvellir is an <strong>unofficial, voluntary service</strong> aggregating and
            displaying weather data, daylight times, and aerodrome information for informational
            purposes only. It does not form part of an official Aeronautical Information Service
            (AIS) under ICAO Annex 15, and is not endorsed by the Icelandic Transport Authority
            (Samgöngustofa) or Isavia ANS ohf.
          </p>
        </section>

        {/* ── 3 ── */}
        <section className="legal-section">
          <h2 className="legal-h2">3. Ábyrgðarfrávik — Flugöryggi / Aviation safety disclaimer</h2>
          <p>
            Rekstraraðili ber <strong>enga lagalega ábyrgð</strong> á nákvæmni, nýleika,
            tæknilegri áreiðanleika eða tækileiki þeirra gagna sem birt eru á vefnum.
            Gögn geta verið seinkuð, ófullnægjandi, eða villandi vegna bilunar í upprunakerfi,
            netöryggi eða annarra ástæðna utan stjórnunar rekstraraðila.
          </p>
          <p>
            <strong>Flugmenn bera fulla og einstaklingslegarábyrgð á öllum flugákvörðunum</strong>,
            þar á meðal ákvörðunum byggðum að hluta til eða í heild á upplýsingum frá þessum vef.
            Engin ábyrgð er tekin fyrir líkams- eða eignatjón, dauðsföllum, tjóni á loftfari eða
            öðrum beinum eða óbeinum afleiðingum sem rekja má til notkunar eða misnotkunar á
            þessari þjónustu.
          </p>
          <p className="legal-en">
            The operator accepts <strong>no legal liability</strong> for the accuracy, timeliness,
            technical reliability, or availability of data presented on this site. Data may be
            delayed, incomplete, or misleading due to upstream failures or factors outside the
            operator's control.
          </p>
          <p className="legal-en">
            <strong>Pilots bear full and sole responsibility for all flight decisions</strong>,
            including decisions made in whole or in part based on information from this site.
            No liability is accepted for personal injury, death, property damage, or any direct
            or indirect loss arising from the use or misuse of this service.
          </p>

          <div className="legal-subsection">
            <h3 className="legal-h3">Opinberar heimildir sem ber að nota / Official sources that must be consulted</h3>
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Þjónusta / Service</th>
                  <th>Upprunar / Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Veður á leið (ATIS)</td>
                  <td>VHF á hlutaðeigandi flugvelli — sjá AIP AD 2.18</td>
                </tr>
                <tr>
                  <td>D-VOLMET</td>
                  <td>127.700 MHz · 126.700 MHz (HF)</td>
                </tr>
                <tr>
                  <td>SIGMET / AIRMET</td>
                  <td><a href="https://www.vedur.is/vedur/flugvedur/" target="_blank" rel="noopener noreferrer">vedur.is/vedur/flugvedur</a></td>
                </tr>
                <tr>
                  <td>NOTAMs</td>
                  <td><a href="https://www.avians.is/en/c-preflight-information/notam" target="_blank" rel="noopener noreferrer">avians.is</a> (Isavia AIS)</td>
                </tr>
                <tr>
                  <td>AIP Ísland</td>
                  <td><a href="https://eaip.isavia.is" target="_blank" rel="noopener noreferrer">eaip.isavia.is</a></td>
                </tr>
                <tr>
                  <td>Sólarupprás/-set (opinbert)</td>
                  <td>AIP Ísland GEN 2.7 — Isavia ANS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 4 ── */}
        <section className="legal-section">
          <h2 className="legal-h2">4. Upprunar gagna / Data sources</h2>
          <p>Gögn á vefnum koma frá eftirfarandi þriðja aðilum:</p>
          <ul className="legal-list">
            <li>
              <strong>METAR / TAF</strong> — NOAA Aviation Weather Center
              (<span className="legal-mono">aviationweather.gov</span>), opin gögn samkvæmt
              US Government Open Data Policy.
              <span className="legal-en">Open data from NOAA Aviation Weather Center under US Government Open Data Policy.</span>
            </li>
            <li>
              <strong>NOTAM</strong> — Isavia AIS ohf., birt á grundvelli opinlegra opinna gagna.
              <span className="legal-en">Published by Isavia AIS ohf. as open government data.</span>
            </li>
            <li>
              <strong>Flugvallargögn (ARP, brautir, tíðni, þjónusta)</strong> — AIP Ísland,
              Isavia ANS ohf. Gögn eru talin nákvæm en geta verið úrelt milli AIRAC-lota.
              Alltaf ber að sannreyna í gildandi AIP.
              <span className="legal-en">Aerodrome data (ARP, runways, frequencies, services) sourced from AIP Iceland, Isavia ANS ohf. Data is believed accurate but may be out of date between AIRAC cycles — always verify against the current AIP before flight.</span>
            </li>
            <li>
              <strong>Sólarupprás, -set og birtuljós</strong> — reiknuð stjörnufræðilega af
              opnum hugbúnaðarlykli <span className="legal-mono">suncalc</span> (V. Agafonkin)
              á grundvelli USNO-reiknilíkana. Nákvæmni er ±1–2 mínútur miðað við opinbegar
              töflur Isavia í AIP GEN 2.7.
              <span className="legal-en">Sunrise, sunset, and civil twilight computed astronomically using the open-source <span className="legal-mono">suncalc</span> library (V. Agafonkin), based on USNO algorithms. Accuracy is ±1–2 minutes vs. official Isavia tables in AIP GEN 2.7.</span>
            </li>
          </ul>
        </section>

        {/* ── 5 ── */}
        <section className="legal-section">
          <h2 className="legal-h2">5. Persónuvernd / Privacy</h2>
          <p>
            Flugvellir <strong>safnar engum persónugreinanlegum gögnum</strong>. Engar
            notendaskráningar, engar vafrakökur og engin rakning þriðja aðila.
          </p>
          <p>
            Vefurinn notar <span className="legal-mono">localStorage</span> í vafra notanda
            eingöngu til að geyma stillingar á staðnum (t.d. nýlega skoðaðir flugvellir,
            hliðarstikustillingar). Þessi gögn eru aldrei send til þjóna og eru eingöngu
            aðgengileg í tæki notanda.
          </p>
          <p>
            Vefhýsingaþjónustan kann að skrá IP-tölur í algengum aðgangskladda
            í rekstrarlegar og öryggislegar tilgangar. Þessir kladdar eru geymdir í
            samræmi við lög og eyðdir reglulega.
          </p>
          <p className="legal-en">
            Flugvellir collects <strong>no personally identifiable information</strong>.
            No accounts, no cookies, no third-party tracking. Browser{' '}
            <span className="legal-mono">localStorage</span> is used only for local UI preferences
            and never transmitted. Hosting infrastructure may log IP addresses for
            operational and security purposes per applicable law.
          </p>
          <p>
            Frekari upplýsingar, eða beiðni um eyðingu gagna, sendist á{' '}
            <a href="mailto:foxel@foxel.is">foxel@foxel.is</a> í samræmi við
            persónuverndarlög nr. 90/2018 (GDPR-innleiðing á Íslandi).
          </p>
        </section>

        {/* ── 6 ── */}
        <section className="legal-section">
          <h2 className="legal-h2">6. Hugverkaréttur / Intellectual property</h2>
          <p>
            Hönnun, uppsetning og sérsniðin forrit Flugvellir eru í eigu Foxel ehf. og njóta
            verndar höfundarréttarlaga nr. 73/1972. Gögn úr AIP Íslands eru í eigu Isavia ANS
            ohf. og eru birt í samræmi við opinbegar heimildirnar. Kortgögn eru frá OpenStreetMap
            (<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap-framlagi</a>,
            ODbL-leyfi). METAR/TAF-gögn eru opin gögn frá NOAA.
          </p>
        </section>

        {/* ── 7 ── */}
        <section className="legal-section">
          <h2 className="legal-h2">7. Breytingar / Amendments</h2>
          <p>
            Rekstraraðili áskilur sér rétt til að breyta skilmálum þessum hvenær sem er án
            sérstaks fyrirvara. Gildandi útgáfa er alltaf aðgengileg á þessum slóð. Áframhaldandi
            notkun þjónustunnar eftir breytingar telst vera samþykki á uppfærðum skilmálum.
          </p>
        </section>

        {/* ── 8 ── */}
        <section className="legal-section">
          <h2 className="legal-h2">8. Lög og lögsaga / Governing law</h2>
          <p>
            Skilmálar þessir lúta <strong>íslenskum lögum</strong>, þar á meðal
            loftferðarlögum nr. 60/1998 með síðari breytingum, persónuverndarlögum nr. 90/2018
            og lögum um rafræn viðskipti og aðra rafræna þjónustu nr. 30/2002.
            Ágreiningur sem kann að rísa vegna þessara skilmála eða notkunar þjónustunnar
            skal lagður fyrir <strong>Héraðsdóm Reykjavíkur</strong>.
          </p>
          <p className="legal-en">
            These terms are governed by <strong>Icelandic law</strong>, including the Civil
            Aviation Act no. 60/1998 as amended, the Data Protection Act no. 90/2018 (GDPR),
            and the Electronic Commerce Act no. 30/2002. Disputes shall be submitted to the
            <strong> District Court of Reykjavík</strong>.
          </p>
        </section>

      </div>

      <footer className="legal-footer">
        <Link href="/" className="legal-back">← Flugvellir</Link>
        <span>Foxel ehf. · {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
