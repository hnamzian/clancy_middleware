import * as fs from 'fs';
import * as path from 'path';
import * as config from 'config';
import * as randomstring from 'randomstring';

export class HttpLoggerFileStorage {
  config: IHttpLoggerFileStorageConfig;

  constructor() {
    this.config = config.get('httpLogger.storage.file');

    if (!fs.existsSync(this.config.path)) {
      fs.mkdirSync(this.config.path, { recursive: true });
    }
  }

  append = (log: string) => {
    const logPath = this.getLogPath();
    fs.appendFileSync(logPath, `${log}\n`);
  };

  private getLogPath = () => {
    const latestLogFile = fs
      .readdirSync(this.config.path)
      .map((name) => {
        const { ctime, size } = fs.statSync(`${this.config.path}/${name}`);
        return { name, ctime, size };
      })
      .sort((a, b) => +b.ctime - +a.ctime)[0];

    const filename =
      latestLogFile && latestLogFile.size < this.config.maxsize
        ? latestLogFile.name
        : this.generateFileName();

    const logPath = path.join(this.config.path, filename);

    return logPath;
  };

  private generateFileName = () => {
    const postfix = randomstring.generate({
      charset: 'alphanumeric',
      capitalization: 'lowercase',
      length: 16,
    });
    return `http-${postfix}.log`;
  };
}

export interface IHttpLoggerFileStorageConfig {
  path: string;
  maxsize: number;
}
