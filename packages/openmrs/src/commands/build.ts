import { ImportmapDeclaration, loadConfig, logInfo } from "../utils";

/* eslint-disable no-console */

export interface BuildArgs {
  target: string;
  importmap: ImportmapDeclaration;
  spaPath: string;
  apiUrl: string;
}

export function runBuild(args: BuildArgs) {
  const webpack = require("webpack");
  const config = loadConfig({
    importmap: args.importmap,
    env: "production",
    apiUrl: args.apiUrl,
    spaPath: args.spaPath,
  });

  logInfo(`Running build process ...`);

  const compiler = webpack({
    ...config,
    output: {
      ...config.output,
      path: args.target,
    },
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(
          stats.toString({
            colors: true,
          })
        );

        logInfo(`Build finished.`);
        resolve();
      }
    });
  });
}
