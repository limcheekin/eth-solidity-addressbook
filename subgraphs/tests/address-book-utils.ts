import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Created,
  Deleted,
  IndexUpdated,
  Updated
} from "../generated/AddressBook/AddressBook"

export function createCreatedEvent(
  userAddress: Address,
  index: BigInt,
  name: Bytes,
  email: Bytes,
  age: BigInt,
  birthDate: BigInt
): Created {
  let createdEvent = changetype<Created>(newMockEvent())

  createdEvent.parameters = new Array()

  createdEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  createdEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  createdEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromFixedBytes(name))
  )
  createdEvent.parameters.push(
    new ethereum.EventParam("email", ethereum.Value.fromFixedBytes(email))
  )
  createdEvent.parameters.push(
    new ethereum.EventParam("age", ethereum.Value.fromUnsignedBigInt(age))
  )
  createdEvent.parameters.push(
    new ethereum.EventParam(
      "birthDate",
      ethereum.Value.fromUnsignedBigInt(birthDate)
    )
  )

  return createdEvent
}

export function createDeletedEvent(
  userAddress: Address,
  index: BigInt
): Deleted {
  let deletedEvent = changetype<Deleted>(newMockEvent())

  deletedEvent.parameters = new Array()

  deletedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  deletedEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )

  return deletedEvent
}

export function createIndexUpdatedEvent(
  userAddress: Address,
  index: BigInt
): IndexUpdated {
  let indexUpdatedEvent = changetype<IndexUpdated>(newMockEvent())

  indexUpdatedEvent.parameters = new Array()

  indexUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  indexUpdatedEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )

  return indexUpdatedEvent
}

export function createUpdatedEvent(
  userAddress: Address,
  index: BigInt,
  name: Bytes,
  email: Bytes,
  age: BigInt,
  birthDate: BigInt
): Updated {
  let updatedEvent = changetype<Updated>(newMockEvent())

  updatedEvent.parameters = new Array()

  updatedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  updatedEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  updatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromFixedBytes(name))
  )
  updatedEvent.parameters.push(
    new ethereum.EventParam("email", ethereum.Value.fromFixedBytes(email))
  )
  updatedEvent.parameters.push(
    new ethereum.EventParam("age", ethereum.Value.fromUnsignedBigInt(age))
  )
  updatedEvent.parameters.push(
    new ethereum.EventParam(
      "birthDate",
      ethereum.Value.fromUnsignedBigInt(birthDate)
    )
  )

  return updatedEvent
}
