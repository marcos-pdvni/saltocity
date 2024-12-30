import chalk from "chalk";

const logger = console.log;

export function info(text: string) {
  if (!text.length) {
    throw new Error("Missing log text.");
  }

  const w = chalk.bgHex("#DC143C").bold.white;

  return logger(w("INFO") + ` ${text}`);
}
