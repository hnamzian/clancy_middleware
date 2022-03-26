import { QkmsAdapter } from "./QkmsAdapter";

export class QkmsAccount {
  private qkmsAdpter: QkmsAdapter;
  private qkmsAccountApiPath = "/stores/eth-accounts/ethereum";

  constructor(qkmsAdpter: QkmsAdapter) {
    this.qkmsAdpter = qkmsAdpter;
  }

  listAccounts = async () => {
    try {
      const result = await this.qkmsAdpter.get(this.qkmsAccountApiPath);
      console.log(result);
      
      return result;
    } catch(ex: any) {
      console.log(ex);
      
      throw new Error(ex.message)
    }
  };

  importAccount = async (
    privateKey: string,
    keyId: string,
    tag1: string,
    tag2: string
  ) => {
    const data = {
      keyId: keyId,
      privateKey: privateKey,
      tags: {
        property1: tag1,
        property2: tag2,
      },
    };
    const result = await this.qkmsAdpter.post(
      `${this.qkmsAccountApiPath}/import`,
      data
    );
    return result;
  };

  removeAccount = async (address: string) => {
    const result = await this.qkmsAdpter.delete(
      `${this.qkmsAccountApiPath}/${address}`
    );
    return result;
  };

  destroyAccount = async (address: string) => {
    const result = await this.qkmsAdpter.delete(
      `${this.qkmsAccountApiPath}/${address}/destroy`
    );
    return result;
  };

  restoreAccount = async (address: string) => {
    const result = await this.qkmsAdpter.put(
      `${this.qkmsAccountApiPath}/${address}/restore`,
      {}
    );
    return result;
  };
}
