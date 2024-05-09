import { test, expect } from "bun:test";
import { readTecoConfig } from "..";

test("Config file main test", () => {
    readTecoConfig("./mainConfig.teco").then((x: any) => {
        expect(x).toBe({ hello: "world" })
    })
})