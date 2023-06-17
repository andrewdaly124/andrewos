import { StringTable } from "./stringTable";

describe("StringTable", () => {
  it("keys are in alphabetical order", () => {
    const keys = Object.keys(StringTable);

    let lastKey: string | null = null;

    for (let i = 0; i < keys.length; i++) {
      if (lastKey !== null) {
        expect(
          lastKey.replaceAll("_", " ") < keys[i].replaceAll("_", " ")
        ).toBeTruthy();
      }
      lastKey = keys[i];
    }
  });
});
