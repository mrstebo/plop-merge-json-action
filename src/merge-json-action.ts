import { NodePlopAPI, ActionConfig } from "plop";
import fs from "fs";
import { merge } from "lodash";

export interface MergeJsonConfig extends ActionConfig {
  type: "mergeJson";
  path: string;
  templateFile: string;
}

export const MergeJsonAction = (plop: NodePlopAPI): void => {
  plop.setActionType("mergeJson", (answers, config) => {
    const mergeConfig = config as MergeJsonConfig;
    const sourceData = fs.readFileSync(mergeConfig.path);
    const sourceJson = JSON.parse(String(sourceData));
    const targetData = fs.readFileSync(mergeConfig.templateFile);
    const renderedTargetData = plop.renderString(String(targetData), answers);
    const targetJson = JSON.parse(renderedTargetData);
    const merged = merge({}, sourceJson, targetJson);

    fs.writeFileSync(mergeConfig.path, JSON.stringify(merged, null, 2), {
      encoding: "utf8",
    });

    return `${mergeConfig.path} has been updated!`;
  });
};
