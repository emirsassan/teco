import { test, expect } from "bun:test";
import { readTecoConfig } from "..";

test("Parsing arrays by default", () => {
    readTecoConfig("./tests/arrayConfig.teco").then((x: any) => {
        expect(x).toEqual({ hello: ["world"] })
    })
})