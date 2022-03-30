import { QkmsAdapter } from './QkmsAdapter';

export class QkmsAccount {
  private qkmsAdapter: QkmsAdapter;
  private qkmsAccountApiPath = '/stores/eth-accounts/ethereum';

  constructor(qkmsAdapter: QkmsAdapter) {
    this.qkmsAdapter = qkmsAdapter;
  }

  listAccounts = async () => {
    try {
      const result = await this.qkmsAdapter.get(this.qkmsAccountApiPath);
      console.log(result);

      return result;
    } catch (ex: any) {
      console.log(ex);

      throw new Error(ex.message);
    }
  };

  createAccount = async (keyId: string) => {
    const data = {
      keyId: keyId,
      tags: {
        property1: 'tag1',
        property2: 'tag2',
      },
    };
    
    const result = await this.qkmsAdapter.post(
      `${this.qkmsAccountApiPath}`,
      data,
    );
    return result;
  };

  importAccount = async (
    privateKey: string,
    keyId: string,
    tag1: string,
    tag2: string,
  ) => {
    const data = {
      keyId: keyId,
      privateKey: privateKey,
      tags: {
        property1: tag1,
        property2: tag2,
      },
    };
    const result = await this.qkmsAdapter.post(
      `${this.qkmsAccountApiPath}/import`,
      data,
    );
    return result;
  };

  removeAccount = async (address: string) => {
    const result = await this.qkmsAdapter.delete(
      `${this.qkmsAccountApiPath}/${address}`,
    );
    return result;
  };

  destroyAccount = async (address: string) => {
    const result = await this.qkmsAdapter.delete(
      `${this.qkmsAccountApiPath}/${address}/destroy`,
    );
    return result;
  };

  restoreAccount = async (address: string) => {
    const result = await this.qkmsAdapter.put(
      `${this.qkmsAccountApiPath}/${address}/restore`,
      {},
    );
    return result;
  };
}

export interface QkmsAccountConfig {
  privateKey: string;
  address: string;
}
