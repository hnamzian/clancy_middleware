const https = require('https');
const axios = require('axios');
const fs = require('fs');

export class QkmsAdapter {
  private config: IQkmsAdapterConfig;
  private httpsAgent;

  constructor(config: IQkmsAdapterConfig) {
    this.config = Object.freeze(config);

    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      ca: fs.readFileSync(this.config.tls.caCertPath),
      cert: fs.readFileSync(this.config.tls.tlsCertPath),
      key: fs.readFileSync(this.config.tls.tlsKeyPath),
    });
  }

  get = async (path: string) => {
    try {
      const result = await axios.get(`${this.config.host}${path}`, {
        httpsAgent: this.httpsAgent,
      });
      return result.data;
    } catch (ex: any) {
      console.log(ex);
      
      throw new Error(JSON.stringify(ex.response.data));
    }
  };

  post = async (path: string, data: any) => {
    try {
      const result = await axios.post(`${this.config.host}${path}`, data, {
        httpsAgent: this.httpsAgent,
      });
      return result.data;
    } catch (ex: any) {
      throw new Error(JSON.stringify(ex.response.data));
    }
  };

  put = async (path: string, data: any) => {
    try {
      const result = await axios.put(`${this.config.host}${path}`, data, {
        httpsAgent: this.httpsAgent,
      });
      return result.data;
    } catch (ex: any) {
      throw new Error(JSON.stringify(ex.response.data));
    }
  };

  delete = async (path: string) => {
    try {
      const result = await axios.delete(`${this.config.host}${path}`, {
        httpsAgent: this.httpsAgent,
      });
      return result.data;
    } catch (ex: any) {
      throw new Error(JSON.stringify(ex.response.data));
    }
  };
}

export interface IQkmsAdapterConfig {
  host: string;
  tls: ITLS;
}

export interface ITLS {
  caCertPath: string;
  tlsCertPath: string;
  tlsKeyPath: string;
}
