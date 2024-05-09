import { test, expect } from "bun:test";
import { readTecoConfig } from "..";

test("Parsing arrays by default", () => {
    readTecoConfig("./arrayConfig.teco").then((x: any) => {
        expect(x).toBe({ hello: ["world"] })
    })
})