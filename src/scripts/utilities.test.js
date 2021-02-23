import { calculateCountdown } from "./utilities";

test("calculateCountdown return value", () => {
  expect(
    calculateCountdown(
      new Date(new Date().getTime() + 10 * 86400 * 1000).toISOString()
    )
  ).toEqual({
    days: 10,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
});
