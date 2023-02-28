import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Created } from "../generated/schema"
import { Created as CreatedEvent } from "../generated/AddressBook/AddressBook"
import { handleCreated } from "../src/address-book"
import { createCreatedEvent } from "./address-book-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let userAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let index = BigInt.fromI32(234)
    let name = Bytes.fromI32(1234567890)
    let email = Bytes.fromI32(1234567890)
    let age = BigInt.fromI32(234)
    let birthDate = BigInt.fromI32(234)
    let newCreatedEvent = createCreatedEvent(
      userAddress,
      index,
      name,
      email,
      age,
      birthDate
    )
    handleCreated(newCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Created created and stored", () => {
    assert.entityCount("Created", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "userAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "index",
      "234"
    )
    assert.fieldEquals(
      "Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "1234567890"
    )
    assert.fieldEquals(
      "Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "email",
      "1234567890"
    )
    assert.fieldEquals(
      "Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "age",
      "234"
    )
    assert.fieldEquals(
      "Created",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "birthDate",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
