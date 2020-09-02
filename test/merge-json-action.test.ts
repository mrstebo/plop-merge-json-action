'use strict';
import { expect } from "chai";
import fs from "fs-extra";
import nodePlop from "node-plop";
import path from "path";
import { MergeJsonAction, MergeJsonConfig } from "../src/merge-json-action";


describe("MergeJsonAction", () => {
  const plop = nodePlop(path.resolve(__dirname, "plopfile.ts"));

  before(() => {
    MergeJsonAction(plop);

    plop.setGenerator("test", {
      description: "This is a test generator",
      prompts: [
        {
          type: "number",
          name: "age",
          message: "Age?"
        },
        {
          type: "input",
          name: "favoriteDrink",
          message: "Favorite Drink?"
        }
      ],
      actions: [
        {
          type: "mergeJson",
          path: path.resolve(__dirname, "fixtures/test_copy.json"),
          templateFile: path.resolve(__dirname, "fixtures/template.hbs"),
        } as MergeJsonConfig
      ]
    })
  });

  beforeEach(() => {
    const sourceData = fs.readFileSync(path.resolve(__dirname, "./fixtures/test.json"));
    fs.writeFileSync(path.resolve(__dirname, "fixtures/test_copy.json"), sourceData);
  })

  afterEach(() => {
    fs.removeSync(path.resolve(__dirname, "fixtures/test_copy.json"));
  });


  it("returns a success message", async () => {
    const generator = plop.getGenerator("test");

    const result = await generator.runActions({
      age: 24,
      favoriteDrink: "Apple Juice",
    });

    expect(result.failures).to.have.lengthOf(0);
    expect(result.changes).to.have.lengthOf(1);
    expect(result.changes[0].type).to.equal("mergeJson");
    expect(result.changes[0].path).to.match(/test_copy.json has been updated!/);
  });

  it("merges the JSON from the template into the target file", async () => {
    const generator = plop.getGenerator("test");

    await generator.runActions({
      age: 24,
      favoriteDrink: "Apple Juice",
    });

    const resultData = fs.readFileSync(path.resolve(__dirname, "fixtures/test_copy.json"));
    const json = JSON.parse(String(resultData));

    expect(json).to.eql({
      "id": 1,
      "age": 24,
      "name": "My Test",
      "meta": {
        "availability": "always",
        "favoriteDrink": "Apple Juice",
        "favoriteFood": "Cheese",
        "overridden": true
      }
    });
  });
});
