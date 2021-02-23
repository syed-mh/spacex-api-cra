import APIFetchEvents from "./APIFetchEvents";
import TestVariables from "./APIFetchEvents.testVariables";

describe("_sortResourcesByDate with invalid inputs", () => {
  test.each`
    RESOURCE                                                    | ERROR
    ${TestVariables._sortResourcesByDate.invalidTest.inputs[0]} | ${TestVariables._sortResourcesByDate.invalidTest.errors[0]}
    ${TestVariables._sortResourcesByDate.invalidTest.inputs[1]} | ${TestVariables._sortResourcesByDate.invalidTest.errors[1]}
    ${TestVariables._sortResourcesByDate.invalidTest.inputs[2]} | ${TestVariables._sortResourcesByDate.invalidTest.errors[2]}
    ${TestVariables._sortResourcesByDate.invalidTest.inputs[3]} | ${TestVariables._sortResourcesByDate.invalidTest.errors[3]}
    ${TestVariables._sortResourcesByDate.invalidTest.inputs[4]} | ${TestVariables._sortResourcesByDate.invalidTest.errors[4]}
    ${TestVariables._sortResourcesByDate.invalidTest.inputs[5]} | ${TestVariables._sortResourcesByDate.invalidTest.errors[5]}
    ${TestVariables._sortResourcesByDate.invalidTest.inputs[6]} | ${TestVariables._sortResourcesByDate.invalidTest.errors[6]}
  `("$RESOURCE throws $ERROR", ({ RESOURCE, ERROR }) => {
    expect(() =>
      new APIFetchEvents()._sortResourcesByDate(RESOURCE, "date_utc", "asc")
    ).toThrowError(ERROR);
  });
});

describe("_sortResourcesByDate with valid inputs", () => {
  test.each`
    RESOURCE                                                  | ORDERBY                                                    | OUTPUT
    ${TestVariables._sortResourcesByDate.validTest.inputs[0]} | ${TestVariables._sortResourcesByDate.validTest.orderby[0]} | ${TestVariables._sortResourcesByDate.validTest.outputs[0]}
    ${TestVariables._sortResourcesByDate.validTest.inputs[1]} | ${TestVariables._sortResourcesByDate.validTest.orderby[1]} | ${TestVariables._sortResourcesByDate.validTest.outputs[1]}
  `("$RESOURCE retuns $ORDERBY $OUTPUT", ({ RESOURCE, ORDERBY, OUTPUT }) => {
    expect(
      new APIFetchEvents()._sortResourcesByDate(RESOURCE, "date_utc", ORDERBY)
    ).toEqual(OUTPUT);
  });
});

describe("_processLaunchCard with valid inputs", () => {
  test.each`
    LAUNCH                                                  | OUTPUT
    ${TestVariables._processLaunchCard.validTest.inputs[0]} | ${TestVariables._processLaunchCard.validTest.outputs[0]}
    ${TestVariables._processLaunchCard.validTest.inputs[1]} | ${TestVariables._processLaunchCard.validTest.outputs[1]}
  `("$LAUNCH gets converted into $OUTPUT", ({ LAUNCH, OUTPUT }) => {
    expect(new APIFetchEvents()._processLaunchCard(LAUNCH)).toEqual(OUTPUT);
  });
});

