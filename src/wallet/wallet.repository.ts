import { Wallet } from './wallet.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Wallet)
export class WaleltRepository extends Repository<Wallet> {}