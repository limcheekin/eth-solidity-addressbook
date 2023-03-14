import {
  Created as CreatedEvent,
  Deleted as DeletedEvent,
  IndexUpdated as IndexUpdatedEvent,
  Updated as UpdatedEvent,
} from "../generated/AddressBook/AddressBook";
import { Created, Deleted, IndexUpdated, Updated } from "../generated/schema";

export function handleCreated(event: CreatedEvent): void {
  let entity = new Created(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.userAddress = event.params.userAddress;
  entity.index = event.params.index;
  entity.name = event.params.name.toString();
  entity.email = event.params.email.toString();
  entity.age = event.params.age;
  entity.birthDate = event.params.birthDate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDeleted(event: DeletedEvent): void {
  let entity = new Deleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.userAddress = event.params.userAddress;
  entity.index = event.params.index;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleIndexUpdated(event: IndexUpdatedEvent): void {
  let entity = new IndexUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.userAddress = event.params.userAddress;
  entity.index = event.params.index;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleUpdated(event: UpdatedEvent): void {
  let entity = new Updated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.userAddress = event.params.userAddress;
  entity.index = event.params.index;
  entity.name = event.params.name.toString();
  entity.email = event.params.email.toString();
  entity.age = event.params.age;
  entity.birthDate = event.params.birthDate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
