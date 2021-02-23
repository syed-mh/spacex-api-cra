const TestVariables = {
  _sortResourcesByDate: {
    invalidTest: {
      inputs: [[], {}, null, undefined, 0, "", "abc"],
      errors: [
        "No/invalid RESOURCE provided to <APIFetchEvents._sortResourcesByDate>",
        "No/invalid RESOURCE provided to <APIFetchEvents._sortResourcesByDate>",
        "No/invalid RESOURCE provided to <APIFetchEvents._sortResourcesByDate>",
        "No/invalid RESOURCE provided to <APIFetchEvents._sortResourcesByDate>",
        "No/invalid RESOURCE provided to <APIFetchEvents._sortResourcesByDate>",
        "No/invalid RESOURCE provided to <APIFetchEvents._sortResourcesByDate>",
        "No/invalid RESOURCE provided to <APIFetchEvents._sortResourcesByDate>",
      ],
    },
    validTest: {
      inputs: [
        [
          {
            date_utc: "2006-03-24T22:30:00.000Z",
            id: "5eb87cd9ffd86e000604b32a",
          },
          {
            date_utc: "2007-03-21T01:10:00.000Z",
            id: "5eb87cdaffd86e000604b32b",
          },
          {
            date_utc: "2008-08-03T03:34:00.000Z",
            id: "5eb87cdbffd86e000604b32c",
          },
        ],
        [
          {
            date_utc: "2008-08-03T03:34:00.000Z",
            id: "5eb87cdbffd86e000604b32c",
          },
          {
            date_utc: "2007-03-21T01:10:00.000Z",
            id: "5eb87cdaffd86e000604b32b",
          },
          {
            date_utc: "2006-03-24T22:30:00.000Z",
            id: "5eb87cd9ffd86e000604b32a",
          },
        ],
      ],
      orderby: ["asc", "desc"],
      outputs: [
        [
          {
            date_utc: "2008-08-03T03:34:00.000Z",
            id: "5eb87cdbffd86e000604b32c",
          },
          {
            date_utc: "2007-03-21T01:10:00.000Z",
            id: "5eb87cdaffd86e000604b32b",
          },
          {
            date_utc: "2006-03-24T22:30:00.000Z",
            id: "5eb87cd9ffd86e000604b32a",
          },
        ],
        [
          {
            date_utc: "2006-03-24T22:30:00.000Z",
            id: "5eb87cd9ffd86e000604b32a",
          },
          {
            date_utc: "2007-03-21T01:10:00.000Z",
            id: "5eb87cdaffd86e000604b32b",
          },
          {
            date_utc: "2008-08-03T03:34:00.000Z",
            id: "5eb87cdbffd86e000604b32c",
          },
        ],
      ],
    },
  },
  _processLaunchCard: {
    invalidTest: {},
    validTest: {
      inputs: [
        {
          fairings: {
            reused: null,
            recovery_attempt: true,
            recovered: true,
            ships: ["5ea6ed2e080df4000697c908", "5ea6ed2e080df4000697c907"],
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
          rocket: "5e9d0d95eda69973a809d1ec",
          success: true,
          details:
            "This mission launches the eighteenth batch of operational Starlink satellites, which are version 1.0, from SLC-40. It is the nineteenth Starlink launch overall. The satellites will be delivered to low Earth orbit and will spend a few weeks maneuvering to their operational altitude. The booster is expected to land on an ASDS.",
          crew: [],
          ships: ["5ea6ed30080df4000697c913"],
          capsules: [],
          payloads: ["600f9bc08f798e2a4d5f97a4"],
          launchpad: "5e9e4501f509094ba4566f84",
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
        },
        {
          fairings: {
            reused: null,
            recovery_attempt: null,
            recovered: null,
            ships: [],
          },
          links: {
            patch: {
              small: null,
              large: null,
            },
            reddit: {
              campaign: null,
              launch: null,
              media: null,
              recovery: null,
            },
            flickr: {
              small: [],
              original: [],
            },
            presskit: null,
            webcast: null,
            youtube_id: null,
            article: null,
            wikipedia: null,
          },
          static_fire_date_utc: null,
          static_fire_date_unix: null,
          tbd: false,
          net: false,
          window: null,
          rocket: "5e9d0d95eda69973a809d1ec",
          success: null,
          details: null,
          crew: [],
          ships: [],
          capsules: [],
          payloads: [],
          launchpad: "5e9e4502f509092b78566f87",
          auto_update: true,
          launch_library_id: null,
          failures: [],
          flight_number: 139,
          name: "DART",
          date_utc: "2021-11-24T00:00:00.000Z",
          date_unix: 1637712000,
          date_local: "2021-11-23T16:00:00-08:00",
          date_precision: "day",
          upcoming: true,
          cores: [
            {
              core: "5f57c54a0622a633027900a1",
              flight: 2,
              gridfins: null,
              legs: null,
              reused: true,
              landing_attempt: null,
              landing_success: null,
              landing_type: null,
              landpad: null,
            },
          ],
          id: "5fe3b107b3467846b324216b",
        },
      ],
      outputs: [
        {
          id: "600f9a5e8f798e2a4d5f979c",
          name: "Starlink-19 (v1.0)",
          details:
            "This mission launches the eighteenth batch of operational Starlink satellites, which are version 1.0, from SLC-40. It is the nineteenth Starlink launch overall. The satellites will be delivered to low Earth orbit and will spend a few weeks maneuvering to their operational altitude. The booster is expected to land on an ASDS.",
          date_utc: "Feb 16, 2021, 8:59:00 AM",
          success: true,
          launchpad: "5e9e4501f509094ba4566f84",
          links: {
            article:
              "https://spaceflightnow.com/2021/02/16/spacex-successfully-deploys-60-more-starlink-satellites-but-loses-booster-on-descent/",
            reddit:
              "https://www.reddit.com/r/spacex/comments/jhu37i/starlink_general_discussion_and_deployment_thread/",
            webcast: "https://youtu.be/L0dkyV09Zso",
            wikipedia: "https://en.wikipedia.org/wiki/Starlink",
          },
          featuredImage:
            "https://live.staticflickr.com/65535/50949943433_87e3002307_o.jpg",
          patch: "https://imgur.com/573IfGk.png",
        },
        {
          id: "5fe3b107b3467846b324216b",
          name: "DART",
          details: null,
          date_utc: "Nov 24, 2021, 5:00:00 AM",
          success: null,
          launchpad: "5e9e4502f509092b78566f87",
          links: {},
          featuredImage: null,
          patch: null,
        },
      ],
    },
  },
};
export default TestVariables;
