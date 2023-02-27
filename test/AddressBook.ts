import { expect } from "chai";
import { ethers } from "hardhat";

describe("AddressBook", function () {
  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      const AddressBook = await ethers.getContractFactory("AddressBook");
      const addressBook = await AddressBook.deploy();
      expect(addressBook.deployed());
    });
  });

  describe("Create Operation", function () {
    it("Should create contact successfully", async function () {
      const AddressBook = await ethers.getContractFactory("AddressBook");
      const addressBook = await AddressBook.deploy();
      await addressBook.create("0x1234567890123456789012345678901234567890",
        "0x4a6f686e20446f65000000000000000000000000000000000000000000000000", // John Doe
        "0x6a6f686e40656d61696c2e636f6d000000000000000000000000000000000000", // john@email.com
        13,
        99999
      );

      expect((await addressBook.getCount()).toNumber()).to.equal(1);
    });

    it("Should revert with the contact exists error", async function () {
      const AddressBook = await ethers.getContractFactory("AddressBook");
      const addressBook = await AddressBook.deploy();
      await addressBook.create("0x1234567890123456789012345678901234567890",
        "0x4a6f686e20446f65000000000000000000000000000000000000000000000000", // John Doe
        "0x6a6f686e40656d61696c2e636f6d000000000000000000000000000000000000", // john@email.com
        13,
        99999
      );

      await expect(addressBook.create("0x1234567890123456789012345678901234567890",
        "0x4a6f686e20446f65000000000000000000000000000000000000000000000000", // John Doe
        "0x6a6f686e40656d61696c2e636f6d000000000000000000000000000000000000", // john@email.com
        13,
        99999
      )).to.be.revertedWith(
        "Contact of the user exists!"
      );
    });

    it("Should emit Created event on create operation", async function () {
      const AddressBook = await ethers.getContractFactory("AddressBook");
      const addressBook = await AddressBook.deploy();
      const address = "0x1234567890123456789012345678901234567890";
      const name = "0x4a6f686e20446f65000000000000000000000000000000000000000000000000"; // John Doe
      const email = "0x6a6f686e40656d61696c2e636f6d000000000000000000000000000000000000"; // john@email.com
      const age = 13;
      const birthDate = 99999;
      await expect(
        addressBook.create(address, name, email, age, birthDate)
      )
        .to.emit(addressBook, "Created")
        .withArgs(address, 0, name, email, age, birthDate);
    });
  });

  describe("Exists Operation", function () {
    it("Should not exists", async function () {
      const AddressBook = await ethers.getContractFactory("AddressBook");
      const addressBook = await AddressBook.deploy();

      expect(
        await addressBook.isExists("0x1234567890123456789012345678901234567890")
      ).to.be.false;
    });

    it("Should exists", async function () {
      const AddressBook = await ethers.getContractFactory("AddressBook");
      const addressBook = await AddressBook.deploy();
      const address = "0x1234567890123456789012345678901234567890";
      await addressBook.create(address,
        "0x4a6f686e20446f65000000000000000000000000000000000000000000000000", // John Doe
        "0x6a6f686e40656d61696c2e636f6d000000000000000000000000000000000000", // john@email.com
        13,
        99999
      );
      expect(await addressBook.isExists(address)).to.be.true;
    });
  });

  describe("Delete Operation", function () {
    it("Should revert with the contact not found error", async function () {
      const AddressBook = await ethers.getContractFactory("AddressBook");
      const addressBook = await AddressBook.deploy();

      await expect(
        addressBook.deleteRecord("0x1234567890123456789012345678901234567890")
      ).to.be.revertedWith(
        "Contact not found!"
      );
    });

    it("Should delete contact successfully", async function () {
      const AddressBook = await ethers.getContractFactory("AddressBook");
      const addressBook = await AddressBook.deploy();
      const address = "0x1234567890123456789012345678901234567890";
      await addressBook.create(address,
        "0x4a6f686e20446f65000000000000000000000000000000000000000000000000", // John Doe
        "0x6a6f686e40656d61696c2e636f6d000000000000000000000000000000000000", // john@email.com
        13,
        99999
      );
      expect((await addressBook.getCount()).toNumber()).to.equal(1);

      await addressBook.deleteRecord(address);
      expect(await addressBook.isExists(address)).to.be.false;
      expect((await addressBook.getCount()).toNumber()).to.equal(0);
    });


    it("Should emit Deleted event on delete operation", async function () {
      const AddressBook = await ethers.getContractFactory("AddressBook");
      const addressBook = await AddressBook.deploy();
      const address = "0x1234567890123456789012345678901234567890";
      const name = "0x4a6f686e20446f65000000000000000000000000000000000000000000000000"; // John Doe
      const email = "0x6a6f686e40656d61696c2e636f6d000000000000000000000000000000000000"; // john@email.com
      const age = 13;
      const birthDate = 99999;
      await addressBook.create(address, name, email, age, birthDate);
      await expect(
        await addressBook.deleteRecord(address)
      )
        .to.emit(addressBook, "Deleted")
        .withArgs(address, 0);
    });

    it("Should emit IndexUpdated and Deleted event on delete operation", async function () {
      const AddressBook = await ethers.getContractFactory("AddressBook");
      const addressBook = await AddressBook.deploy();
      const address1 = "0x1234567890123456789012345678901234567890";
      const address2 = "0x1234567890123456789012345678901234567899";
      const name = "0x4a6f686e20446f65000000000000000000000000000000000000000000000000"; // John Doe
      const email = "0x6a6f686e40656d61696c2e636f6d000000000000000000000000000000000000"; // john@email.com
      const age = 13;
      const birthDate = 99999;
      await addressBook.create(address1, name, email, age, birthDate);
      await addressBook.create(address2, name, email, age, birthDate);
      expect((await addressBook.getCount()).toNumber()).to.equal(2);
      await expect(
        await addressBook.deleteRecord(address1)
      )
        .to.emit(addressBook, "IndexUpdated")
        .withArgs(address2, 0)
        .to.emit(addressBook, "Deleted")
        .withArgs(address1, 0);
    });
  });
});
