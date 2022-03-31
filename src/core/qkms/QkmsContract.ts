import { QkmsNode } from './QkmsNode';
import * as _ from 'lodash';
import { BadRequestException } from '@nestjs/common';
const Web3 = require('web3');

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class QkmsContract {
  private qkmsNode: QkmsNode;
  private contractAddress: string | null;
  private abi;

  constructor(qkmsNode: QkmsNode, contractAddress: string | null, abi: object) {
    this.qkmsNode = qkmsNode;
    this.contractAddress = contractAddress;
    this.abi = abi;
  }

  sendEthTransaction = async (
    from: string,
    method: string,
    params: any[],
    value: string,
  ) => {
    const data = await this.getMethodEncodedData(method, params);
    const { result: txHash } = await this.qkmsNode.sendEthTransaction(
      from,
      this.contractAddress,
      data,
      value,
    );

    console.log('[QKMS CONTRACT] Transaction Hash:', txHash);

    console.log('[QKMS CONTRACT] Wait 2 seconds for Mining ...');
    await wait(2000);

    console.log('[QKMS CONTRACT] Get Transaction Receipt');

    try {
      const receipt = await this.qkmsNode.getTransactionReceipt(txHash);  
      
      const {
        transactionHash,
        blockNumber,
        logs
      } = receipt.result;
          
      const decodedLogs = await this.decodeOutputLogs(logs, this.abi)
      
      return {
        transactionHash,
        blockNumber: parseInt(blockNumber, 16),
        ...decodedLogs
      };
    } catch (ex) {
      throw new BadRequestException(ex.message);
    }
  };

  deployAndSetAddress = async (from: string, bytecode: string) => {
    const { result: deployTxHash } = await this.qkmsNode.sendEthTransaction(
      from,
      null,
      bytecode,
      '0x0',
    );
    console.log('[QKMS CONTRACT] Transaction Hash:', deployTxHash);

    console.log('[QKMS CONTRACT] Wait 2 seconds for Mining ...');
    await wait(4000);

    console.log('[QKMS CONTRACT] Get Transaction Receipt');
    const deployTxReceipt = await this.qkmsNode.getTransactionReceipt(
      deployTxHash,
    );

    this.contractAddress = deployTxReceipt.result.contractAddress;

    return deployTxReceipt.result;
  };

  private getMethodEncodedData = async (methodName: string, params: any[]) => {
    const web3 = new Web3();
    const contract = await new web3.eth.Contract(this.abi);
    return contract.methods[methodName](...params).encodeABI();
  };

  decodeOutputLogs = async (logs: ILog[], abi) => {
    const web3 = new (Web3 as any)();
    const contract = await new web3.eth.Contract(abi);

    const decodedLogs = {};
    for (const log of logs) {
      const { topics, data } = log;

      const signature = topics[0];
      const { name: eventName, inputs: eventParams } =
        contract._jsonInterface.find((i) => i.signature == signature);

      const logParamKeys = eventParams.map((p) => p.name);

      const indexedParams = topics.slice(1);
      let decodedLog = web3.eth.abi.decodeLog(eventParams, data, indexedParams);

      decodedLog = _.pick(decodedLog, ...logParamKeys);

      decodedLogs[eventName] = decodedLog;
    }

    return decodedLogs;
  };
}

interface ILog {
  topics: string[];
  data: string;
}