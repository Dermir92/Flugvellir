﻿// Flugvellir — Icelandic Airport Data
// Source: Isavia eAIP AIRAC A06/2026, effective 11 JUN 2026
// Verified against: https://eaip.isavia.is/A_06-2026_2026_06_11/
// NOTE: Always verify with current NOTAMs and official AIP before flight.

const AIRPORTS = [

  // â"€â"€ INTERNATIONAL â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

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
      circuit_alt_ft: 1200,
      circuit_note: "Right-hand for RWY 10 and 19, unless directed otherwise by ATC. Circuit altitude 1,200 ft MSL. To join via overhead: 1,700 ft MSL.",
      t_and_g: "Touch & go and low approaches for training flights are prohibited during the following periods. Winter (19 Sep–15 May): 06:00–09:00 and 14:30–17:30. Summer (16 May–18 Sep): 06:00–11:00, 14:30–18:00, and 23:30–00:30. ATC may restrict training flights at any time without notice.",
      entry: "Contact Keflavík Tower on 118.300 for clearance before entering the CTR. The CTR extends to 3,000 ft AMSL. Obtain ATIS on 128.300 before calling. Private and training aircraft must be pre-registered in the VEOVO database — arrange through a ground handling agent before arrival.",
      sample_call: "Keflavík Tower, TF-ABC, Cessna 172, [position], information [Alpha], VFR, request clearance to enter CTR.",
      tips: [
        "The CTR extends to 3,000 ft AMSL — not FL065. FL065 is the upper limit of the FAXI TMA.",
        "Preferred runway 01/19 for noise abatement at all times — expect to use it unless operationally necessary.",
        "Strong and gusty surface winds are common from WSW, routinely 20–35 kt and higher in autumn/winter.",
        "This is a busy international airport — keep transmissions brief, professional, and expect holds.",
        "Confirm you intend BIKF (Keflavík), not BIRK (Reykjavík city airport), when filing your flight plan."
      ]
    },
    airspace: { class: "D", name: "Keflavík CTR" },
    hazards: [
      { type: "military", description: "Military activity on north apron — restricted areas frequently active. Check current NOTAMs before flight." }
    ],
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
      circuit_note: "Left-hand for RWY 01 and 31; right-hand for RWY 13 and 19. Circuit altitude 1,000 ft MSL. Climb on runway heading to at least runway end before turning crosswind.",
      t_and_g: "Single-engine aircraft only, engine under 220 hp. Multi-engine touch & go prohibited. Simulated engine failures on takeoff/landing prohibited. Permitted times — Winter (16 Sep–15 Apr): Mon–Fri 10:00–17:00, weekends & public holidays 11:00–16:00. Summer (16 Apr–15 Sep): Mon–Fri 10:00–17:00 only — not permitted on weekends in summer, and not on any special public holidays. Minimum ceiling 2,000 ft MSL. Maximum 3 aircraft in circuit simultaneously. ATC may restrict at any time without notice. Instruction flights have priority.",
      entry: "Obtain ATIS on 128.100 before calling. Contact Reykjavík Tower on 118.000 before entering the CTR — no later than 3 NM from CTR boundary. Follow published VFR routes (BIRK AD 8 charts). Report at inner VFR reporting points. Initial call must include callsign, position, intentions, and ATIS identifier.",
      sample_call: "Reykjavík Tower, TF-ABC, Cessna 172, [position], information [Alpha], VFR inbound, request landing.",
      tips: [
        "Noise abatement: avoid overflying Reykjavík city centre — depart and arrive over water where possible.",
        "Confirm you intend BIRK (city airport), not BIKF (Keflavík International) — they are 40 km apart.",
        "Airport closed to all traffic outside ATC hours. No service Christmas Day, New Year's Day, Easter Sunday. Shortened hours on Christmas Eve and New Year's Eve (close 16:00).",
        "Bird hazard: 200–300 Greylag Geese roost near the lake NW of the field year-round. Peak risk 1 Apr–15 May and 15 Aug–31 Oct.",
        "Vegetation penetrates obstacle surfaces SE of RWY 13 — stay alert on base and final for RWY 31."
      ]
    },
    airspace: { class: "D", name: "Reykjavík CTR" },
    hazards: [
      { type: "bird", description: "200–300 Greylag Geese roost near the lake NW of the field year-round.", season: "Peak 1 Apr–15 May and 15 Aug–31 Oct" }
    ],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

  // â"€â"€ REGIONAL â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

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
      circuit_note: "Circuit information not published for VFR GA in this record — check current AIP AD charts before arrival.",
      entry: "Obtain ATIS on 136.200 before calling. Contact Akureyri Tower on 118.200 for CTR entry clearance.",
      sample_call: "Akureyri Tower, TF-ABC, Cessna 172, [position], information [Alpha], VFR inbound, request landing.",
      tips: [
        "ILS RWY 01 uses a steep 5.3° glide path due to terrain south of the field — confirm aircraft is equipped and technique is appropriate.",
        "Offset LOC RWY 19 has a 3° track offset from runway centreline — do not confuse with ILS track. No glide path signal.",
        "Fjord terrain causes significant wind shear and turbulence on approach and departure, even at low surface winds.",
        "ATC service daily 07:00–23:00 — no service after hours."
      ]
    },
    airspace: { class: "D", name: "Akureyri CTR" },
    hazards: [
      { type: "terrain", description: "Fjord terrain causes significant wind shear and turbulence on approach and departure, even at low surface winds. ILS RWY 01 uses a steep 5.3° glide path. Offset LOC RWY 19 has a 3° track offset and no glide path." }
    ],
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
      circuit_note: "Circuit information not published in this record — check current AIP AD charts before arrival.",
      entry: "Contact Egilsstaðir Radio on 119.400 before arrival.",
      sample_call: "Egilsstaðir Radio, TF-ABC, Cessna 172, [position], VFR inbound, request airfield information.",
      tips: [
        "ILS CAT I on RWY 03 (IES 109.3) — check NOTAMs for serviceability.",
        "Fog frequent in the Lagarfljót river valley, particularly autumn mornings — check MET carefully.",
        "Used as a North Atlantic diversion alternate — be prepared for unexpected traffic.",
        "AFIS service — separation is the pilot's responsibility."
      ]
    },
    hazards: [
      { type: "terrain", description: "Fog frequent in the Lagarfljót river valley, particularly autumn mornings. Monitor MET carefully before arrival." }
    ],
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
      circuit_note: "No traffic circuit established — terrain on all sides. Curved visual approach only. Study the published approach procedure in AIP AD charts before flight.",
      entry: "Contact Ísafjörður AFIS on 118.800 before arrival. The curved visual approach must be flown exactly as published.",
      sample_call: "Ísafjörður Radio, TF-ABC, Cessna 172, [position], VFR inbound, request airfield information.",
      tips: [
        "Curved visual approach mandatory — no IFR approach published. Fly the procedure exactly as depicted in AIP AD charts.",
        "No traffic circuit — terrain on all sides prevents standard circuit flying.",
        "Night operations carry significant restrictions — see AIP AD 2.23 before planning night arrival.",
        "Westfjords Air Routes require special approval for crews unfamiliar with this approach."
      ]
    },
    hazards: [
      { type: "terrain", description: "Curved visual approach mandatory in deep fjord — no IFR approach available. No traffic circuit due to terrain on all sides. Night operations significantly restricted (AIP AD 2.23). Westfjords Air Routes require special approval for unfamiliar crews." }
    ],
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
        notes: "RWY 18 slope âˆ’0.3%, THR elevation 24 ft. RWY 36 slope +0.3%, THR elevation 7 ft. NDB approach available."
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
      notes: "After-hours: 1 hr notice (summer), 2 hr (winter)."
    },
    fuel: {
      avgas: false,
      jet_a1: true,
      notes: "Með fyrirfram beiðni (PN)",
      supplier: "Friðrik Jónas Friðriksson — +354 478-1859 / GSM +354 893-0693 / jonas@rafhorn.is Â· 170 L/min"
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
      entry: "Contact Hornafjörður AFIS on 119.100 before arrival. Note the irregular opening hours before departure.",
      sample_call: "Hornafjörður Radio, OY-ABC, Cessna 172, [position], VFR inbound, request airfield information.",
      tips: [
        "Bird hazard: geese are common on and around the airfield, mainly east of the runway. Present from end of March through October — peak numbers in spring and autumn.",
        "Geese thin out June–August when nesting ends, but do not disappear entirely.",
        "Strong katabatic winds can develop rapidly off Vatnajökull with little warning — monitor MET carefully.",
        "Irregular hours (closed Tuesday and Saturday) — always confirm before departure."
      ]
    },
    hazards: [
      { type: "terrain", description: "Strong katabatic winds from Vatnajökull can develop rapidly with little warning. Low-level helicopter operations common in the area — glacier rescue and tour activity." },
      { type: "bird", description: "Geese common on and around the airfield, mainly east of the runway.", season: "End of March through October — peak in spring and autumn" }
    ],
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
      "Contact operator before departure."
    ],
    pilot_notes: {
      circuit_alt_ft: null,
      circuit_note: "Circuit for RWY 03/21 to the east of the runway. Circuit for RWY 12/30 to the south of the runway. Join at 45°. Circling on final is not recommended except in emergencies — fly another circuit if separation is insufficient. No circuit altitude published in the AIP — check current AD charts.",
      t_and_g: "AFIS may restrict training flights without notice to maintain safety.",
      entry: "ATZ is Class G, SFC to 3,000 ft AMSL. Establish two-way radio contact with Vestmannaeyjar Radio on 118.500 before entering the ATZ. Outside AFIS hours, broadcast blind on 118.500 with your callsign, position, and intentions before entering.",
      sample_call: "Vestmannaeyjar Radio, TF-ABC, Cessna 172, [position], VFR inbound, request information.",
      tips: [
        "No AVGAS — Jet A-1 only, available on request (+354 515-1100 or +354 840-1720). Confirm fuel availability before departure.",
        "AFIS available outside normal hours on request — minimum 1 hr notice in summer, 2 hr in winter. Call +354 424 4099.",
        "AIP minimum ceiling/visibility for takeoff (no ops manual): RWY 03: 700 ft · 4 km · RWY 12: 300 ft · 1.5 km · RWY 21: 100 ft · 1.5 km · RWY 30: 100 ft · 1.5 km. Expect significant turbulence on approach and departure if wind exceeds published windrose values.",
        "Bird hazard: Puffins nest near the airfield from May through end of September. Seagulls present April–May and July–August.",
        "Night operations: complex obstruction light requirements apply per runway — see AD 2.20.1 table. Landing on RWY 21 or 30 at night requires no precipitation.",
        "Full-power run-ups prohibited 22:00–07:00 daily and until 12:00 on Sundays, except in exceptional circumstances."
      ]
    },
    hazards: [
      { type: "volcanic", description: "Volcanic island — monitor Veður Íslands and NOTAM for eruption and ash advisories." },
      { type: "bird", description: "Puffins nest near the airfield. Seagulls also present seasonally.", season: "Puffins: May–September. Seagulls: April–May and July–August" }
    ],
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },

  // â"€â"€ SMALL AIRFIELDS (eAIP verified) â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

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
    pilot_notes: {
      entry: "Contact Vopnafjörður AFIS on 118.100 before arrival.",
      sample_call: "Vopnafjörður Radio, TF-XXX, [aircraft type], [position], VFR inbound, request airfield information."
    },
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
        notes: "RWY 02 slope âˆ’0.08%, THR 48 ft. RWY 20 slope +0.08%, THR 44 ft."
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
    pilot_notes: {
      entry: "Contact Húsavík AFIS on 119.200 before arrival.",
      sample_call: "Húsavík Radio, TF-XXX, [aircraft type], [position], VFR inbound, request airfield information."
    },
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
    pilot_notes: {
      traffic: "No ATS services on field. Make position reports on 118.400 MHz before arrival. VFR only.",
      sample_call: "Bakki umferð, TF-XXX, [type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
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
    pilot_notes: {
      traffic: "Uncontrolled airfield — make blind calls on 118.600 MHz before arrival. No ATS services on field.",
      sample_call: "Blönduós umferð, TF-XXX, [type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },


  {
    icao: "BIBR", iata: null,
    name: "Búðardalur Airport", name_is: "Búðardalur",
    type: "small", city: "Búðardalur", region: "Vesturland",
    elevation_ft: 151, elevation_m: 46,
    lat: 65.0753, lng: -21.8003,
    lat_dms: "65°04'31\"N", lng_dms: "021°48'01\"W",
    description: "A small farming community strip in the Dalir valleys of Vesturland. The area carries weight in Norse history — Eiríksstaðir, the reconstructed farm of Erik the Red and birthplace of Leif Eriksson, lies just minutes away. Gravel strip with no fuel; PPR required.",
    runways: [
      { id: "06/24", length_m: 795, width_m: 24, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 434 1210", ppr_contact: "Böðvar Magnússon (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Búðardalur umferð\" — and report position.",
      sample_call: "Búðardalur umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "21 m mast 65 m south of the runway end — obstacle data in AIP BIBR AD 2.10."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIDV", iata: null,
    name: "Djúpivogur Airport", name_is: "Djúpivogur",
    type: "small", city: "Djúpivogur", region: "Austurland",
    elevation_ft: 6, elevation_m: 2,
    lat: 64.6442, lng: -14.2828,
    lat_dms: "64°38'39\"N", lng_dms: "014°16'58\"W",
    description: "A quiet harbour village on the eastern edge of Iceland, on a small peninsula where Berufjörður meets the sea. Papey island — historically Iceland's oldest recorded settlement — is visible offshore. Exposed to Atlantic weather; check conditions carefully.",
    runways: [
      { id: "17/35", length_m: 745, width_m: 24, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 478 8288", ppr_contact: "Sveitastjórnarskrifstofa Djúpavogs (Isavia District 4)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.400 MHz — \"Djúpivogur umferð\" — and report position.",
      sample_call: "Djúpivogur umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "Warning: vehicles may be on or near runway 17/35. Check runway is clear before take-off and landing.",
        "Uncontrolled airfield — make position reports early and check the runway visually.",
        "High ground west of runway. Mast 1 NM north at 230 ft MSL — see AIP BIDV AD 2.10."
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
    description: "On the outwash plain between Vatnajökull and the sea, in the remote Öræfi district. The farm sits in one of Iceland's most exposed locations — vast glacial sandar stretch in both directions, with Hvannadalshnjúkur (Iceland's highest peak) rising to the north. Expect sandstorms and katabatic gusts.",
    runways: [
      { id: "09/27", length_m: 794, width_m: 28, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 862 1766", ppr_contact: "Gunnar Sigurjónsson (Isavia District 4)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.400 MHz — \"Fagurhólsmýri umferð\" — and report position.",
      sample_call: "Fagurhólsmýri umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIFL", iata: null,
    name: "Flúðir Airport", name_is: "Flúðir",
    type: "small", city: "Flúðir", region: "Suðurland",
    elevation_ft: 243, elevation_m: 74,
    lat: 64.1428, lng: -20.3261,
    lat_dms: "64°08'34\"N", lng_dms: "020°19'34\"W",
    description: "A small grass strip in the geothermal heartland of south Iceland, in the Hvítá river valley. Flúðir is known for its greenhouse horticulture and the Secret Lagoon (Gamla Laugin), Iceland's oldest swimming pool. A pleasant stop en route through the Golden Circle area.",
    runways: [
      { id: "04/22", length_m: 670, width_m: 18, surface: "Grass", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 893 0331", ppr_contact: "Þröstur Jónsson (Flugklúbbur Flúða / Isavia)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Flúðir umferð\" — and report position.",
      sample_call: "Flúðir umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIGS", iata: null,
    name: "Grímsstaðir Airport", name_is: "Grímsstaðir",
    type: "small", city: "Grímsstaðir", region: "Norðurland eystra",
    elevation_ft: 1260, elevation_m: 384,
    lat: 65.6325, lng: -16.1483,
    lat_dms: "65°37'57\"N", lng_dms: "016°08'54\"W",
    highland: true,
    description: "A remote highland strip on the northeastern highland plateau, at the edge of Ódáðahraun — Europe's largest lava desert. Sits close to the Jökulsá á Fjöllum glacial river and within reach of the Dettifoss waterfall area. PPR required; conditions change rapidly at 384m AMSL.",
    runways: [
      { id: "01/19", length_m: 635, width_m: 35, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 864 7072", ppr_contact: "Guðmundur J. Jónasson (Isavia District 3)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Grímsstaðir umferð\" — and report position.",
      sample_call: "Grímsstaðir umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIGF", iata: null,
    name: "Grundarfjörður Airport", name_is: "Grundarfjörður",
    type: "small", city: "Grundarfjörður", region: "Vesturland",
    elevation_ft: 59, elevation_m: 18,
    lat: 64.9931, lng: -23.2203,
    lat_dms: "64°59'35\"N", lng_dms: "023°13'13\"W",
    description: "On the north coast of Snæfellsnes, directly beneath Kirkjufell — the pyramid-shaped mountain recognised worldwide from photography and television. A grass strip with no fuel; the setting alone makes the approach memorable. The fjord narrows sharply at both ends, giving good visual reference on final.",
    runways: [
      { id: "04/22", length_m: 799, width_m: 30, surface: "Grass", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 892 0268", ppr_contact: "Sigurður Sigurbergsson (eigandi / owner)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Grundarfjörður umferð\" — and report position.",
      sample_call: "Grundarfjörður umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "Emergency shelter on site with fire extinguisher and first aid kit."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIHL", iata: null,
    name: "Hella Airport", name_is: "Hella",
    type: "small", city: "Hella", region: "Suðurland",
    elevation_ft: 135, elevation_m: 41,
    lat: 63.8358, lng: -20.3775,
    lat_dms: "63°50'09\"N", lng_dms: "020°22'39\"W",
    description: "In the Rangárvellir lowlands, the closest airfield to Hekla — Iceland's most active stratovolcano is visible to the northeast on clear days. Two grass runways give useful crosswind options in the variable south Iceland wind. A practical base for southern highland and Landmannalaugar access.",
    runways: [
      { id: "04/22", length_m: 1028, width_m: 58, surface: "Grass", pcn: null, notes: null },
      { id: "10/28", length_m: 555, width_m: 52, surface: "Grass", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 840 7026", ppr_contact: "Matthías Sveinbjörnsson (Flugmálafélag Íslands / Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.400 MHz — \"Hella umferð\" — and report position.",
      sample_call: "Hella umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      circuit_note: "Circuit shall be flown east and north of the runway. Confirm circuit altitude in current AIP charts.",
      tips: [
        "The published circuit is specifically east and north of the runway — do not fly the circuit to the west or south.",
        "Uncontrolled airfield — announce intentions on MF frequency.",
        "Traffic circuit is east and north of the runway.",
        "Pilot-activated runway lights (RWY 04/22) on 122.8 MHz — key 3, 5, or 7 times. Lights extinguish automatically after 18 min."
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
    highland: true,
    description: "At the foot of Herðubreið — Iceland's most distinctive mountain, a steep-sided tuya rising abruptly from the lava desert. One of the most remote strips in Iceland, deep in the Ódáðahraun, with no road access for much of the year. The Herðubreiðarlindir springs are the only reliable fresh water in the surrounding desert.",
    runways: [
      { id: "01/19", length_m: 799, width_m: 19, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 864 7072", ppr_contact: "Guðmundur J. Jónasson (Isavia District 3)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Herðubreiðarlindir umferð\" — and report position.",
      sample_call: "Herðubreiðarlindir umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIHK", iata: null,
    name: "Hólmavík Airport", name_is: "Hólmavík",
    type: "small", city: "Hólmavík", region: "Norðurland vestra",
    elevation_ft: 90, elevation_m: 27,
    lat: 65.7047, lng: -21.6964,
    lat_dms: "65°42'17\"N", lng_dms: "021°41'47\"W",
    description: "The main service centre for the Strandir coast, on the eastern shore of Steingrímsfjörður. Home to the Museum of Icelandic Sorcery and Witchcraft — the Strandir coast has a uniquely strong connection to Iceland's dark magical heritage. The 1000m gravel strip is reasonably well-equipped for a remote community airfield.",
    runways: [
      { id: "02/20", length_m: 1000, width_m: 30, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.600" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 5660", ppr_contact: "Umdæmisstjóri District 2 (Isavia)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.600 MHz — \"Hólmavík umferð\" — and report position.",
      sample_call: "Hólmavík umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "Fence at the south end of the runway — obstacle data in AIP BIHK AD 2.10."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIHZ", iata: null,
    name: "Húsafell Airport", name_is: "Húsafell",
    type: "small", city: "Húsafell", region: "Vesturland",
    elevation_ft: 385, elevation_m: 117,
    lat: 64.6997, lng: -20.8836,
    lat_dms: "64°41'59\"N", lng_dms: "020°53'01\"W",
    description: "A well-visited destination strip in the birch-forested Borgarfjörður valley, at the foot of Langjökull. The Hraunfossar lava waterfalls and Barnafoss are minutes away; Langjökull glacier access and ice cave tours depart from nearby. A natural stop on west Iceland routes.",
    runways: [
      { id: "10/28", length_m: 740, width_m: 18, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 892 1550", ppr_contact: "Bergþór Kristleifsson (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      circuit_alt_ft: null,
      circuit_dir: null,
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Húsafell umferð\" — and report position.",
      sample_call: "Húsafell umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "No taxiway or apron — only one aircraft may be parked at the airstrip at a time. Confirm the strip is clear before arrival.",
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "Safety area north of RWY 10/28 is partially limited. Steep slope and obstacles near the small power station NW of the runway — see AIP BIHZ AD 2.12."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIHI", iata: null,
    name: "Hveravellir Airport", name_is: "Hveravellir",
    type: "small", city: "Hveravellir", region: "Norðurland vestra",
    elevation_ft: 2019, elevation_m: 615,
    lat: 64.8861, lng: -19.4925,
    lat_dms: "64°53'10\"N", lng_dms: "019°29'33\"W",
    highland: true,
    description: "A geothermal oasis in the central highland, midway along the Kjölur route between Langjökull and Hofsjökull glaciers. Hot springs and fumaroles make this a rare comfort stop in an otherwise barren interior landscape. At 615m AMSL, summer access only — confirm the F35 route is open before departure.",
    runways: [
      { id: "17/35", length_m: 820, width_m: 38, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 5387", ppr_contact: "Helgi Bjarnason (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Hveravellir umferð\" — and report position.",
      sample_call: "Hveravellir umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "Surface can be soft — rocks may break through and damage tyres."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIKA", iata: null,
    name: "Kaldármelar Airport", name_is: "Kaldármelar",
    type: "small", city: "Kaldármelar", region: "Vesturland",
    elevation_ft: 149, elevation_m: 45,
    lat: 64.7789, lng: -22.2569,
    lat_dms: "64°46'44\"N", lng_dms: "022°15'25\"W",
    description: "A small grass strip serving the Mýrar coastal farming district south of Borgarnes in Vesturland. No fuel; PPR required. The flat coastal terrain gives good all-round visibility and straightforward approaches.",
    runways: [
      { id: "03/21", length_m: 653, width_m: 26, surface: "Grass", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 893 6762", ppr_contact: "Ásbjörn Pálsson (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      circuit_alt_ft: null,
      circuit_dir: null,
      traffic: "All traffic in the vicinity is encouraged to make position reports on 118.100 MHz — \"Kaldármelar umferð\" — when below 2,000 ft.",
      sample_call: "Kaldármelar umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "Telephone line to the west of the runway — obstacle data in AIP BIKA AD 2.10."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIKE", iata: null,
    name: "Kerlingarfjöll Airport", name_is: "Kerlingarfjöll",
    type: "small", city: "Kerlingarfjöll", region: "Vesturland",
    elevation_ft: 2038, elevation_m: 621,
    lat: 64.705, lng: -19.4106,
    lat_dms: "64°42'18\"N", lng_dms: "019°24'38\"W",
    highland: true,
    description: "A highland strip at the foot of the Kerlingarfjöll rhyolite range, southwest of Hofsjökull. The mountains are known for vivid orange and red tones and active geothermal vents — a striking destination in Iceland's interior. At 621m AMSL, density altitude matters; access via F35, summer only.",
    runways: [
      { id: "10/28", length_m: 704, width_m: 36, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 5387", ppr_contact: "Helgi Bjarnason (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Kerlingarfjöll umferð\" — and report position.",
      sample_call: "Kerlingarfjöll umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "Aerial wire strung from a cabin across the ravine — obstacle data in AIP BIKE AD 2.10."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIKL", iata: null,
    name: "Kirkjubæjarklaustur Airport", name_is: "Kirkjubæjarklaustur",
    type: "small", city: "Kirkjubæjarklaustur", region: "Suðurland",
    elevation_ft: 71, elevation_m: 22,
    lat: 63.7928, lng: -18.0039,
    lat_dms: "63°47'34\"N", lng_dms: "018°00'14\"W",
    description: "A historic village in southeast Iceland, between the Mýrdalssandur and Skeiðarársandur glacial outwash plains. The Laki craters — site of the catastrophic 1783 eruption that affected climate across the Northern Hemisphere — lie just to the north. A key staging point for southeast Iceland and highland operations.",
    runways: [
      { id: "08/26", length_m: 799, width_m: 26, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 5387", ppr_contact: "Helgi Bjarnason (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.400 MHz — \"Kirkjubæjarklaustur umferð\" — and report position.",
      sample_call: "Kirkjubæjarklaustur umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIKP", iata: null,
    name: "Kópasker Airport", name_is: "Kópasker",
    type: "small", city: "Kópasker", region: "Norðurland eystra",
    elevation_ft: 36, elevation_m: 11,
    lat: 66.3108, lng: -16.4667,
    lat_dms: "66°18'39\"N", lng_dms: "016°28'00\"W",
    description: "A remote gravel strip on the Melrakkaslétta peninsula in northeast Iceland, one of the country's least-visited regions. Ásbyrgi — the horseshoe-shaped glacial canyon carved by a catastrophic jökulhlaup — lies just to the south. Exposed to prevailing NE Atlantic weather; no services on the field.",
    runways: [
      { id: "12/30", length_m: 799, width_m: 24, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 860 5634", ppr_contact: "Umdæmisstjóri District 3 (Isavia)", customs: false, deicing: false, fire_cat: null, handling: false },
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
    description: "A grass strip in the Skagafjörður valley of north Iceland, used primarily for glider operations alongside powered aircraft. The glider circuit operates east of the runway; model aircraft use the west side — see pilot notes for mandatory separation. No ATS; announce intentions carefully.",
    runways: [
      { id: "04/22", length_m: 671, width_m: 22, surface: "Grass", pcn: null, notes: null }
    ],
    frequencies: [],
    nav: [],
    hours: { service: "None", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 463 1313", ppr_contact: "Melgerðismelar (glider aerodrome, Isavia District 3)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      circuit_note: "Glider circuit east of runway. Model aircraft circuit west of runway — be aware of separation. Confirm circuit altitude in current AIP charts.",
      tips: [
        "Glider operations use the circuit east of runway. Model aircraft operate west of runway. Announce your position and be aware of both.",
        "Uncontrolled airfield — listen out carefully and announce early.",
        "Glider aerodrome. Glider circuit east of the runway; powered aircraft circuit west. ATZ: 2 NM radius, upper limit 1,500 ft AMSL, H24.",
        "Before entering the ATZ, contact both Akureyri Tower on 118.200 MHz and Melgerðismelar on 119.900 MHz."
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
    description: "A grass strip in the Rangá lowlands with Eyjafjallajökull rising dramatically to the south and Hekla visible to the north. The 2010 Eyjafjallajökull eruption that disrupted European aviation is etched into the landscape around the field. Good access to south Iceland's major volcanic features.",
    runways: [
      { id: "11/29", length_m: 799, width_m: 39, surface: "Grass", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 892 0008", ppr_contact: "Múlakot (einkavöllur / private)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.400 MHz — \"Múlakot umferð\" — and report position.",
      sample_call: "Múlakot umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BINF", iata: null,
    name: "Norðfjörður Airport", name_is: "Norðfjörður",
    type: "small", city: "Norðfjörður", region: "Austurland",
    elevation_ft: 6, elevation_m: 2,
    lat: 65.1317, lng: -13.7475,
    lat_dms: "65°07'54\"N", lng_dms: "013°44'51\"W",
    description: "Serves the small fishing community of Norðfjörður in Iceland's East Fjords, among the more easterly strips in the country. The surrounding fjord scenery is dramatic; fjord terrain can funnel wind unpredictably on approach. An asphalt-stabilized strip in reasonable condition for a remote community field.",
    runways: [
      { id: "08/26", length_m: 970, width_m: 23, surface: "Asphalt-stabilized gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 5639", ppr_contact: "Umdæmisstjóri District 4 (Isavia)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Norðfjörður umferð\" — and report position.",
      sample_call: "Norðfjörður umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "AFIS (Norðfjörður Radio) available on request for ambulance and emergency flights only."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIND", iata: null,
    name: "Nýidalur Airport", name_is: "Nýidalur",
    type: "small", city: "Nýidalur", region: "Suðurland",
    elevation_ft: 2690, elevation_m: 820,
    lat: 64.7206, lng: -18.0667,
    lat_dms: "64°43'14\"N", lng_dms: "018°04'00\"W",
    highland: true,
    description: "Iceland's highest airport at 820m AMSL, on the Sprengisandur route between the Vatnajökull and Hofsjökull glacier systems. The surrounding landscape is one of the most uninhabited in Europe — gravel desert stretching to every horizon. PPR essential; no services, weather deteriorates rapidly, and density altitude is a constant factor.",
    runways: [
      { id: "05/23", length_m: 830, width_m: 45, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 5387", ppr_contact: "Helgi Bjarnason (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Nýidalur umferð\" — and report position.",
      sample_call: "Nýidalur umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIRG", iata: null,
    name: "Raufarhöfn Airport", name_is: "Raufarhöfn",
    type: "small", city: "Raufarhöfn", region: "Norðurland eystra",
    elevation_ft: 65, elevation_m: 20,
    lat: 66.4064, lng: -15.9183,
    lat_dms: "66°24'23\"N", lng_dms: "015°55'06\"W",
    description: "Iceland's northernmost coastal community, on the windswept Melrakkaslétta cape. The Arctic Henge — a modern stone monument aligned with the Arctic Circle and the solstice sun — stands just outside the village. Frequently exposed to strong NE winds; check MET carefully before arrival.",
    runways: [
      { id: "06/24", length_m: 1077, width_m: 33, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 465 1269", ppr_contact: "Umdæmisstjóri District 3 (Isavia)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Raufarhöfn umferð\" — and report position.",
      sample_call: "Raufarhöfn umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIRE", iata: null,
    name: "Reykhólar Airport", name_is: "Reykhólar",
    type: "small", city: "Reykhólar", region: "Vestfirðir",
    elevation_ft: 83, elevation_m: 25,
    lat: 65.4517, lng: -22.2097,
    lat_dms: "65°27'06\"N", lng_dms: "022°12'35\"W",
    description: "A small coastal community on a peninsula at the southern edge of the Westfjords, known for its seaweed harvesting industry. The surrounding tidal flats are an important staging ground for migratory waders and wildfowl. Gravel strip; no fuel.",
    runways: [
      { id: "08/26", length_m: 720, width_m: 27, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 5660", ppr_contact: "Umdæmisstjóri District 2 (Isavia)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Reykhólar umferð\" — and report position.",
      sample_call: "Reykhólar umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "Power line 300 m from the east end of the runway — obstacle data in AIP BIRE AD 2.10."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIRL", iata: null,
    name: "Reykjahlíð Airport", name_is: "Reykjahlíð",
    type: "small", city: "Reykjahlíð", region: "Norðurland eystra",
    elevation_ft: 1031, elevation_m: 314,
    lat: 65.6558, lng: -16.9181,
    lat_dms: "65°39'21\"N", lng_dms: "016°55'05\"W",
    description: "Gateway to the Mývatn lake area — one of the most geologically and ecologically rich landscapes in Iceland. The 1724 Mývatn fires lava flow engulfed the village and nearly destroyed the church that still stands at the field's edge. AVGAS available; the surrounding pseudo-craters, lava formations, and fumaroles reward any excuse to stop.",
    runways: [
      { id: "01/19", length_m: 799, width_m: 20, surface: "Asphalt-stabilized gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: true, jet_a1: false, supplier: "AVGAS 100LL" },
    services: { ppr: true, ppr_phone: "+354 860 5634", ppr_contact: "Umdæmisstjóri District 3 (Isavia)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Reykjahlíð umferð\" — and report position.",
      sample_call: "Reykjahlíð umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "Terrain rises above obstacle surfaces 2 km north of the airport — see AIP BIRL AD 2.10."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIRS", iata: null,
    name: "Reykjanes Airport", name_is: "Reykjanes",
    type: "small", city: "Reykjanes", region: "Vestfirðir",
    elevation_ft: 17, elevation_m: 5,
    lat: 65.9142, lng: -22.4214,
    lat_dms: "65°54'51\"N", lng_dms: "022°25'17\"W",
    description: "Not to be confused with the Reykjanes Peninsula — this Reykjanes is deep in the Westfjords, on the southern shore of Ísafjarðardjúp. An exceptionally remote community in one of Iceland's most sparsely populated regions. No fuel; PPR required.",
    runways: [
      { id: "01/19", length_m: 780, width_m: 18, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 5660", ppr_contact: "Umdæmisstjóri District 2 (Isavia)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Reykjanes umferð\" — and report position.",
      sample_call: "Reykjanes umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "No safety areas on either side of the runway. Obstacles at both runway ends — see AIP BIRS AD 2.10."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIRF", iata: null,
    name: "Rif Airport", name_is: "Rif",
    type: "small", city: "Rif", region: "Vesturland",
    elevation_ft: 25, elevation_m: 8,
    lat: 64.9114, lng: -23.8231,
    lat_dms: "64°54'41\"N", lng_dms: "023°49'23\"W",
    description: "On the northern tip of Snæfellsnes, beside the small harbour town of Ólafsvík, with Snæfellsjökull glacier filling the western horizon on every approach. The glacier — Jules Verne's fictional entrance to the centre of the Earth — dominates the view from the runway. Jet A-1 available; the longest strip on the Snæfellsnes peninsula at 983m.",
    runways: [
      { id: "05/23", length_m: 983, width_m: 27, surface: "Asphalt-stabilized gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: true, supplier: "Jet A-1 available" },
    services: { ppr: true, ppr_phone: "+354 894 3611", ppr_contact: "Guðjón Hrannar Björnsson (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Rif umferð\" — and report position.",
      sample_call: "Rif umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "1,542 ft MSL mast 3 NM west of the airport — obstacle data in AIP BIRF AD 2.10.",
        "NDB RF 330 kHz is on the field with a range of ~50 NM — not monitored."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISS", iata: null,
    name: "Sandskeið Airport", name_is: "Sandskeið",
    type: "small", city: "Sandskeið", region: "Höfuðborgarsvæðið",
    elevation_ft: 600, elevation_m: 183,
    lat: 64.0608, lng: -21.5747,
    lat_dms: "64°03'39\"N", lng_dms: "021°34'29\"W",
    description: "An inland training and glider airfield on the moors southeast of Reykjavík, used primarily for glider towing and power aircraft circuits. Power aircraft must use the circuit north of the runway; gliders operate south — see pilot notes for the mandatory separation rules. No ATS; announce carefully on MF.",
    runways: [
      { id: "13/31", length_m: 799, width_m: 18, surface: "Asphalt-stabilized gravel", pcn: null, notes: null }
    ],
    frequencies: [],
    nav: [],
    hours: { service: "None", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 697 8730", ppr_contact: "Svifflugfélag Íslands (Isavia)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      circuit_note: "Power aircraft circuit north of runway 13/31 at 1,300 ft MSL (700 ft AGL). Glider circuit south of runway.",
      tips: [
        "Power aircraft must fly the circuit north of runway 13/31, at 1,300 ft MSL / 700 ft AGL.",
        "Glider operations use the circuit south of the runway. Announce your position and watch for gliders on base and final.",
        "Uncontrolled airfield — listen out on the MF frequency.",
        "Glider aerodrome. Glider circuit south of the runway; powered aircraft circuit north at 1,300 ft MSL / 700 ft AGL."
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
    highland: true,
    description: "A remote highland strip with an unusual layout — five runways in different orientations to handle the highly variable winds of the northeastern highland plateau. At 671m elevation, density altitude must be considered on every departure. No fuel; PPR required; conditions change fast.",
    runways: [
      { id: "03/21", length_m: 740, width_m: 20, surface: "Gravel", pcn: null, notes: null },
      { id: "06/24", length_m: 1180, width_m: 30, surface: "Gravel", pcn: null, notes: null },
      { id: "10/28", length_m: 880, width_m: 30, surface: "Gravel", pcn: null, notes: null },
      { id: "13/31", length_m: 660, width_m: 20, surface: "Gravel", pcn: null, notes: null },
      { id: "18/36", length_m: 640, width_m: 20, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 699 1414", ppr_contact: "Ómar Ragnarsson (eigandi / private)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Sauðárflugvöllur umferð\" — and report position.",
      sample_call: "Sauðárflugvöllur umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "High ground (~50 ft) at the ends of runways 03/21, 13/31, and 18/36 — see AIP BISA AD 2.10.",
        "Seasonal use — conditions may change with short notice. Nearest automatic met station is at Kárahnjúkar, 17 km away."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISF", iata: null,
    name: "Selfoss Airport", name_is: "Selfoss",
    type: "small", city: "Selfoss", region: "Suðurland",
    elevation_ft: 47, elevation_m: 14,
    lat: 63.9292, lng: -21.0378,
    lat_dms: "63°55'45\"N", lng_dms: "021°02'16\"W",
    description: "Serving the largest town in south Iceland, on the Ölfusá river plain at the heart of Iceland's most productive agricultural region. AVGAS available; two grass runways give useful crosswind options. A practical and well-positioned base for Golden Circle, Þingvellir, and south Iceland flying.",
    runways: [
      { id: "05/23", length_m: 798, width_m: 30, surface: "Grass", pcn: null, notes: null },
      { id: "14/32", length_m: 794, width_m: 30, surface: "Grass", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: true, jet_a1: false, supplier: "AVGAS 100LL" },
    services: { ppr: true, ppr_phone: "+354 856 5513", ppr_contact: "Guðjón Kjartansson (Flugklúbbur Selfoss)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Selfoss umferð\" — and report position.",
      sample_call: "Selfoss umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      circuit_note: "RWY 05: Left-hand. RWY 23: Right-hand. RWY 14: Right-hand. RWY 32: Left-hand. Circuit at 1,000 ft.",
      tips: [
        "No formal notification of runway surface conditions is published — check conditions yourself before use.",
        "Night operations restricted 23:00–07:00. Touch-and-go permitted weekdays 07:00–18:00 only.",
        "Takeoffs prohibited 23:00–07:00 (emergencies excepted). Touch-and-go permitted weekdays 07:00–18:00 only.",
        "Circuit altitude 1,000 ft MSL. RWY 05 left circuit. RWY 23 right circuit — pass Sandvíkurbær at 1,000 ft before turning downwind. RWY 14 right circuit. RWY 32 left circuit.",
        "Pilot-activated runway lights (RWY 05/23) on 122.8 MHz — key 3 times. Auto-off after 18 min. Emergency use only."
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
    description: "In a narrow, dramatic fjord in northern Iceland — the former herring capital of the world. The annual herring boom of the early 20th century made Siglufjörður briefly one of Iceland's wealthiest places; the Herring Era Museum here is one of the finest in the country. The approach is tight with steep fjord walls on each side.",
    runways: [
      { id: "05/23", length_m: 799, width_m: 23, surface: "Asphalt-stabilized gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 464 9100", ppr_contact: "Fjallabyggð sveitarfélag (municipality)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Siglufjörður umferð\" — and report position.",
      sample_call: "Siglufjörður umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "This airfield is restricted to ambulance and emergency flights only — not open to general traffic."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISL", iata: null,
    name: "Skaftafell Airport", name_is: "Skaftafell",
    type: "small", city: "Skaftafell", region: "Suðurland",
    elevation_ft: 260, elevation_m: 79,
    lat: 64.0, lng: -16.9408,
    lat_dms: "64°00'00\"N", lng_dms: "016°56'27\"W",
    description: "Within Vatnajökull National Park, at the foot of Europe's largest glacier. Skaftafell is one of Iceland's most visited natural areas — Svartifoss and the ice tongues of Skaftafellsjökull are minutes from the field. High helicopter activity from glacier tours and rescue operations; monitor MF carefully before approach.",
    runways: [
      { id: "15/33", length_m: 610, width_m: 20, surface: "Gravel", pcn: null, notes: null },
      { id: "16/34", length_m: 1020, width_m: 25, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: true, jet_a1: true, supplier: "Check NOTAMs" },
    services: { ppr: true, ppr_phone: "+354 478 2406", ppr_contact: "Jón Grétar Sigurðsson (Atlantsflug ehf.)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.400 MHz — \"Skaftafell umferð\" — and report position.",
      sample_call: "Skaftafell umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "Vehicle traffic on road at the thresholds of RWY 15 and 16 — check runway is clear before take-off and landing.",
        "Vatnajökull National Park is northwest of the airport — noise-sensitive area. Announce your arrival on frequency in advance."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISV", iata: null,
    name: "Skálavatn Airport", name_is: "Skálavatn",
    type: "small", city: "Skálavatn", region: "Suðurland",
    elevation_ft: 1920, elevation_m: 585,
    lat: 64.1158, lng: -18.7833,
    lat_dms: "64°06'57\"N", lng_dms: "018°47'00\"W",
    highland: true,
    description: "A remote highland strip near the Skálavatn lake, on the moorland between Hekla and the southern highland plateau. The surrounding lava fields and open terrain provide little shelter; highland weather changes rapidly here. PPR required; confirm access and conditions before departure.",
    runways: [
      { id: "06/24", length_m: 700, width_m: 35, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 5387", ppr_contact: "Helgi Bjarnason (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.400 MHz — \"Skálavatn umferð\" — and report position.",
      sample_call: "Skálavatn umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISK", iata: null,
    name: "Skógasandur Airport", name_is: "Skógasandur",
    type: "small", city: "Skógasandur", region: "Suðurland",
    elevation_ft: 118, elevation_m: 36,
    lat: 63.5172, lng: -19.4892,
    lat_dms: "63°31'02\"N", lng_dms: "019°29'21\"W",
    description: "On the Skógasandur plain below Eyjafjallajökull, between the Skógar waterfall and the black sand coast. The long 1165m strip handles the strong katabatic and channelling winds that roll off the glacier above — treat the wind reports here seriously. The 2010 Eyjafjallajökull ash fall is still visible in the surrounding terrain.",
    runways: [
      { id: "12/30", length_m: 1165, width_m: 27, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 5387", ppr_contact: "Helgi Bjarnason (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.400 MHz — \"Skógasandur umferð\" — and report position.",
      sample_call: "Skógasandur umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BISR", iata: null,
    name: "Stórikroppur Airport", name_is: "Stórikroppur",
    type: "small", city: "Stórikroppur", region: "Vesturland",
    elevation_ft: 119, elevation_m: 36,
    lat: 64.6344, lng: -21.4875,
    lat_dms: "64°38'04\"N", lng_dms: "021°29'15\"W",
    description: "An open-access VFR airfield in the Borgarfjörður valley — one of the few Icelandic strips with no PPR requirement. AVGAS available in limited quantities; always confirm before departing home base. The broad Hvítá river valley gives good approaches from most directions and reliable visual references.",
    runways: [
      { id: "05/23", length_m: 700, width_m: 18, surface: "Asphalt-stabilized gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: true, jet_a1: false, supplier: "AVGAS 100LL — limited supply, confirm availability before departure" },
    services: { ppr: false, ppr_phone: "+354 694 4676", ppr_contact: "Snorri Kristleifsson (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      entry: "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Stórikroppur umferð\" — and report position.",
      sample_call: "Stórikroppur umferð, TF-XXX, Cessna 172, [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "Pilot shelter on site — door code 0325."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIST", iata: null,
    name: "Stykkishólmur Airport", name_is: "Stykkishólmur",
    type: "small", city: "Stykkishólmur", region: "Vesturland",
    elevation_ft: 43, elevation_m: 13,
    lat: 65.0586, lng: -22.7656,
    lat_dms: "65°03'31\"N", lng_dms: "022°45'56\"W",
    description: "A historic trading town on the north coast of Snæfellsnes, with a charming harbour and the Baldur ferry connection to the Westfjords. The approach crosses Breiðafjörður bay — an extraordinary maze of islands and islets. Notable bird activity on and near the runway; see pilot notes.",
    runways: [
      { id: "07/25", length_m: 1117, width_m: 33, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 894 3611", ppr_contact: "Guðjón Hrannar Björnsson (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Stykkishólmur umferð\" — and report position.",
      sample_call: "Stykkishólmur umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "Significant bird activity near the runway — birds are reluctant to move. Exercise caution on approach and landing.",
        "Uncontrolled airfield — announce intentions early on MF.",
        "Traffic circuit is west of the runway.",
        "360 ft MSL mast east of the runway — obstacle data in AIP BIST AD 2.10.",
        "Bird hazard: large numbers of gulls and geese near the runway year-round."
      ]
    },
    hazards: [
      { type: "bird", description: "Significant bird activity near the runway — birds reluctant to move. Exercise caution on approach and landing." }
    ],
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIMS", iata: null,
    name: "Tungubakkar Mosfellsbæ Airport", name_is: "Tungubakkar Mosfellsbæ",
    type: "small", city: "Tungubakkar Mosfellsbæ", region: "Höfuðborgarsvæðið",
    elevation_ft: 18, elevation_m: 5,
    lat: 64.1811, lng: -21.7078,
    lat_dms: "64°10'52\"N", lng_dms: "021°42'28\"W",
    description: "A small grass airfield in Mosfellsdalur, immediately outside the Reykjavík capital area and adjacent to BIRK's control zone. One of Iceland's most restricted airfields: engine power limits apply, training flights are prohibited, and helicopter operations require written permission from the club. Read the AIP carefully before any operation here.",
    runways: [
      { id: "07/25", length_m: 540, width_m: 45, surface: "Grass", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.200" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: true, jet_a1: false, supplier: "AVGAS 100LL" },
    services: { ppr: true, ppr_phone: "+354 858 4286", ppr_contact: "Sigurjón Valsson (Flugklúbbur Mosfellsbæjar)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      circuit_note: "Circuit at 700 ft, north of the airfield only.",
      t_and_g: "No touch-and-go or training/practice flights permitted at this airfield.",
      tips: [
        "Aircraft with engines over 200 HP are not permitted except in emergencies.",
        "Helicopter operations in the circuit are prohibited, except LHG helicopters — and only with written permission from the FKM chairman.",
        "No training or practice flights are allowed.",
        "This airfield is close to the Reykjavík (BIRK) CTR — file a flight plan and obtain Reykjavík Tower clearance before entering the CTR.",
        "Unusually restricted airfield — read all published AIP conditions before use.",
        "Members and guests only — PPR mandatory.",
        "Aircraft over 200 HP are not permitted. Helicopters (except LHG) require written permission from the club chairman. Circuit at 700 ft north of the field.",
        "Within Reykjavík CTR — file a flight plan and obtain BIRK Tower clearance before entering."
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
    description: "Iceland's southernmost village, under the looming shoulder of Mýrdalsjökull and the restless Katla volcano. Reynisfjara black sand beach and the Reynisdrangar sea stacks lie immediately south — one of Iceland's most dramatic coastal settings. The short 712m strip is exposed to strong southerly and easterly winds; check the forecast carefully.",
    runways: [
      { id: "07/25", length_m: 712, width_m: 25, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 487 1243", ppr_contact: "Reynir Ragnarsson (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.400 MHz — \"Vík umferð\" — and report position.",
      sample_call: "Vík umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BITE", iata: null,
    name: "Þingeyri Airport", name_is: "Þingeyri",
    type: "small", city: "Þingeyri", region: "Vestfirðir",
    elevation_ft: 28, elevation_m: 9,
    lat: 65.8703, lng: -23.5597,
    lat_dms: "65°52'13\"N", lng_dms: "023°33'35\"W",
    description: "One of Iceland's oldest trading settlements, on the shore of Dýrafjörður deep in the Westfjords. The surrounding mountains are steep and close; approach and departure are straightforward along the fjord axis, but crosswind sensitivity increases in the narrow valley. A small but historically significant community in spectacular scenery.",
    runways: [
      { id: "13/31", length_m: 799, width_m: 24, surface: "Asphalt-stabilized gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 4090", ppr_contact: "AFIS BIIS / Umdæmisstjóri District 2 (Isavia)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.100 MHz — \"Þingeyri umferð\" — and report position.",
      sample_call: "Þingeyri umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "8 m high power line 1,000 m from the SE end of the runway — obstacle data in AIP BITE AD 2.10."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BITM", iata: null,
    name: "Þórsmörk Airport", name_is: "Þórsmörk",
    type: "small", city: "Þórsmörk", region: "Suðurland",
    elevation_ft: 634, elevation_m: 193,
    lat: 63.69, lng: -19.5631,
    lat_dms: "63°41'24\"N", lng_dms: "019°33'47\"W",
    highland: true,
    description: "Þórsmörk — the valley of Thor — lies between three glaciers: Eyjafjallajökull, Mýrdalsjökull, and Tindfjallajökull. The endpoint of the famous Laugavegur hiking trail, and one of Iceland's most popular wilderness destinations. River crossings make road access unreliable, giving the airstrip genuine operational value for access and rescue.",
    runways: [
      { id: "09/27", length_m: 770, width_m: 28, surface: "Gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "MF", freq: "118.400" }
    ],
    nav: [],
    hours: { service: "MF", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 5387", ppr_contact: "Helgi Bjarnason (Isavia District 1)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      traffic: "All traffic in the vicinity, below 2,000 ft, is encouraged to make blind calls on 118.400 MHz — \"Þórsmörk umferð\" — and report position.",
      sample_call: "Þórsmörk umferð, TF-XXX, [aircraft type], [position], VFR inbound, blind.",
      tips: [
        "The airfield is open to all traffic that can use it, subject to applicable rules. Pilots use the airfield at their own risk.",
        "Power line 900 m from the east end of the runway — obstacle data in AIP BITM AD 2.10."
      ]
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIBD", iata: null,
    name: "Bíldudalur Airport", name_is: "Bíldudalur",
    type: "small", city: "Bíldudalur", region: "Vestfirðir",
    elevation_ft: 25, elevation_m: 8,
    lat: 65.6414, lng: -23.5461,
    lat_dms: "65°38'29\"N", lng_dms: "023°32'46\"W",
    description: "On the west shore of Arnarfjörður in the Westfjords, with AFIS service — one of the better-equipped small Westfjords strips. The Icelandic Sea Monster Museum here is dedicated to the unusually high number of sea monster sightings reported from the surrounding fjords over the centuries. Regular Eagleair connections.",
    runways: [
      { id: "04/22", length_m: 940, width_m: 30, surface: "Asphalt-stabilized gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "AFIS", freq: "119.100" }
    ],
    nav: [],
    hours: { service: "AFIS", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 4085", ppr_contact: "Bíldudalur AFIS / Umdæmisstjóri District 2 (Isavia)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      entry: "Contact Bíldudalur AFIS on 119.100 before arrival.",
      sample_call: "Bíldudalur Radio, TF-XXX, [aircraft type], [position], VFR inbound, request airfield information."
    },
    charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIGJ", iata: null,
    name: "Gjögur Airport", name_is: "Gjögur",
    type: "small", city: "Gjögur", region: "Vestfirðir",
    elevation_ft: 90, elevation_m: 27,
    lat: 65.9953, lng: -21.3269,
    lat_dms: "65°59'43\"N", lng_dms: "021°19'37\"W",
    description: "One of Iceland's more remote community strips, on the northern Strandir coast — sometimes called Iceland's forgotten fjords. AFIS service and a 960m asphalt-stabilized strip in better condition than the remoteness might suggest. Exposed to prevailing NW Atlantic weather with little shelter.",
    runways: [
      { id: "04/22", length_m: 960, width_m: 23, surface: "Asphalt-stabilized gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "AFIS", freq: "118.600" }
    ],
    nav: [],
    hours: { service: "AFIS", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 4086", ppr_contact: "Gjögur AFIS / Umdæmisstjóri District 2 (Isavia)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      tips: [
        "Minimal bird activity at the airfield — no nesting recorded.",
        "AFIS service — contact on published frequency. Separation is the pilot's responsibility.",
        "AFIS available limited hours: Summer (Jun–Aug) Fri 09:00–16:00; Winter (Sep–May) Mon & Fri 10:00–16:00."
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
    description: "Iceland's only inhabited island above the Arctic Circle, with fewer than 100 permanent residents. The Arctic Circle marker is a short walk from the runway — a popular pilgrimage for pilots ticking off the 66°33'N latitude. Dense Arctic tern colonies and puffins surround the field from May through September.",
    runways: [
      { id: "17/35", length_m: 1030, width_m: 23, surface: "Asphalt-stabilized gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "AFIS", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "AFIS", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 4070", ppr_contact: "Grímsey AFIS (Isavia District 3)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      tips: [
        "Arctic tern nesting around the airport, mainly in the moors east of the runway. Expect birds on and around the runway from 1 May through 30 September.",
        "Razorbill (Rita) present at the cliff northwest of the runway.",
        "Uncontrolled airfield — announce intentions on MF frequency.",
        "Multiple obstacles east of the runway — antennas, masts, and buildings at 93–412 ft — see AIP BIGR AD 2.10.",
        "Arctic tern nesting east of the runway 1 May – 30 Sep — expect aggressive bird behaviour at low altitude.",
        "PAPI on RWY 17 is only usable within 8° east of the centreline."
      ]
    },
    hazards: [
      { type: "bird", description: "Arctic tern nesting around the airport, mainly in moors east of runway. Razorbill present at cliff NW of runway.", season: "1 May–30 September" }
    ],
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BIKR", iata: null,
    name: "Sauðárkrókur Airport", name_is: "Sauðárkrókur",
    type: "medium", city: "Sauðárkrókur", region: "Norðurland vestra",
    elevation_ft: 9, elevation_m: 3,
    lat: 65.7317, lng: -19.5728,
    lat_dms: "65°43'54\"N", lng_dms: "019°34'22\"W",
    description: "The main town of Skagafjörður — Iceland's premier horse-breeding valley, where the Icelandic horse has been bred since the Settlement Age. The medieval bishop's seat of Hólar lies just inland. A notably long 1887m strip for a regional field, with AFIS service and good infrastructure.",
    runways: [
      { id: "18/36", length_m: 1887, width_m: 30, surface: "Asphalt-stabilized gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "AFIS", freq: "119.100" }
    ],
    nav: [],
    hours: { service: "AFIS", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 4072", ppr_contact: "Sauðárkrókur AFIS (Isavia District 3)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      tips: [
        "Small birds and ducks common in the marshes around the airport.",
        "Swans and geese at Miklavatn lake southwest of the runway.",
        "Arctic tern nesting west of the runway — expect bird activity on approach to runway.",
        "AFIS service — contact on published frequency. Separation is the pilot's responsibility.",
        "Multiple obstacles around the airport including masts and terrain at 158–344 ft MSL — see AIP BIKR AD 2.10."
      ]
    },
    hazards: [
      { type: "bird", description: "Arctic tern nesting west of runway. Swans and geese at Miklavatn lake SW of runway. Small birds and ducks in surrounding marshes." }
    ],
        charts_url: "https://eaip.isavia.is/A_06-2026_2026_06_11/"
  },
  {
    icao: "BITN", iata: null,
    name: "Þórshöfn Airport", name_is: "Þórshöfn",
    type: "small", city: "Þórshöfn", region: "Norðurland eystra",
    elevation_ft: 64, elevation_m: 20,
    lat: 66.2183, lng: -15.3347,
    lat_dms: "66°13'06\"N", lng_dms: "015°20'05\"W",
    description: "On the remote Langanes peninsula in northeast Iceland, one of the country's most isolated communities. The Langanes cape is known for dramatic sea cliffs, rich seabird colonies, and a powerful sense of being at the edge of the inhabited world. AFIS service; 1199m strip.",
    runways: [
      { id: "01/19", length_m: 1199, width_m: 30, surface: "Asphalt-stabilized gravel", pcn: null, notes: null }
    ],
    frequencies: [
      { role: "AFIS", freq: "118.100" }
    ],
    nav: [],
    hours: { service: "AFIS", schedule: "By arrangement", notes: "Check NOTAMs." },
    fuel: { avgas: false, jet_a1: false, supplier: null },
    services: { ppr: true, ppr_phone: "+354 424 4071", ppr_contact: "Þórshöfn AFIS (Isavia District 3)", customs: false, deicing: false, fire_cat: null, handling: false },
    remarks: [],
    pilot_notes: {
      tips: [
        "Geese nest east of the airport. They arrive late April and are present through June, returning again in August.",
        "Eider duck nesting at the pond southwest of the airport.",
        "AFIS service — contact on published frequency. Separation is the pilot's responsibility.",
        "Terrain in Area 2 rises to 515 ft MSL to the east and SE of the airport — see AIP BITN AD 2.10.",
        "Geese nest east of the airport late April – early June, returning August–September. Eider nesting SW of the airport."
      ]
    },
    hazards: [
      { type: "bird", description: "Geese nest east of the airport. Eider duck nesting at pond SW of the airport.", season: "Geese: late April through June, returning August" }
    ],
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
