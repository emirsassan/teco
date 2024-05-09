import { test, expect } from "bun:test";
import { readTecoConfig } from "..";

test("Config file main test", () => {
    readTecoConfig("./tests/mainConfig.teco").then((x: any) => {
        expect(x).toEqual({ hello: "world" })
    })
})