test("Process Launch", () => {
  jest.setTimeout(100000);
  const LAUNCHENDPOINT = "launches/600f9a5e8f798e2a4d5f979c";
  return new APIFetchEvents()
    ._processLaunchData(LAUNCHENDPOINT)
    .then((data) => {
      expect(data).toEqual({
        fairings: {
          reused: null,
          recovery_attempt: true,
          recovered: true,
          ships: [
            {
              legacy_id: "GOMSCHIEF",
              model: null,
              type: "High Speed Craft",
              roles: ["Fairing Recovery"],
              imo: 9744453,
              mmsi: 338035000,
              abs: 1247527,
              class: 14245747,
              mass_kg: 449964,
              mass_lbs: 992000,
              year_built: 2014,
              home_port: "Port Canaveral",
              status: "",
              speed_kn: null,
              course_deg: null,
              latitude: null,
              longitude: null,
              last_ais_update: null,
              link:
                "https://www.marinetraffic.com/en/ais/details/ships/shipid:5126789/mmsi:338035000/imo:9744453/vessel:GO_MS_CHIEF",
              image: "https://imgur.com/NHsx95l.jpg",
              launches: [
                "5eb87d3bffd86e000604b37f",
                "5eb87d3fffd86e000604b382",
                "5eb87d41ffd86e000604b383",
                "5eb87d44ffd86e000604b386",
                "5eb87d45ffd86e000604b387",
                "5eb87d46ffd86e000604b389",
                "5eb87d50ffd86e000604b394",
                "5ed9819a1f30554030d45c29",
                "5ed981d91f30554030d45c2a",
                "5eb87d47ffd86e000604b38a",
                "5ef6a2090059c33cee4a828b",
                "5ef6a2bf0059c33cee4a828c",
                "5ef6a2e70059c33cee4a8293",
                "5eb87d4cffd86e000604b38d",
                "5fb95b3f3a88ae63c954603c",
                "5eb87d4fffd86e000604b393",
                "5fbfecce54ceb10a5664c80a",
                "5fd386aa7faea57d297c86c1",
                "5ff6554f9257f579ee3a6c5f",
              ],
              name: "GO Ms Chief",
              active: true,
              id: "5ea6ed2e080df4000697c907",
            },
            {
              legacy_id: "GOMSTREE",
              model: null,
              type: "High Speed Craft",
              roles: ["Fairing Recovery"],
              imo: 9744465,
              mmsi: 368059550,
              abs: 1249191,
              class: 15252765,
              mass_kg: 449964,
              mass_lbs: 992000,
              year_built: 2015,
              home_port: "Port Canaveral",
              status: "",
              speed_kn: null,
              course_deg: null,
              latitude: null,
              longitude: null,
              last_ais_update: null,
              link:
                "https://www.marinetraffic.com/en/ais/details/ships/shipid:3439091/mmsi:368099550/imo:9744465/vessel:GO_MS_TREE",
              image: "https://i.imgur.com/MtEgYbY.jpg",
              launches: [
                "5eb87d0dffd86e000604b35b",
                "5eb87d0fffd86e000604b35d",
                "5eb87d14ffd86e000604b361",
                "5eb87d16ffd86e000604b363",
                "5eb87d1affd86e000604b367",
                "5eb87d1fffd86e000604b36b",
                "5eb87d25ffd86e000604b370",
                "5eb87d35ffd86e000604b37a",
                "5eb87d37ffd86e000604b37c",
                "5eb87d39ffd86e000604b37d",
                "5eb87d3bffd86e000604b37f",
                "5eb87d3cffd86e000604b380",
                "5eb87d3fffd86e000604b382",
                "5eb87d41ffd86e000604b383",
                "5eb87d44ffd86e000604b386",
                "5eb87d45ffd86e000604b387",
                "5eb87d46ffd86e000604b389",
                "5eb87d50ffd86e000604b394",
                "5ed9819a1f30554030d45c29",
                "5ed981d91f30554030d45c2a",
                "5ef6a1e90059c33cee4a828a",
                "5ef6a2090059c33cee4a828b",
                "5ef6a2bf0059c33cee4a828c",
                "5ef6a2e70059c33cee4a8293",
                "5f8399fb818d8b59f5740d43",
                "5eb87d4fffd86e000604b393",
                "5fbfecce54ceb10a5664c80a",
                "5fd386aa7faea57d297c86c1",
                "5ff6554f9257f579ee3a6c5f",
              ],
              name: "GO Ms Tree",
              active: true,
              id: "5ea6ed2e080df4000697c908",
            },
          ],
        },
        links: {
          patch: {
            small: "https://imgur.com/BrW201S.png",
            large: "https://imgur.com/573IfGk.png",
          },
          reddit: {
            campaign:
              "https://www.reddit.com/r/spacex/comments/jhu37i/starlink_general_discussion_and_deployment_thread/",
            launch:
              "https://www.reddit.com/r/spacex/comments/ljkh7l/rspacex_starlink19_official_launch_discussion/",
            media:
              "https://www.reddit.com/r/spacex/comments/lkwllg/starlink19_media_thread_photographer_contest/",
            recovery:
              "https://www.reddit.com/r/spacex/comments/k2ts1q/rspacex_fleet_updates_discussion_thread/",
          },
          flickr: {
            small: [],
            original: [
              "https://live.staticflickr.com/65535/50949943433_87e3002307_o.jpg",
            ],
          },
          presskit: null,
          webcast: "https://youtu.be/L0dkyV09Zso",
          youtube_id: "L0dkyV09Zso",
          article:
            "https://spaceflightnow.com/2021/02/16/spacex-successfully-deploys-60-more-starlink-satellites-but-loses-booster-on-descent/",
          wikipedia: "https://en.wikipedia.org/wiki/Starlink",
        },
        static_fire_date_utc: "2021-02-13T18:17:00.000Z",
        static_fire_date_unix: 1613240220,
        tbd: false,
        net: false,
        window: null,
        rocket: {
          height: {
            meters: 70,
            feet: 229.6,
          },
          diameter: {
            meters: 3.7,
            feet: 12,
          },
          mass: {
            kg: 549054,
            lb: 1207920,
          },
          first_stage: {
            thrust_sea_level: {
              kN: 7607,
              lbf: 1710000,
            },
            thrust_vacuum: {
              kN: 8227,
              lbf: 1849500,
            },
            reusable: true,
            engines: 9,
            fuel_amount_tons: 385,
            burn_time_sec: 162,
          },
          second_stage: {
            thrust: {
              kN: 934,
              lbf: 210000,
            },
            payloads: {
              composite_fairing: {
                height: {
                  meters: 13.1,
                  feet: 43,
                },
                diameter: {
                  meters: 5.2,
                  feet: 17.1,
                },
              },
              option_1: "dragon",
            },
            reusable: false,
            engines: 1,
            fuel_amount_tons: 90,
            burn_time_sec: 397,
          },
          engines: {
            isp: {
              sea_level: 288,
              vacuum: 312,
            },
            thrust_sea_level: {
              kN: 845,
              lbf: 190000,
            },
            thrust_vacuum: {
              kN: 914,
              lbf: 205500,
            },
            number: 9,
            type: "merlin",
            version: "1D+",
            layout: "octaweb",
            engine_loss_max: 2,
            propellant_1: "liquid oxygen",
            propellant_2: "RP-1 kerosene",
            thrust_to_weight: 180.1,
          },
          landing_legs: {
            number: 4,
            material: "carbon fiber",
          },
          payload_weights: [
            {
              id: "leo",
              name: "Low Earth Orbit",
              kg: 22800,
              lb: 50265,
            },
            {
              id: "gto",
              name: "Geosynchronous Transfer Orbit",
              kg: 8300,
              lb: 18300,
            },
            {
              id: "mars",
              name: "Mars Orbit",
              kg: 4020,
              lb: 8860,
            },
          ],
          flickr_images: [
            "https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg",
            "https://farm4.staticflickr.com/3955/32915197674_eee74d81bb_b.jpg",
            "https://farm1.staticflickr.com/293/32312415025_6841e30bf1_b.jpg",
            "https://farm1.staticflickr.com/623/23660653516_5b6cb301d1_b.jpg",
            "https://farm6.staticflickr.com/5518/31579784413_d853331601_b.jpg",
            "https://farm1.staticflickr.com/745/32394687645_a9c54a34ef_b.jpg",
          ],
          name: "Falcon 9",
          type: "rocket",
          active: true,
          stages: 2,
          boosters: 0,
          cost_per_launch: 50000000,
          success_rate_pct: 97,
          first_flight: "2010-06-04",
          country: "United States",
          company: "SpaceX",
          wikipedia: "https://en.wikipedia.org/wiki/Falcon_9",
          description:
            "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.",
          id: "5e9d0d95eda69973a809d1ec",
        },
        success: true,
        details:
          "This mission launches the eighteenth batch of operational Starlink satellites, which are version 1.0, from SLC-40. It is the nineteenth Starlink launch overall. The satellites will be delivered to low Earth orbit and will spend a few weeks maneuvering to their operational altitude. The booster is expected to land on an ASDS.",
        crew: [],
        ships: [
          {
            legacy_id: "OCISLY",
            model: "Marmac 304",
            type: "Barge",
            roles: ["ASDS barge"],
            imo: null,
            mmsi: null,
            abs: null,
            class: null,
            mass_kg: null,
            mass_lbs: null,
            year_built: 2015,
            home_port: "Port Canaveral",
            status: null,
            speed_kn: null,
            course_deg: null,
            latitude: null,
            longitude: null,
            last_ais_update: null,
            link: null,
            image: "https://i.imgur.com/28dCx6G.jpg",
            launches: [
              "5eb87cf2ffd86e000604b344",
              "5eb87cf3ffd86e000604b345",
              "5eb87cf6ffd86e000604b347",
              "5eb87cf8ffd86e000604b348",
              "5eb87cfaffd86e000604b34a",
              "5eb87d00ffd86e000604b34f",
              "5eb87d04ffd86e000604b353",
              "5eb87d0cffd86e000604b35a",
              "5eb87d0dffd86e000604b35b",
              "5eb87d13ffd86e000604b360",
              "5eb87d18ffd86e000604b365",
              "5eb87d19ffd86e000604b366",
              "5eb87d1effd86e000604b36a",
              "5eb87d20ffd86e000604b36c",
              "5eb87d22ffd86e000604b36d",
              "5eb87d24ffd86e000604b36f",
              "5eb87d2affd86e000604b374",
              "5eb87d2bffd86e000604b375",
              "5eb87d2dffd86e000604b376",
              "5eb87d2effd86e000604b377",
              "5eb87d30ffd86e000604b378",
              "5eb87d35ffd86e000604b37a",
              "5eb87d39ffd86e000604b37d",
              "5eb87d3bffd86e000604b37f",
              "5eb87d3cffd86e000604b380",
              "5eb87d3fffd86e000604b382",
              "5eb87d41ffd86e000604b383",
              "5eb87d43ffd86e000604b385",
              "5eb87d44ffd86e000604b386",
              "5eb87d46ffd86e000604b388",
              "5ed9819a1f30554030d45c29",
              "5ed981d91f30554030d45c2a",
              "5ef6a2090059c33cee4a828b",
              "5ef6a2bf0059c33cee4a828c",
              "5eb87d4cffd86e000604b38d",
              "5fb95b3f3a88ae63c954603c",
              "5eb87d4effd86e000604b391",
              "5fd386aa7faea57d297c86c1",
              "5ff6554f9257f579ee3a6c5f",
              "600f9a5e8f798e2a4d5f979c",
            ],
            name: "Of Course I Still Love You",
            active: true,
            id: "5ea6ed30080df4000697c913",
          },
        ],
        capsules: [],
        payloads: [
          {
            dragon: {
              capsule: null,
              mass_returned_kg: null,
              mass_returned_lbs: null,
              flight_time_sec: null,
              manifest: null,
              water_landing: null,
              land_landing: null,
            },
            name: "Starlink-19",
            type: "Satellite",
            reused: false,
            launch: "600f9a5e8f798e2a4d5f979c",
            customers: ["SpaceX"],
            norad_ids: [],
            nationalities: ["United States"],
            manufacturers: ["SpaceX"],
            mass_kg: 15600,
            mass_lbs: 34392,
            orbit: "VLEO",
            reference_system: "geocentric",
            regime: "very-low-earth",
            longitude: null,
            semi_major_axis_km: null,
            eccentricity: null,
            periapsis_km: null,
            apoapsis_km: null,
            inclination_deg: null,
            period_min: null,
            lifespan_years: null,
            epoch: null,
            mean_motion: null,
            raan: null,
            arg_of_pericenter: null,
            mean_anomaly: null,
            id: "600f9bc08f798e2a4d5f97a4",
          },
        ],
        launchpad: {
          name: "CCSFS SLC 40",
          full_name:
            "Cape Canaveral Space Force Station Space Launch Complex 40",
          locality: "Cape Canaveral",
          region: "Florida",
          timezone: "America/New_York",
          latitude: 28.5618571,
          longitude: -80.577366,
          launch_attempts: 66,
          launch_successes: 64,
          rockets: ["5e9d0d95eda69973a809d1ec"],
          launches: [
            "5eb87cddffd86e000604b32f",
            "5eb87cdeffd86e000604b330",
            "5eb87cdfffd86e000604b331",
            "5eb87ce0ffd86e000604b332",
            "5eb87ce1ffd86e000604b333",
            "5eb87ce2ffd86e000604b335",
            "5eb87ce3ffd86e000604b336",
            "5eb87ce4ffd86e000604b337",
            "5eb87ce4ffd86e000604b338",
            "5eb87ce5ffd86e000604b339",
            "5eb87ce6ffd86e000604b33a",
            "5eb87ce7ffd86e000604b33b",
            "5eb87ce8ffd86e000604b33c",
            "5eb87ceaffd86e000604b33d",
            "5eb87ceaffd86e000604b33e",
            "5eb87cecffd86e000604b33f",
            "5eb87cedffd86e000604b340",
            "5eb87ceeffd86e000604b341",
            "5eb87cefffd86e000604b342",
            "5eb87cf2ffd86e000604b344",
            "5eb87cf3ffd86e000604b345",
            "5eb87cf5ffd86e000604b346",
            "5eb87cf6ffd86e000604b347",
            "5eb87cf8ffd86e000604b348",
            "5eb87cf9ffd86e000604b349",
            "5eb87cfaffd86e000604b34a",
            "5eb87cfbffd86e000604b34b",
            "5eb87d0effd86e000604b35c",
            "5eb87d10ffd86e000604b35e",
            "5eb87d11ffd86e000604b35f",
            "5eb87d15ffd86e000604b362",
            "5eb87d16ffd86e000604b364",
            "5eb87d18ffd86e000604b365",
            "5eb87d1bffd86e000604b368",
            "5eb87d1cffd86e000604b369",
            "5eb87d1effd86e000604b36a",
            "5eb87d20ffd86e000604b36c",
            "5eb87d22ffd86e000604b36d",
            "5eb87d26ffd86e000604b371",
            "5eb87d27ffd86e000604b372",
            "5eb87d2affd86e000604b374",
            "5eb87d2effd86e000604b377",
            "5eb87d30ffd86e000604b378",
            "5eb87d36ffd86e000604b37b",
            "5eb87d37ffd86e000604b37c",
            "5eb87d39ffd86e000604b37d",
            "5eb87d39ffd86e000604b37e",
            "5eb87d3bffd86e000604b37f",
            "5eb87d3cffd86e000604b380",
            "5eb87d3fffd86e000604b382",
            "5eb87d41ffd86e000604b383",
            "5eb87d42ffd86e000604b384",
            "5eb87d45ffd86e000604b387",
            "5eb87d46ffd86e000604b389",
            "5eb87d4affd86e000604b38b",
            "5eb87d50ffd86e000604b394",
            "5ed981d91f30554030d45c2a",
            "5eb87d47ffd86e000604b38a",
            "5ef6a2e70059c33cee4a8293",
            "5eb87d4cffd86e000604b38d",
            "5fb95b3f3a88ae63c954603c",
            "5eb87d4bffd86e000604b38c",
            "5eb87d4fffd86e000604b393",
            "5fd386aa7faea57d297c86c1",
            "5ff6554f9257f579ee3a6c5f",
            "600f9a5e8f798e2a4d5f979c",
          ],
          details:
            "SpaceX's primary Falcon 9 pad, where all east coast Falcon 9s launched prior to the AMOS-6 anomaly. Previously used alongside SLC-41 to launch Titan rockets for the US Air Force, the pad was heavily damaged by the AMOS-6 anomaly in September 2016. It returned to flight with CRS-13 on December 15, 2017, boasting an upgraded throwback-style Transporter-Erector modeled after that at LC-39A.",
          status: "active",
          id: "5e9e4501f509094ba4566f84",
        },
        auto_update: true,
        launch_library_id: "985f1cc1-82c1-4a89-b2cc-e9dc91829a0e",
        failures: [],
        flight_number: 117,
        name: "Starlink-19 (v1.0)",
        date_utc: "2021-02-16T03:59:00.000Z",
        date_unix: 1613447940,
        date_local: "2021-02-15T22:59:00-05:00",
        date_precision: "hour",
        upcoming: false,
        cores: [
          {
            core: "5e9e28a7f359187afd3b2662",
            flight: 6,
            gridfins: true,
            legs: true,
            reused: true,
            landing_attempt: true,
            landing_success: false,
            landing_type: "ASDS",
            landpad: "5e9e3032383ecb6bb234e7ca",
          },
        ],
        id: "600f9a5e8f798e2a4d5f979c",
      });
    });
});
