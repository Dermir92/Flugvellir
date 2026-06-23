// Flugvellir — Icelandic Airport Data
// Source: Isavia eAIP AIRAC A06/2026, effective 11 JUN 2026
// Verified against: https://eaip.isavia.is/A_06-2026_2026_06_11/
// NOTE: Always verify with current NOTAMs and official AIP before flight.

const AIRPORTS = [

  // ── INTERNATIONAL ─────────────────────────────────────────────────────────

  {
    icao: "BIKF",
    iata: "KEF",
    name: "Keflavík International Airport",
    name_is: "Alþjóðaflugvöllur Keflavíkur",
    type: "international",
    city: "Keflavík",
    region: "Suðurnes",
    elevation_ft: 170,
    elevation_m: 52,
    lat: 63.9850,
    lng: -22.6056,
    lat_dms: "63°59'06\"N",
    lng_dms: "022°36'20\"W",
    description: "Iceland's main international gateway. Built on a lava plain on the Reykjanes peninsula — stark, windswept, and reliably busy. Handles virtually all of Iceland's intercontinental traffic, with the volcanics of Reykjanes as a constant backdrop.",
    runways: [
      {
        id: "01/19",
        length_m: 3054,
        width_m: 60,
        surface: "Asphalt",
        pcn: "73/F/A/W/T",
        notes: "ILS CAT I on RWY 01 (IKN 111.3); ILS CAT II/III on RWY 19 (IKO 110.3)"
      },
      {
        id: "10/28",
        length_m: 3065,
        width_m: 60,
        surface: "Asphalt",
        pcn: "80/F/A/W/T",
        notes: "ILS CAT II on RWY 10 (IKF 109.5); ILS CAT I on RWY 28 (IKW 108.5)"
      }
    ],
    frequencies: [
      { role: "ATIS",  freq: "128.300" },
      { role: "DEL",   freq: "121.000" },
      { role: "GND",   freq: "121.900" },
      { role: "TWR",   freq: "118.300" },
      { role: "APP",   freq: "119.300" },
      { role: "APP",   freq: "121.300" }
    ],
    nav: [
      { type: "VOR/TACAN", ident: "KFV",  freq: "112.800", notes: "CH75X, H24" },
      { type: "NDB",       ident: "KF",   freq: "392",     notes: "100 NM range" },
      { type: "ILS/DME",   ident: "IKF",  freq: "109.500", notes: "CAT II, RWY 10" },
      { type: "ILS/DME",   ident: "IKN",  freq: "111.300", notes: "CAT I, RWY 01" },
      { type: "ILS/DME",   ident: "IKO",  freq: "110.300", notes: "CAT II/III, RWY 19" },
      { type: "ILS/DME",   ident: "IKW",  freq: "108.500", notes: "CAT I, RWY 28" }
    ],
    hours: {
      service: "ATC",
      schedule: "H24",
      notes: null
    },
    fuel: {
      avgas: false,
      jet_a1: true,
      supplier: "Isavia OHF — hydrant 3,500 L/min, refuellers 2,000 L/min"
    },
    services: {
      ppr: false,
      customs: true,
      deicing: true,
      fire_cat: "8",
      slots: "Required for commercial operations — contact Isavia Slot Office",
      handling: "Full ground handling available"
    },
    remarks: [
      "Strong and gusty surface winds common, particularly from WSW.",
      "Military activity on north apron — NOTAMs frequently issued for restricted areas.",
      "CAT II/III ops on RWY 19 require special approval and airline equipment certification.",
      "VOR/TACAN KFV 112.800 is a primary holding/routing fix for the region.",
      "Fire CAT 8 during 0500–1900, CAT 7 during 1900–0500."
    ],
    pilot_notes: {
      circuit_alt_ft: null,
      circuit_dir: null,
      t_and_g: "Not normally available for visiting VFR traffic. Contact Keflavík APP for a specific clearance if required — expect it to be low priority against airline traffic.",
      entry: "Contact Keflavík Approach on 119.300 before entering the CTR. The CTR extends to FL065 — you need explicit clearance to enter, even in VMC. Never enter without a readback clearance.",
      sample_call: "Keflavík Approach, OY-ABC, Cessna 172, [position], VFR, request transit/approach clearance.",
      tips: [
        "The Keflavík CTR extends to FL065 — confirm lateral and vertical limits before departure.",
        "Strong and gusty surface winds are common from WSW, routinely 20–35 kt and higher in autumn/winter.",
        "This is a busy international airport — keep transmissions brief, professional, and expect holds.",
        "Confirm you intend BIKF (Keflavík), not BIRK (Reykjavík city airport), when filing your flight plan."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

  {
    icao: "BIRK",
    iata: "RKV",
    name: "Reykjavík Airport",
    name_is: "Reykjavíkurflugvöllur",
    type: "international",
    city: "Reykjavík",
    region: "Höfuðborgarsvæðið",
    elevation_ft: 45,
    elevation_m: 14,
    lat: 64.1300,
    lng: -21.9406,
    lat_dms: "64°07'48\"N",
    lng_dms: "021°56'26\"W",
    description: "Reykjavík's city-centre airport — the hub for domestic flying and general aviation. On a clear day you can see Snæfellsjökull from the runway. Compact, well-run, and one of the most atmospherically situated airports in the world.",
    runways: [
      {
        id: "01/19",
        length_m: 1567,
        width_m: 45,
        surface: "Asphalt",
        pcn: "35/F/A/X/T",
        notes: "ILS CAT I on RWY 19 (IRK 109.9); LOC/DME on RWY 13 (IRE 109.1)"
      },
      {
        id: "13/31",
        length_m: 1230,
        width_m: 45,
        surface: "Asphalt",
        pcn: "25/F/A/X/T",
        notes: "Crosswind runway. Vegetation penetrates obstacle surfaces SE of runway."
      }
    ],
    frequencies: [
      { role: "ATIS",  freq: "128.100" },
      { role: "GND",   freq: "121.700" },
      { role: "TWR",   freq: "118.000" },
      { role: "APP",   freq: "119.000" }
    ],
    nav: [
      { type: "NDB",     ident: "EL",   freq: "335",     notes: "H24, ~100 NM" },
      { type: "NDB",     ident: "RK",   freq: "355",     notes: "H24, ~100 NM" },
      { type: "LOC/DME", ident: "IRE",  freq: "109.100", notes: "RWY 13, CH28X" },
      { type: "ILS/DME", ident: "IRK",  freq: "109.900", notes: "CAT I, RWY 19, CH36X" },
      { type: "VOT",     ident: "DOTS", freq: "113.000", notes: "Ground use only" }
    ],
    hours: {
      service: "ATC",
      schedule: "Weekdays 07:00–23:00; Weekends & holidays 08:00–23:00",
      notes: "Closed Christmas Day, New Year's Day, Easter Sunday. AFIS available outside hours on 15 min notice for emergency, ambulance, coastguard."
    },
    fuel: {
      avgas: true,
      jet_a1: true,
      supplier: "Icelandair ehf / Iceland Aero Agents — AVGAS 200 L/min, Jet A-1 800 L/min"
    },
    services: {
      ppr: false,
      customs: true,
      deicing: true,
      fire_cat: "6",
      slots: "Not required for GA",
      handling: "Multiple handlers available"
    },
    remarks: [
      "City-centre location — visual approaches to RWY 01/19 can be spectacular in VMC, demanding in reduced visibility.",
      "RWY 19 ILS CAT I; LOC-only approach available for RWY 13.",
      "Close proximity to BIKF — always confirm correct airport when filing in Reykjavík area.",
      "Noise abatement procedures apply — avoid residential areas on departure.",
      "CAT VI standard; CAT VII available with 30 min notice."
    ],
    pilot_notes: {
      circuit_alt_ft: 1000,
      circuit_dir: "Left",
      t_and_g: "Permitted with ATC clearance. Request touch-and-go at your initial radio call — ATC will advise based on traffic and noise abatement requirements.",
      entry: "Contact Reykjavík Tower on 118.000 at or before the CTZ boundary. Check GND 121.700 for taxi clearance. ATIS not published — request information from Tower.",
      sample_call: "Reykjavík Tower, OY-ABC, Cessna 172, [position], VFR inbound, request landing clearance.",
      tips: [
        "Noise abatement: avoid overflying the Reykjavík city centre — depart and arrive over water where possible.",
        "Confirm you intend BIRK (city airport), not BIKF (Keflavík International) — they are 40 km apart.",
        "Airport is closed Christmas Day, New Year's Day, Easter Sunday — verify AIP before filing.",
        "Vegetation penetrates obstacle surfaces SE of RWY 13 — stay alert on base and final for RWY 31."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

  // ── REGIONAL ──────────────────────────────────────────────────────────────

  {
    icao: "BIAR",
    iata: "AEY",
    name: "Akureyri Airport",
    name_is: "Flugvöllur Akureyrar",
    type: "international",
    city: "Akureyri",
    region: "Norðurland eystra",
    elevation_ft: 7,
    elevation_m: 2,
    lat: 65.6567,
    lng: -18.0719,
    lat_dms: "65°39'24\"N",
    lng_dms: "018°04'19\"W",
    description: "Northern Iceland's main airport, sitting in the floor of Eyjafjörður fjord with mountains rising steeply on both sides. Two ILS approaches — the step-down to RWY 19 and the steep offset LOC to RWY 01 — make this one of the more demanding fields in Iceland.",
    runways: [
      {
        id: "01/19",
        length_m: 2400,
        width_m: 45,
        surface: "Asphalt",
        pcn: "45/F/A/X/T",
        notes: "ILS CAT I RWY 01 (IAL 108.9, GP 5.3°); offset LOC RWY 19 (IAR 110.5, 3° offset). Turning area 61m×58m asphalt at each end."
      }
    ],
    frequencies: [
      { role: "ATIS", freq: "136.200" },
      { role: "TWR",  freq: "118.200" }
    ],
    nav: [
      { type: "VOR/DME", ident: "AKI", freq: "113.600", notes: "CH83X; not usable below 5,500 ft" },
      { type: "NDB",     ident: "AR",  freq: "334",     notes: "H24, ~25 NM" },
      { type: "ILS/DME", ident: "IAL", freq: "108.900", notes: "CAT I, RWY 01, GP 5.3°" },
      { type: "LOC",     ident: "IAR", freq: "110.500", notes: "RWY 19, 3° offset. No glide path." }
    ],
    hours: {
      service: "ATC",
      schedule: "Daily 07:00–23:00. Christmas Eve & New Year's Eve 07:00–16:00.",
      notes: "No service New Year's Day, Easter Sunday, Christmas Day."
    },
    fuel: {
      avgas: true,
      jet_a1: true,
      supplier: "Isavia — AVGAS 150 L/min, Jet A-1 650 L/min"
    },
    services: {
      ppr: false,
      customs: true,
      deicing: true,
      fire_cat: "6",
      slots: "Not required",
      handling: "Available — Icelandair Akureyri 131.4 MHz; Akureyri FBO 132.9 MHz"
    },
    remarks: [
      "Fjord terrain causes significant wind shear and turbulence on approach, even at low surface winds.",
      "LOC RWY 19 has a 3° offset — do not confuse with ILS track. No glide path signal.",
      "ILS RWY 01 uses a steep 5.3° glide path due to terrain south of field.",
      "Winter ops: icing conditions and low stratus common. Check PIREPs.",
      "CAT VI standard; CAT VII available with 30 min notice."
    ],
    pilot_notes: {
      circuit_alt_ft: 1000,
      circuit_dir: "Left",
      t_and_g: "Permitted with ATC clearance. Request at first contact — Tower will advise based on IFR traffic and terrain.",
      entry: "Contact Akureyri Tower on 118.200. ATIS available on 136.200 — always check ATIS before calling Tower.",
      sample_call: "Akureyri Tower, OY-ABC, Cessna 172, [position], VFR inbound, information [ATIS ident], request landing clearance.",
      tips: [
        "Mountains rise steeply on both sides of Eyjafjörður fjord — standard left circuit may be restricted depending on cloud base and terrain clearance.",
        "Wind shear and turbulence on approach are common even at low surface winds — always check PIREPs.",
        "ILS RWY 01 has a steep 5.3° glide path due to terrain — do not fly it as a standard 3° approach.",
        "Airport is ATC except certain Icelandic public holidays — no unannounced arrivals."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

  {
    icao: "BIEG",
    iata: "EGS",
    name: "Egilsstaðir Airport",
    name_is: "Flugvöllur Egilsstaða",
    type: "international",
    city: "Egilsstaðir",
    region: "Austurland",
    elevation_ft: 76,
    elevation_m: 23,
    lat: 65.2833,
    lng: -14.4014,
    lat_dms: "65°17'00\"N",
    lng_dms: "014°24'05\"W",
    description: "Gateway to the East Fjords. Serves as a North Atlantic diversion alternate for transatlantic traffic. Despite being AFIS-only, the infrastructure is solid — ILS CAT I on RWY 03, good fuel and handling.",
    runways: [
      {
        id: "03/21",
        length_m: 1850,
        width_m: 45,
        surface: "Asphalt",
        pcn: "45/F/A/X/T",
        notes: "ILS CAT I on RWY 03 (IES 109.3). TORA/TODA/ASDA 2,000 m; LDA 1,850 m."
      }
    ],
    frequencies: [
      { role: "AFIS", freq: "119.400" }
    ],
    nav: [
      { type: "NDB",     ident: "ES",  freq: "365",     notes: "H24, ~50 NM" },
      { type: "NDB",     ident: "VA",  freq: "335",     notes: "H24, ~50 NM" },
      { type: "NDB",     ident: "MN",  freq: "382",     notes: "During AFIS hours, ~15 NM" },
      { type: "ILS/DME", ident: "IES", freq: "109.300", notes: "CAT I, RWY 03, CH30X, GP 332.0" }
    ],
    hours: {
      service: "AFIS",
      schedule: "Daily 07:00–23:00",
      notes: "Outside hours with 30 min notice."
    },
    fuel: {
      avgas: true,
      jet_a1: true,
      supplier: "Icelandair ehf — Jet A-1 600 L/min"
    },
    services: {
      ppr: true,
      customs: true,
      deicing: true,
      fire_cat: "5",
      slots: "Not required",
      handling: "Available"
    },
    remarks: [
      "Used as a North Atlantic diversion alternate — equipment available for unexpected heavy traffic.",
      "Fog frequent in the Lagarfljót river valley, particularly autumn mornings.",
      "CAT V during AFIS hours; CAT III outside hours; higher on request.",
      "East Iceland gateway to Vatnajökull, Jökulsárlón, and the highlands."
    ],
    pilot_notes: {
      circuit_alt_ft: 1000,
      circuit_dir: "Left",
      t_and_g: "Permitted — announce all intentions on AFIS frequency. AFIS will confirm traffic. PPR required; must be arranged before arrival.",
      entry: "Contact Egilsstaðir AFIS on 119.400 at least 10 minutes before arrival. PPR is required — contact the airport in advance or you risk being refused.",
      sample_call: "Egilsstaðir Radio, OY-ABC, Cessna 172, [position], VFR inbound, PPR confirmed, request airfield information.",
      tips: [
        "PPR is mandatory — do not depart for Egilsstaðir without confirmed permission.",
        "Fog is frequent in the Lagarfljót river valley, especially on autumn and early-morning arrivals.",
        "AFIS provides information only — separation is the pilot's responsibility in uncontrolled airspace.",
        "Airport is also used as a North Atlantic diversion alternate — expect possible heavy aircraft traffic at any time."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

  {
    icao: "BIIS",
    iata: "IFJ",
    name: "Ísafjörður Airport",
    name_is: "Flugvöllur Ísafjarðar",
    type: "regional",
    city: "Ísafjörður",
    region: "Vestfirðir",
    elevation_ft: 8,
    elevation_m: 2,
    lat: 66.0581,
    lng: -23.1353,
    lat_dms: "66°03'29\"N",
    lng_dms: "023°08'07\"W",
    description: "One of the most demanding approaches in Iceland — possibly in Europe. The airport sits on a spit of land in a deep fjord. Pilots must fly a curved visual approach around steep terrain. No traffic circuit established due to surrounding mountains.",
    runways: [
      {
        id: "07/25",
        length_m: 1400,
        width_m: 43,
        surface: "Asphalt stabilized gravel",
        pcn: null,
        notes: "Curved visual approach only — no IFR approach available. Strip width 80m at end 07, narrows to 60m at end 25. Night ops significantly restricted."
      }
    ],
    frequencies: [
      { role: "AFIS", freq: "118.800" }
    ],
    nav: [
      { type: "NDB", ident: "IS", freq: "385", notes: "H24, ~25 NM" },
      { type: "NDB", ident: "OG", freq: "400", notes: "During AFIS hours, ~25 NM" },
      { type: "NDB", ident: "RE", freq: "316", notes: "H24, ~50 NM" },
      { type: "DME", ident: "OG", freq: "110.100", notes: "CH38X, H24" }
    ],
    hours: {
      service: "AFIS",
      schedule: "Summer (Jun–Aug): Mon–Fri 07:00–18:45, Sat 08:00–18:15, Sun 08:00–18:45. Winter: Mon–Fri 08:00–18:00, Sat–Sun 09:00–18:00.",
      notes: "Closed Easter, Christmas, New Year's Day."
    },
    fuel: {
      avgas: true,
      jet_a1: true,
      supplier: "On request — +354 892-3923 / +354 844-8500. AVGAS H24 on request, Jet A-1 09:00–18:00."
    },
    services: {
      ppr: false,
      customs: false,
      deicing: true,
      fire_cat: "4",
      slots: "Not required",
      handling: "Limited"
    },
    remarks: [
      "CURVED VISUAL APPROACH — must be flown exactly as published. No IFR approach.",
      "No traffic circuit established — terrain on all sides.",
      "Night operations carry significant restrictions — see AIP AD 2.23.",
      "Westfjords Air Routes require special approval for crews unfamiliar with this approach.",
      "In good VMC on a summer day, one of the most beautiful approaches in the world."
    ],
    pilot_notes: {
      circuit_alt_ft: null,
      circuit_dir: null,
      t_and_g: "Not possible — no standard traffic circuit due to surrounding mountains on all sides. Single approach and departure only.",
      entry: "Contact Ísafjörður AFIS on 118.800 well before the approach. A thorough pre-flight study of the published curved approach procedure is mandatory — do not attempt without prior preparation.",
      sample_call: "Ísafjörður Radio, OY-ABC, Cessna 172, [position], VFR inbound, request airfield information.",
      tips: [
        "Mandatory pre-flight study: the curved visual approach procedure must be studied before flight — it cannot be improvised.",
        "No traffic circuit is established due to terrain on all sides — approach and depart as per published procedure only.",
        "Night operations are severely restricted — plan to arrive and depart in daylight.",
        "Strong fjord winds can produce severe turbulence below ridge height, especially with strong NW flow.",
        "Never attempt the approach in IMC — there is no IFR approach available."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

  {
    icao: "BIHN",
    iata: "HFN",
    name: "Hornafjörður Airport",
    name_is: "Flugvöllur Hornarfjarðar",
    type: "regional",
    city: "Höfn",
    region: "Austurland",
    elevation_ft: 24,
    elevation_m: 7,
    lat: 64.2956,
    lng: -15.2272,
    lat_dms: "64°17'44\"N",
    lng_dms: "015°13'38\"W",
    description: "Serves the Höfn area and the Vatnajökull glacier region. Surrounded by extraordinary scenery — Vatnajökull dominates the horizon to the north. A useful base for glacier tours and southeast Iceland operations.",
    runways: [
      {
        id: "18/36",
        length_m: 1500,
        width_m: 30,
        surface: "Asphalt stabilized gravel",
        pcn: null,
        notes: "RWY 18 slope −0.3%, THR elevation 24 ft. RWY 36 slope +0.3%, THR elevation 7 ft. NDB approach available."
      }
    ],
    frequencies: [
      { role: "AFIS", freq: "119.100" }
    ],
    nav: [
      { type: "NDB",    ident: "HN", freq: "330", notes: "H24" },
      { type: "Marker", ident: "",   freq: "75",  notes: "H24" }
    ],
    hours: {
      service: "AFIS",
      schedule: "Mon 08:00–16:00; Tue closed; Wed 07:00–18:30; Thu–Fri 08:00–16:00; Sat closed; Sun 12:00–16:00.",
      notes: "After-hours: 1 hr notice (summer), 2 hr (winter). PPR for after-hours."
    },
    fuel: {
      avgas: false,
      jet_a1: true,
      notes: "Með fyrirfram beiðni (PN)",
      supplier: "Friðrik Jónas Friðriksson — +354 478-1859 / GSM +354 893-0693 / jonas@rafhorn.is · 170 L/min"
    },
    services: {
      ppr: true,
      customs: false,
      deicing: false,
      fire_cat: "3",
      slots: "Not required",
      handling: "Basic"
    },
    remarks: [
      "Strong katabatic winds common off Vatnajökull — can be severe with little warning.",
      "CAT III during operational hours; CAT IV for scheduled flights.",
      "Jökulsárlón glacier lagoon is ~60 km NW — popular destination for glacier tour ops.",
      "Low-level helicopter operations in area — glacier rescue and tour activity."
    ],
    pilot_notes: {
      circuit_note: "Right-hand pattern for RWY 18. Left-hand pattern for RWY 36. Confirm circuit altitude in current AIP charts.",
      entry: "Contact Hornafjörður AFIS on 119.100 before arrival. PPR is required — call ahead. Note the irregular opening hours before departure.",
      sample_call: "Hornafjörður Radio, OY-ABC, Cessna 172, [position], VFR inbound, PPR confirmed, request airfield information.",
      tips: [
        "Bird hazard: geese are common on and around the airfield, mainly east of the runway. Present from end of March through October — peak numbers in spring and autumn.",
        "Geese thin out June–August when nesting ends, but do not disappear entirely.",
        "Strong katabatic winds can develop rapidly off Vatnajökull with little warning — monitor MET carefully.",
        "PPR required and irregular hours (closed Tuesday and Saturday) — always confirm before departure."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

  {
    icao: "BIVM",
    iata: "VEY",
    name: "Vestmannaeyjar Airport",
    name_is: "Flugvöllur Vestmannaeyja",
    type: "regional",
    city: "Vestmannaeyjar",
    region: "Suðurland",
    elevation_ft: 326,
    elevation_m: 99,
    lat: 63.4250,
    lng: -20.2792,
    lat_dms: "63°25'30\"N",
    lng_dms: "020°16'45\"W",
    description: "On the Westman Islands — a cluster of volcanic islands off Iceland's south coast. The highest airport elevation in Iceland's domestic network. The 1973 eruption of Eldfell buried part of the town and remains visible from the airport.",
    runways: [
      {
        id: "03/21",
        length_m: 1160,
        width_m: 45,
        surface: "Asphalt stabilized gravel",
        pcn: null,
        notes: "PAPI 3.0° both ends. Slope ±0.2%."
      },
      {
        id: "12/30",
        length_m: 1199,
        width_m: 45,
        surface: "Asphalt stabilized gravel",
        pcn: null,
        notes: "PAPI 3.0°/3.5°. Slope ±0.7%."
      }
    ],
    frequencies: [
      { role: "AFIS", freq: "118.500" }
    ],
    nav: [
      { type: "NDB", ident: "VM", freq: "375",     notes: "H24, ~100 NM" },
      { type: "DME",          ident: "HL", freq: "110.700", notes: "CH44X, H24" },
      { type: "NDB/Locator", ident: "HL", freq: "345",     notes: "During AFIS hours" }
    ],
    hours: {
      service: "AFIS",
      schedule: "Summer (May–Aug): Mon–Fri 08:00–19:00, Sat 09:00–17:00, Sun 09:00–18:00. Winter (Sep–Apr): Mon–Fri 08:00–18:00, Sat–Sun 09:00–18:00.",
      notes: "Extended on request — 1 hr (summer), 2 hr (winter) notice required."
    },
    fuel: {
      avgas: false,
      jet_a1: true,
      supplier: "On request — +354 515-1100 or +354 840-1720. 200 L/min."
    },
    services: {
      ppr: true,
      customs: false,
      deicing: true,
      fire_cat: "3",
      slots: "Not required",
      handling: "Basic"
    },
    remarks: [
      "Volcanic island — Eldfell crater and 1973 lava flow clearly visible from circuit.",
      "Fog common around the islands, can dissipate suddenly — check METARs carefully.",
      "Strong and unpredictable wind shear on approach.",
      "Puffin colony nearby — bird activity NOTAMs issued seasonally.",
      "PPR required — contact operator before departure."
    ],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

  // ── SMALL AIRFIELDS (eAIP verified) ───────────────────────────────────────

  {
    icao: "BIVO",
    iata: "VPN",
    name: "Vopnafjörður Airport",
    name_is: "Flugvöllur Vopnafjarðar",
    type: "small",
    city: "Vopnafjörður",
    region: "Norðurland eystra",
    elevation_ft: 10,
    elevation_m: 3,
    lat: 65.7206,
    lng: -14.8506,
    lat_dms: "65°43'14\"N",
    lng_dms: "014°51'02\"W",
    description: "Remote northeast Iceland. One of the quieter strips in the country — serves a small community but important for connectivity to the northeast.",
    runways: [
      {
        id: "04/22",
        length_m: 885,
        width_m: 30,
        surface: "Asphalt stabilized gravel",
        pcn: null,
        notes: "RWY 04 THR elevation 9 ft (bearing 034.82°). RWY 22 THR elevation 8 ft (bearing 214.83°)."
      }
    ],
    frequencies: [
      { role: "AFIS", freq: "118.100" }
    ],
    nav: [],
    hours: {
      service: "AFIS",
      schedule: "Mon/Tue/Thu 08:00–15:00; Fri/Sun 13:00–17:00; Wed/Sat closed.",
      notes: "Out-of-hours with 1–2 hr notice."
    },
    fuel: {
      avgas: false,
      jet_a1: false,
      supplier: "No fuel available — plan accordingly"
    },
    services: {
      ppr: false,
      customs: false,
      deicing: false,
      fire_cat: "3",
      slots: "Not required",
      handling: "Self-service"
    },
    remarks: [
      "No fuel on field — nearest fuel at BIEG (Egilsstaðir).",
      "AFIS hours are limited — confirm before departure.",
      "Good base for northeast Iceland coastal fjord flying."
    ],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

  {
    icao: "BIHU",
    iata: "HZK",
    name: "Húsavík Airport",
    name_is: "Flugvöllur Húsavíkur",
    type: "small",
    city: "Húsavík",
    region: "Norðurland eystra",
    elevation_ft: 50,
    elevation_m: 15,
    lat: 65.9525,
    lng: -17.4258,
    lat_dms: "65°57'09\"N",
    lng_dms: "017°25'33\"W",
    description: "Gateway to northeast Iceland and the whale watching capital of the country. Short but usable strip with Skjálfandi bay views. The space exploration connection is real — NASA astronauts trained in the lava fields nearby.",
    runways: [
      {
        id: "02/20",
        length_m: 1603,
        width_m: 30,
        surface: "Asphalt stabilized gravel",
        pcn: null,
        notes: "RWY 02 slope −0.08%, THR 48 ft. RWY 20 slope +0.08%, THR 44 ft."
      }
    ],
    frequencies: [
      { role: "AFIS", freq: "119.200" }
    ],
    nav: [],
    hours: {
      service: "AFIS",
      schedule: "Available on request during office hours 09:00–16:00.",
      notes: "Surcharge applies outside hours."
    },
    fuel: {
      avgas: false,
      jet_a1: false,
      supplier: "No fuel on field"
    },
    services: {
      ppr: false,
      customs: false,
      deicing: false,
      fire_cat: "3",
      slots: "Not required",
      handling: "Basic"
    },
    remarks: [
      "Whale watching capital of Iceland — significant small boat and tour activity on the bay.",
      "Good views of Tjörnes peninsula and Skjálfandi bay from the circuit.",
      "NASA astronauts (Apollo program) used the Húsavík lava fields as moon-surface training ground."
    ],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

  {
    icao: "BIBA",
    iata: null,
    name: "Bakki",
    name_is: "Bakkaflugvöllur",
    type: "small",
    city: "Bakki",
    region: "Suðurland",
    elevation_ft: 33,
    elevation_m: 10,
    lat: 63.5561,
    lng: -20.1375,
    lat_dms: "63°33'22\"N",
    lng_dms: "020°08'15\"W",
    description: "A small coastal strip on Iceland's south shore with both grass and asphalt-gravel surfaces. VFR only — no ATS services on field.",
    runways: [
      { id: "03/21", length_m: 800,  width_m: 30, surface: "Grass",                    pcn: null, notes: null },
      { id: "12/30", length_m: 1000, width_m: 30, surface: "Asphalt-stabilized gravel", pcn: null, notes: "Coarse surface can cause damage to tires." }
    ],
    frequencies: [
      { role: "MF", freq: "118.400" }
    ],
    nav: [],
    hours: {
      service: "Uncontrolled",
      schedule: "H24",
      notes: "VFR only. No ATS services on field."
    },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: {
      ppr: false, customs: false, deicing: false,
      fire_cat: "0", handling: "Self-service"
    },
    remarks: [
      "VFR only — IFR not permitted.",
      "Pilot-activated runway lights on RWY 12/30: key 122.8 MHz three times. Lights extinguish after 18 min.",
      "ARFF CAT 0 — no fire service on field."
    ],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

  {
    icao: "BIBL",
    iata: null,
    name: "Blönduós Airport",
    name_is: "Blönduósflugvöllur",
    type: "small",
    city: "Blönduós",
    region: "Norðurland vestra",
    elevation_ft: 153,
    elevation_m: 47,
    lat: 65.6450,
    lng: -20.2875,
    lat_dms: "65°38'42\"N",
    lng_dms: "020°17'15\"W",
    description: "A gravel strip serving the Húnaþing farming district in northwest Iceland. AVGAS available and IFR-capable with an RNP approach on RWY 03.",
    runways: [
      { id: "03/21", length_m: 970, width_m: 27, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.600" }
    ],
    nav: [],
    hours: {
      service: "Uncontrolled",
      schedule: "HX",
      notes: "No ATS services on field."
    },
    fuel: { avgas: true, jet_a1: false, supplier: "AVGAS 100LL" },
    services: {
      ppr: false, customs: false, deicing: false,
      fire_cat: "", handling: "Self-service"
    },
    remarks: [
      "IFR/VFR operations permitted.",
      "RNP approach available on RWY 03.",
      "APAPI on both runway ends — RWY 03 offset 3° to west."
    ],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

﻿
  {
    icao: "BIBR", iata: null,
    name: "Búðardalur Airport", name_is: "Búðardalur",
    type: "small", city: "Búðardalur", region: "Vesturland",
    elevation_ft: 151, elevation_m: 46,
    lat: 65.0753, lng: -21.8003,
    lat_dms: "65°04'31\"N", lng_dms: "021°48'01\"W",
    description: "Búðardalur airport in Vesturland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "06/24", length_m: 795, width_m: 24, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIDV", iata: null,
    name: "Djúpivogur Airport", name_is: "Djúpivogur",
    type: "small", city: "Djúpivogur", region: "Austurland",
    elevation_ft: 6, elevation_m: 2,
    lat: 64.6442, lng: -14.2828,
    lat_dms: "64°38'39\"N", lng_dms: "014°16'58\"W",
    description: "Djúpivogur airport in Austurland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "17/35", length_m: 745, width_m: 24, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      tips: [
        "Warning: vehicles may be on or near runway 17/35. Check runway is clear before take-off and landing.",
        "Uncontrolled airfield — make position reports early and check the runway visually."
      ]
    },
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIFM", iata: null,
    name: "Fagurhólsmýri Airport", name_is: "Fagurhólsmýri",
    type: "small", city: "Fagurhólsmýri", region: "Suðurland",
    elevation_ft: 53, elevation_m: 16,
    lat: 63.8747, lng: -16.6411,
    lat_dms: "63°52'29\"N", lng_dms: "016°38'28\"W",
    description: "Fagurhólsmýri airport in Suðurland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "09/27", length_m: 794, width_m: 28, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIFL", iata: null,
    name: "Flúðir Airport", name_is: "Flúðir",
    type: "small", city: "Flúðir", region: "Suðurland",
    elevation_ft: 243, elevation_m: 74,
    lat: 64.1428, lng: -20.3261,
    lat_dms: "64°08'34\"N", lng_dms: "020°19'34\"W",
    description: "Flúðir airport in Suðurland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "04/22", length_m: 670, width_m: 18, surface: "Grass", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIGS", iata: null,
    name: "Grímsstaðir Airport", name_is: "Grímsstaðir",
    type: "small", city: "Grímsstaðir", region: "Norðurland eystra",
    elevation_ft: 1260, elevation_m: 384,
    lat: 65.6325, lng: -16.1483,
    lat_dms: "65°37'57\"N", lng_dms: "016°08'54\"W",
    description: "Grímsstaðir airport in Norðurland eystra, Iceland. Highland airport. IFR/VFR operations.",
    runways: [
      { id: "01/19", length_m: 635, width_m: 35, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIGF", iata: null,
    name: "Grundarfjörður Airport", name_is: "Grundarfjörður",
    type: "small", city: "Grundarfjörður", region: "Vesturland",
    elevation_ft: 59, elevation_m: 18,
    lat: 64.9931, lng: -23.2203,
    lat_dms: "64°59'35\"N", lng_dms: "023°13'13\"W",
    description: "Grundarfjörður airport in Vesturland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "04/22", length_m: 799, width_m: 30, surface: "Grass", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIHL", iata: null,
    name: "Hella Airport", name_is: "Hella",
    type: "small", city: "Hella", region: "Suðurland",
    elevation_ft: 135, elevation_m: 41,
    lat: 63.8358, lng: -20.3775,
    lat_dms: "63°50'09\"N", lng_dms: "020°22'39\"W",
    description: "Hella airport in Suðurland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "04/22", length_m: 1028, width_m: 58, surface: "Grass", pcn: null, notes: "" },
      { id: "10/28", length_m: 555, width_m: 52, surface: "Grass", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      circuit_note: "Circuit shall be flown east and north of the runway. Confirm circuit altitude in current AIP charts.",
      tips: [
        "The published circuit is specifically east and north of the runway — do not fly the circuit to the west or south.",
        "Uncontrolled airfield — announce intentions on MF frequency."
      ]
    },
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIHE", iata: null,
    name: "Herðubreiðarlindir Airport", name_is: "Herðubreiðarlindir",
    type: "small", city: "Herðubreiðarlindir", region: "Norðurland eystra",
    elevation_ft: 1592, elevation_m: 485,
    lat: 65.1911, lng: -16.205,
    lat_dms: "65°11'28\"N", lng_dms: "016°12'18\"W",
    description: "Herðubreiðarlindir airport in Norðurland eystra, Iceland. Highland airport. IFR/VFR operations.",
    runways: [
      { id: "01/19", length_m: 799, width_m: 19, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIHK", iata: null,
    name: "Hólmavík Airport", name_is: "Hólmavík",
    type: "small", city: "Hólmavík", region: "Norðurland vestra",
    elevation_ft: 90, elevation_m: 27,
    lat: 65.7047, lng: -21.6964,
    lat_dms: "65°42'17\"N", lng_dms: "021°41'47\"W",
    description: "Hólmavík airport in Norðurland vestra, Iceland. IFR/VFR operations.",
    runways: [
      { id: "02/20", length_m: 1000, width_m: 30, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.600" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIHZ", iata: null,
    name: "Húsafell Airport", name_is: "Húsafell",
    type: "small", city: "Húsafell", region: "Vesturland",
    elevation_ft: 385, elevation_m: 117,
    lat: 64.6997, lng: -20.8836,
    lat_dms: "64°41'59\"N", lng_dms: "020°53'01\"W",
    description: "Húsafell airport in Vesturland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "10/28", length_m: 740, width_m: 18, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIHI", iata: null,
    name: "Hveravellir Airport", name_is: "Hveravellir",
    type: "small", city: "Hveravellir", region: "Norðurland vestra",
    elevation_ft: 2019, elevation_m: 615,
    lat: 64.8861, lng: -19.4925,
    lat_dms: "64°53'10\"N", lng_dms: "019°29'33\"W",
    description: "Hveravellir airport in Norðurland vestra, Iceland. Highland airport. IFR/VFR operations.",
    runways: [
      { id: "17/35", length_m: 820, width_m: 38, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIKA", iata: null,
    name: "Kaldármelar Airport", name_is: "Kaldármelar",
    type: "small", city: "Kaldármelar", region: "Vesturland",
    elevation_ft: 149, elevation_m: 45,
    lat: 64.7789, lng: -22.2569,
    lat_dms: "64°46'44\"N", lng_dms: "022°15'25\"W",
    description: "Kaldármelar airport in Vesturland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "03/21", length_m: 653, width_m: 26, surface: "Grass", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIKE", iata: null,
    name: "Kerlingarfjöll Airport", name_is: "Kerlingarfjöll",
    type: "small", city: "Kerlingarfjöll", region: "Vesturland",
    elevation_ft: 2038, elevation_m: 621,
    lat: 64.705, lng: -19.4106,
    lat_dms: "64°42'18\"N", lng_dms: "019°24'38\"W",
    description: "Kerlingarfjöll airport in Vesturland, Iceland. Highland airport. IFR/VFR operations.",
    runways: [
      { id: "10/28", length_m: 704, width_m: 36, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIKL", iata: null,
    name: "Kirkjubæjarklaustur Airport", name_is: "Kirkjubæjarklaustur",
    type: "small", city: "Kirkjubæjarklaustur", region: "Suðurland",
    elevation_ft: 71, elevation_m: 22,
    lat: 63.7928, lng: -18.0039,
    lat_dms: "63°47'34\"N", lng_dms: "018°00'14\"W",
    description: "Kirkjubæjarklaustur airport in Suðurland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "08/26", length_m: 799, width_m: 26, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIKP", iata: null,
    name: "Kópasker Airport", name_is: "Kópasker",
    type: "small", city: "Kópasker", region: "Norðurland eystra",
    elevation_ft: 36, elevation_m: 11,
    lat: 66.3108, lng: -16.4667,
    lat_dms: "66°18'39\"N", lng_dms: "016°28'00\"W",
    description: "Kópasker airport in Norðurland eystra, Iceland. IFR/VFR operations.",
    runways: [
      { id: "12/30", length_m: 799, width_m: 24, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIMM", iata: null,
    name: "Melgerðismelar Airport", name_is: "Melgerðismelar",
    type: "small", city: "Melgerðismelar", region: "Norðurland vestra",
    elevation_ft: 89, elevation_m: 27,
    lat: 65.4833, lng: -18.1667,
    lat_dms: "65°29'00\"N", lng_dms: "018°10'00\"W",
    description: "Melgerðismelar airport in Norðurland vestra, Iceland. IFR/VFR operations.",
    runways: [
      { id: "04/22", length_m: 671, width_m: 22, surface: "Grass", pcn: null, notes: "" }
    ],
    frequencies: [],
    nav: [],
    hours: { service: "None", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      circuit_note: "Glider circuit east of runway. Model aircraft circuit west of runway — be aware of separation. Confirm circuit altitude in current AIP charts.",
      tips: [
        "Glider operations use the circuit east of runway. Model aircraft operate west of runway. Announce your position and be aware of both.",
        "Uncontrolled airfield — listen out carefully and announce early."
      ]
    },
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIMK", iata: null,
    name: "Múlakot Airport", name_is: "Múlakot",
    type: "small", city: "Múlakot", region: "Suðurland",
    elevation_ft: 260, elevation_m: 79,
    lat: 63.7142, lng: -19.8792,
    lat_dms: "63°42'51\"N", lng_dms: "019°52'45\"W",
    description: "Múlakot airport in Suðurland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "11/29", length_m: 799, width_m: 39, surface: "Grass", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BINF", iata: null,
    name: "Norðfjörður Airport", name_is: "Norðfjörður",
    type: "small", city: "Norðfjörður", region: "Austurland",
    elevation_ft: 6, elevation_m: 2,
    lat: 65.1317, lng: -13.7475,
    lat_dms: "65°07'54\"N", lng_dms: "013°44'51\"W",
    description: "Norðfjörður airport in Austurland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "08/26", length_m: 970, width_m: 23, surface: "Asphalt-stabilized gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIND", iata: null,
    name: "Nýidalur Airport", name_is: "Nýidalur",
    type: "small", city: "Nýidalur", region: "Suðurland",
    elevation_ft: 2690, elevation_m: 820,
    lat: 64.7206, lng: -18.0667,
    lat_dms: "64°43'14\"N", lng_dms: "018°04'00\"W",
    description: "Nýidalur airport in Suðurland, Iceland. Highland airport. IFR/VFR operations.",
    runways: [
      { id: "05/23", length_m: 830, width_m: 45, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIRG", iata: null,
    name: "Raufarhöfn Airport", name_is: "Raufarhöfn",
    type: "small", city: "Raufarhöfn", region: "Norðurland eystra",
    elevation_ft: 65, elevation_m: 20,
    lat: 66.4064, lng: -15.9183,
    lat_dms: "66°24'23\"N", lng_dms: "015°55'06\"W",
    description: "Raufarhöfn airport in Norðurland eystra, Iceland. IFR/VFR operations.",
    runways: [
      { id: "06/24", length_m: 1077, width_m: 33, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIRE", iata: null,
    name: "Reykhólar Airport", name_is: "Reykhólar",
    type: "small", city: "Reykhólar", region: "Vestfirðir",
    elevation_ft: 83, elevation_m: 25,
    lat: 65.4517, lng: -22.2097,
    lat_dms: "65°27'06\"N", lng_dms: "022°12'35\"W",
    description: "Reykhólar airport in Vestfirðir, Iceland. IFR/VFR operations.",
    runways: [
      { id: "08/26", length_m: 720, width_m: 27, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIRL", iata: null,
    name: "Reykjahlíð Airport", name_is: "Reykjahlíð",
    type: "small", city: "Reykjahlíð", region: "Norðurland eystra",
    elevation_ft: 1031, elevation_m: 314,
    lat: 65.6558, lng: -16.9181,
    lat_dms: "65°39'21\"N", lng_dms: "016°55'05\"W",
    description: "Reykjahlíð airport in Norðurland eystra, Iceland. IFR/VFR operations.",
    runways: [
      { id: "01/19", length_m: 799, width_m: 20, surface: "Asphalt-stabilized gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: true, jet_a1: false, supplier: "AVGAS 100LL" },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIRS", iata: null,
    name: "Reykjanes Airport", name_is: "Reykjanes",
    type: "small", city: "Reykjanes", region: "Vestfirðir",
    elevation_ft: 17, elevation_m: 5,
    lat: 65.9142, lng: -22.4214,
    lat_dms: "65°54'51\"N", lng_dms: "022°25'17\"W",
    description: "Reykjanes airport in Vestfirðir, Iceland. IFR/VFR operations.",
    runways: [
      { id: "01/19", length_m: 780, width_m: 18, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIRF", iata: null,
    name: "Rif Airport", name_is: "Rif",
    type: "small", city: "Rif", region: "Vesturland",
    elevation_ft: 25, elevation_m: 8,
    lat: 64.9114, lng: -23.8231,
    lat_dms: "64°54'41\"N", lng_dms: "023°49'23\"W",
    description: "Rif airport in Vesturland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "05/23", length_m: 983, width_m: 27, surface: "Asphalt-stabilized gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: true, supplier: "Jet A-1 available" },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISS", iata: null,
    name: "Sandskeið Airport", name_is: "Sandskeið",
    type: "small", city: "Sandskeið", region: "Höfuðborgarsvæðið",
    elevation_ft: 600, elevation_m: 183,
    lat: 64.0608, lng: -21.5747,
    lat_dms: "64°03'39\"N", lng_dms: "021°34'29\"W",
    description: "Sandskeið airport in Höfuðborgarsvæðið, Iceland. IFR/VFR operations.",
    runways: [
      { id: "13/31", length_m: 799, width_m: 18, surface: "Asphalt-stabilized gravel", pcn: null, notes: "" }
    ],
    frequencies: [],
    nav: [],
    hours: { service: "None", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      circuit_note: "Power aircraft circuit north of runway 15/33 at 1,300 ft MSL (700 ft AGL). Glider circuit south of runway.",
      tips: [
        "Power aircraft must fly the circuit north of runway 15/33, at 1,300 ft MSL / 700 ft AGL.",
        "Glider operations use the circuit south of the runway. Announce your position and watch for gliders on base and final.",
        "Uncontrolled airfield — listen out on the MF frequency."
      ]
    },
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISA", iata: null,
    name: "Sauðárflugvöllur Airport", name_is: "Sauðárflugvöllur",
    type: "small", city: "Sauðárflugvöllur", region: "Suðurland",
    elevation_ft: 2200, elevation_m: 671,
    lat: 64.8422, lng: -16.0364,
    lat_dms: "64°50'32\"N", lng_dms: "016°02'11\"W",
    description: "Sauðárflugvöllur airport in Suðurland, Iceland. Highland airport. IFR/VFR operations.",
    runways: [
      { id: "03/21", length_m: 740, width_m: 20, surface: "Gravel", pcn: null, notes: "" },
      { id: "06/24", length_m: 1180, width_m: 30, surface: "Gravel", pcn: null, notes: "" },
      { id: "10/28", length_m: 880, width_m: 30, surface: "Gravel", pcn: null, notes: "" },
      { id: "13/31", length_m: 660, width_m: 20, surface: "Gravel", pcn: null, notes: "" },
      { id: "18/36", length_m: 640, width_m: 20, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISF", iata: null,
    name: "Selfoss Airport", name_is: "Selfoss",
    type: "small", city: "Selfoss", region: "Suðurland",
    elevation_ft: 47, elevation_m: 14,
    lat: 63.9292, lng: -21.0378,
    lat_dms: "63°55'45\"N", lng_dms: "021°02'16\"W",
    description: "Selfoss airport in Suðurland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "05/23", length_m: 798, width_m: 30, surface: "Grass", pcn: null, notes: "" },
      { id: "14/32", length_m: 794, width_m: 30, surface: "Grass", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: true, jet_a1: false, supplier: "AVGAS 100LL" },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      circuit_note: "RWY 05: Left-hand. RWY 23: Right-hand. RWY 14: Right-hand. RWY 32: Left-hand. Circuit at 1,000 ft.",
      tips: [
        "No formal notification of runway surface conditions is published — check conditions yourself before use.",
        "Night operations restricted 23:00–07:00. Touch-and-go permitted weekdays 07:00–18:00 only."
      ]
    },
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISI", iata: null,
    name: "Siglufjörður Airport", name_is: "Siglufjörður",
    type: "small", city: "Siglufjörður", region: "Norðurland vestra",
    elevation_ft: 13, elevation_m: 4,
    lat: 66.1383, lng: -18.9069,
    lat_dms: "66°08'18\"N", lng_dms: "018°54'25\"W",
    description: "Siglufjörður airport in Norðurland vestra, Iceland. IFR/VFR operations.",
    runways: [
      { id: "05/23", length_m: 799, width_m: 23, surface: "Asphalt-stabilized gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISL", iata: null,
    name: "Skaftafell Airport", name_is: "Skaftafell",
    type: "small", city: "Skaftafell", region: "Suðurland",
    elevation_ft: 260, elevation_m: 79,
    lat: 64.0, lng: -16.9408,
    lat_dms: "64°00'00\"N", lng_dms: "016°56'27\"W",
    description: "Skaftafell airport in Suðurland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "15/33", length_m: 610, width_m: 20, surface: "Gravel", pcn: null, notes: "" },
      { id: "16/34", length_m: 1020, width_m: 25, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: true, jet_a1: true, supplier: "Check NOTAMs" },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISV", iata: null,
    name: "Skálavatn Airport", name_is: "Skálavatn",
    type: "small", city: "Skálavatn", region: "Suðurland",
    elevation_ft: 1920, elevation_m: 585,
    lat: 64.1158, lng: -18.7833,
    lat_dms: "64°06'57\"N", lng_dms: "018°47'00\"W",
    description: "Skálavatn airport in Suðurland, Iceland. Highland airport. IFR/VFR operations.",
    runways: [
      { id: "06/24", length_m: 700, width_m: 35, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISK", iata: null,
    name: "Skógasandur Airport", name_is: "Skógasandur",
    type: "small", city: "Skógasandur", region: "Suðurland",
    elevation_ft: 118, elevation_m: 36,
    lat: 63.5172, lng: -19.4892,
    lat_dms: "63°31'02\"N", lng_dms: "019°29'21\"W",
    description: "Skógasandur airport in Suðurland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "12/30", length_m: 1165, width_m: 27, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISR", iata: null,
    name: "Stórikroppur Airport", name_is: "Stórikroppur",
    type: "small", city: "Stórikroppur", region: "Höfuðborgarsvæðið",
    elevation_ft: 119, elevation_m: 36,
    lat: 64.6344, lng: -21.4875,
    lat_dms: "64°38'04\"N", lng_dms: "021°29'15\"W",
    description: "Stórikroppur airport in Höfuðborgarsvæðið, Iceland. IFR/VFR operations.",
    runways: [
      { id: "05/23", length_m: 700, width_m: 18, surface: "Asphalt-stabilized gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: true, jet_a1: false, supplier: "AVGAS 100LL" },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIST", iata: null,
    name: "Stykkishólmur Airport", name_is: "Stykkishólmur",
    type: "small", city: "Stykkishólmur", region: "Vesturland",
    elevation_ft: 43, elevation_m: 13,
    lat: 65.0586, lng: -22.7656,
    lat_dms: "65°03'31\"N", lng_dms: "022°45'56\"W",
    description: "Stykkishólmur airport in Vesturland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "07/25", length_m: 1117, width_m: 33, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      tips: [
        "Significant bird activity near the runway — birds are reluctant to move. Exercise caution on approach and landing.",
        "Uncontrolled airfield — announce intentions early on MF."
      ]
    },
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIMS", iata: null,
    name: "Tungubakkar Mosfellsbæ Airport", name_is: "Tungubakkar Mosfellsbæ",
    type: "small", city: "Tungubakkar Mosfellsbæ", region: "Höfuðborgarsvæðið",
    elevation_ft: 18, elevation_m: 5,
    lat: 64.1811, lng: -21.7078,
    lat_dms: "64°10'52\"N", lng_dms: "021°42'28\"W",
    description: "Tungubakkar Mosfellsbæ airport in Höfuðborgarsvæðið, Iceland. IFR/VFR operations.",
    runways: [
      { id: "07/25", length_m: 540, width_m: 45, surface: "Grass", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.200" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: true, jet_a1: false, supplier: "AVGAS 100LL" },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      circuit_note: "Circuit at 700 ft, north of the airfield only.",
      t_and_g: "No touch-and-go or training/practice flights permitted at this airfield.",
      tips: [
        "Aircraft with engines over 200 HP are not permitted except in emergencies.",
        "Helicopter operations in the circuit are prohibited, except LHG helicopters — and only with written permission from the FKM chairman.",
        "No training or practice flights are allowed.",
        "This airfield is close to the Reykjavík (BIRK) CTR — file a flight plan and obtain Reykjavík Tower clearance before entering the CTR.",
        "Unusually restricted airfield — read all published AIP conditions before use."
      ]
    },
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIVI", iata: null,
    name: "Vík Airport", name_is: "Vík",
    type: "small", city: "Vík", region: "Suðurland",
    elevation_ft: 81, elevation_m: 25,
    lat: 63.4217, lng: -18.8883,
    lat_dms: "63°25'18\"N", lng_dms: "018°53'18\"W",
    description: "Vík airport in Suðurland, Iceland. IFR/VFR operations.",
    runways: [
      { id: "07/25", length_m: 712, width_m: 25, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BITE", iata: null,
    name: "Þingeyri Airport", name_is: "Þingeyri",
    type: "small", city: "Þingeyri", region: "Vestfirðir",
    elevation_ft: 28, elevation_m: 9,
    lat: 65.8703, lng: -23.5597,
    lat_dms: "65°52'13\"N", lng_dms: "023°33'35\"W",
    description: "Þingeyri airport in Vestfirðir, Iceland. IFR/VFR operations.",
    runways: [
      { id: "13/31", length_m: 799, width_m: 24, surface: "Asphalt-stabilized gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BITM", iata: null,
    name: "Þórsmörk Airport", name_is: "Þórsmörk",
    type: "small", city: "Þórsmörk", region: "Suðurland",
    elevation_ft: 634, elevation_m: 193,
    lat: 63.69, lng: -19.5631,
    lat_dms: "63°41'24\"N", lng_dms: "019°33'47\"W",
    description: "Þórsmörk airport in Suðurland, Iceland. Highland airport. IFR/VFR operations.",
    runways: [
      { id: "09/27", length_m: 770, width_m: 28, surface: "Gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "mf", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIBD", iata: null,
    name: "Bíldudalur Airport", name_is: "Bíldudalur",
    type: "small", city: "Bíldudalur", region: "Vestfirðir",
    elevation_ft: 25, elevation_m: 8,
    lat: 65.6414, lng: -23.5461,
    lat_dms: "65°38'29\"N", lng_dms: "023°32'46\"W",
    description: "Bíldudalur airport in Vestfirðir, Iceland. IFR/VFR operations.",
    runways: [
      { id: "04/22", length_m: 940, width_m: 30, surface: "Asphalt-stabilized gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "afis", freq: "119.100" }
    ],
    nav: [],
    hours: { service: "AFIS", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIGJ", iata: null,
    name: "Gjögur Airport", name_is: "Gjögur",
    type: "small", city: "Gjögur", region: "Vestfirðir",
    elevation_ft: 90, elevation_m: 27,
    lat: 65.9953, lng: -21.3269,
    lat_dms: "65°59'43\"N", lng_dms: "021°19'37\"W",
    description: "Gjögur airport in Vestfirðir, Iceland. IFR/VFR operations.",
    runways: [
      { id: "04/22", length_m: 960, width_m: 23, surface: "Asphalt-stabilized gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "afis", freq: "118.600" }
    ],
    nav: [],
    hours: { service: "AFIS", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      tips: [
        "Minimal bird activity at the airfield — no nesting recorded.",
        "BIGJ RNP A: lægra lágmark fyrir CAT B krefst 25° beygjuhalla í hringaðflugi.",
        "BIGJ NDB A: lægra lágmark fyrir CAT B krefst 25° beygjuhalla í hringaðflugi.",
        "AFIS service — contact on published frequency. Separation is the pilot's responsibility."
      ]
    },
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIGR", iata: null,
    name: "Grímsey Airport", name_is: "Grímsey",
    type: "small", city: "Grímsey", region: "Norðurland eystra",
    elevation_ft: 81, elevation_m: 25,
    lat: 66.5461, lng: -18.0172,
    lat_dms: "66°32'46\"N", lng_dms: "018°01'02\"W",
    description: "Grímsey airport in Norðurland eystra, Iceland. IFR/VFR operations.",
    runways: [
      { id: "17/35", length_m: 1030, width_m: 23, surface: "Asphalt-stabilized gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "afis", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "AFIS", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      tips: [
        "Arctic tern nesting around the airport, mainly in the moors east of the runway. Expect birds on and around the runway from 1 May through 30 September.",
        "Razorbill (Rita) present at the cliff northwest of the runway.",
        "Uncontrolled airfield — announce intentions on MF frequency."
      ]
    },
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIKR", iata: null,
    name: "Sauðárkrókur Airport", name_is: "Sauðárkrókur",
    type: "medium", city: "Sauðárkrókur", region: "Norðurland vestra",
    elevation_ft: 9, elevation_m: 3,
    lat: 65.7317, lng: -19.5728,
    lat_dms: "65°43'54\"N", lng_dms: "019°34'22\"W",
    description: "Sauðárkrókur airport in Norðurland vestra, Iceland. IFR/VFR operations.",
    runways: [
      { id: "18/36", length_m: 1887, width_m: 30, surface: "Asphalt-stabilized gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "afis", freq: "119.100" }
    ],
    nav: [],
    hours: { service: "AFIS", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      tips: [
        "Small birds and ducks common in the marshes around the airport.",
        "Swans and geese at Miklavatn lake southwest of the runway.",
        "Arctic tern nesting west of the runway — expect bird activity on approach to runway.",
        "AFIS service — contact on published frequency. Separation is the pilot's responsibility."
      ]
    },
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BITN", iata: null,
    name: "Þórshöfn Airport", name_is: "Þórshöfn",
    type: "small", city: "Þórshöfn", region: "Norðurland eystra",
    elevation_ft: 64, elevation_m: 20,
    lat: 66.2183, lng: -15.3347,
    lat_dms: "66°13'06\"N", lng_dms: "015°20'05\"W",
    description: "Þórshöfn airport in Norðurland eystra, Iceland. IFR/VFR operations.",
    runways: [
      { id: "01/19", length_m: 1199, width_m: 30, surface: "Asphalt-stabilized gravel", pcn: null, notes: "" }
    ],
    frequencies: [
      { role: "afis", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "AFIS", schedule: "PPR", notes: "Contact pilot service for PPR. Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      tips: [
        "Geese nest east of the airport. They arrive late April and are present through June, returning again in August.",
        "Eider duck nesting at the pond southwest of the airport.",
        "AFIS service — contact on published frequency. Separation is the pilot's responsibility."
      ]
    },
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  }

];

// Type categories for filtering and display
const AIRPORT_TYPES = {
  international: { label: "International", label_is: "Alþjóðlegur", color: "#c8503c" },
  regional:      { label: "Regional",      label_is: "Svæðisbundinn", color: "#5a9db4" },
  small:         { label: "Airfield",      label_is: "Flugbraut",    color: "#7a9e6a" }
};

// AIRAC cycle metadata
const AIRAC_META = {
  cycle: "A06/2026",
  effective: "11 JUN 2026",
  next: "06 AUG 2026",
  source_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
};

export { AIRPORTS, AIRPORT_TYPES, AIRAC_META };
