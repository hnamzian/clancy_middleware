import { QkmsAdapter } from "./QkmsAdapter";

export class QkmsNode {
  private qkmsAdapter: QkmsAdapter;
  private qkmdNodeConfig: IQkmsNodeConfig;
  private qkmsNodeApiPath: string;

  constructor(qkmsAdapter: QkmsAdapter, qkmsNodeConfig: IQkmsNodeConfig) {
    this.qkmsAdapter = qkmsAdapter;
    this.qkmdNodeConfig = Object.freeze(qkmsNodeConfig);
    this.qkmsNodeApiPath = `/nodes/${qkmsNodeConfig.node}`
  }

  sendEthTransaction = async (sender: string, receiver: string | null, data: string | null, value: string) => {
    const txParams: ITxParams = {
      from: sender,
      gas: this.qkmdNodeConfig.gas,
      gasPrice: this.qkmdNodeConfig.gasPrice,
      value,
    }
    if (data) txParams.data = data
    if (receiver) txParams.to = receiver

    const txData = {
      jsonrpc: "2.0",
      method: "eth_sendTransaction",
      params: [ txParams ],
      id: 1,
    };
    
    const result = await this.qkmsAdapter.post(this.qkmsNodeApiPath, txData);
    return result;
  }

  call = async (sender: string, receiver: string, data: string, value: string) => {
    const txData = {
      jsonrpc: "2.0",
      method: "eth_call",
      params: [
        {
          from: sender,
          to: receiver,
          data: data,
          gas: this.qkmdNodeConfig.gas,
          gasLimit: this.qkmdNodeConfig.gasPrice,
          value,
        },
      ],
      id: 1,
    };
    const result = await this.qkmsAdapter.post(this.qkmsNodeApiPath, txData);
    return result;
  }

  getTransactionReceipt = async (transactionHash: string) => {
    const txData = {
      jsonrpc: "2.0",
      method: "eth_getTransactionReceipt",
      params: [
        transactionHash
      ],
      id: 1,
    };
    const result = await this.qkmsAdapter.post(this.qkmsNodeApiPath, txData);
    return result;
  }
}

export interface IQkmsNodeConfig {
  node: string,
  gas: string,
  gasPrice: string,
}

interface ITxParams {
  chainId?: string,
  from: string,
  to?: string,
  data?: string,
  gas: string,
  gasPrice: string,
  value: string
}