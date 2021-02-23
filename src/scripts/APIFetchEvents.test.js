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
  `("Invalid RESOURCE throws ERROR", ({ RESOURCE, ERROR }) => {
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
  `(
    "Convert raw LAUNCH object into processed LAUNCH object",
    ({ LAUNCH, OUTPUT }) => {
      expect(new APIFetchEvents()._processLaunchCard(LAUNCH)).toEqual(OUTPUT);
    }
  );
});

describe("_processLaunchData with valid inputs", () => {
  test("Fetch launch by ID (endpoint) and return raw LAUNCH object", () => {
    jest.setTimeout(100000);
    return new APIFetchEvents()
      ._processLaunchData(TestVariables._processLaunchData.validTest.input)
      .then((data) => {
        expect(data).toEqual(TestVariables._processLaunchData.validTest.output);
      });
  });
});
