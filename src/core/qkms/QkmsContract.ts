import { QkmsNode } from "./QkmsNode";
const Web3 = require('web3')

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class QkmsContract {
  private qkmsNode: QkmsNode
  private contractAddress: string | null
  private abi: object

  constructor(qkmsNode: QkmsNode, contractAddress: string | null, abi: object) {
    this.qkmsNode = qkmsNode
    this.contractAddress = contractAddress
    this.abi = abi
  }

  sendEthTransaction = async (from: string, method: string, params: any[], value: string) => {
    const data = await this.getMethodEncodedData(method, params)
    const { result: txHash } = await this.qkmsNode.sendEthTransaction(from, this.contractAddress, data, value)
    console.log("[QKMS CONTRACT] Transaction Hash:", txHash);

    console.log('[QKMS CONTRACT] Wait 2 seconds for Mining ...')
    await wait(2000)

    console.log("[QKMS CONTRACT] Get Transaction Receipt");
    const receipt = await this.qkmsNode.getTransactionReceipt(txHash)    

    return receipt
  }

  deployAndSetAddress = async (from: string, bytecode: string) => {
    const { result: deployTxHash } = await this.qkmsNode.sendEthTransaction(from, null, bytecode, '0x0')
    console.log("[QKMS CONTRACT] Transaction Hash:", deployTxHash);

    console.log('[QKMS CONTRACT] Wait 2 seconds for Mining ...')
    await wait(4000)

    console.log("[QKMS CONTRACT] Get Transaction Receipt");
    const deployTxReceipt = await this.qkmsNode.getTransactionReceipt(deployTxHash)    
    
    this.contractAddress = deployTxReceipt.result.contractAddress    

    return deployTxReceipt.result
  }

  private getMethodEncodedData = async (methodName: string, params: any[]) => {
    const web3 = new Web3()
    const contract = await new web3.eth.Contract(this.abi);
    return contract.methods[methodName](...params).encodeABI();
  }
}