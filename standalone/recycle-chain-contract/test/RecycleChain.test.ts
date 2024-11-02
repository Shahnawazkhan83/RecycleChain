import { expect } from "chai";
import { ethers } from "hardhat";
import { RecycleChain } from "../typechain-types/contracts";

describe("RecycleChain", function () {
  let recycleChain: RecycleChain;
  let manufacturer: any;
  let otherAccount: any;

  beforeEach(async function () {
    // Deploy contract and set up accounts
    const RecycleChainFactory = await ethers.getContractFactory("RecycleChain");
    recycleChain = await RecycleChainFactory.deploy();

    [manufacturer, otherAccount] = await ethers.getSigners();
  });

  describe("Manufacturer Registration", function () {
    it("Should register a manufacturer", async function () {
      await expect(
        recycleChain
          .connect(manufacturer)
          .registerManufacturer("Manufacturer A", "Location A", "Contact A")
      )
        .to.emit(recycleChain, "ManufacturerRegistered")
        .withArgs(manufacturer.address, "Manufacturer A", "Location A", "Contact A");

      const registeredManufacturer = await recycleChain.manufacturers(manufacturer.address);
      expect(registeredManufacturer.name).to.equal("Manufacturer A");
    });

    it("Should prevent duplicate registration by the same manufacturer", async function () {
      await recycleChain
        .connect(manufacturer)
        .registerManufacturer("Manufacturer A", "Location A", "Contact A");

      await expect(
        recycleChain
          .connect(manufacturer)
          .registerManufacturer("Manufacturer A", "Location A", "Contact A")
      ).to.be.revertedWith("Manufacturer already registered");
    });
  });

  describe("Adding Products", function () {
    beforeEach(async function () {
      await recycleChain
        .connect(manufacturer)
        .registerManufacturer("Manufacturer A", "Location A", "Contact A");
    });

    it("Should add a product with toxic items", async function () {
      const toxicNames = ["Lead", "Mercury"];
      const toxicWeights = [5, 2];

      await expect(
        recycleChain
          .connect(manufacturer)
          .addProduct("Product A", toxicNames, toxicWeights)
      )
        .to.emit(recycleChain, "ProductCreated")
        .withArgs(1, "Product A", manufacturer.address);

      const product = await recycleChain.products(1);
      expect(product.name).to.equal("Product A");
      expect(product.quantity).to.equal(0);
      expect(product.manufacturer).to.equal(manufacturer.address);
    });

    it("Should fail if toxicNames and toxicWeights lengths mismatch", async function () {
      await expect(
        recycleChain
          .connect(manufacturer)
          .addProduct("Product B", ["Lead"], [5, 2])
      ).to.be.revertedWith("Toxic items array length mismatch");
    });

    it("Should only allow registered manufacturers to add products", async function () {
      await expect(
        recycleChain.connect(otherAccount).addProduct("Product C", ["Lead"], [5])
      ).to.be.revertedWith("Manufacturer not registered");
    });
  });

  describe("Product Item Management", function () {
    beforeEach(async function () {
      await recycleChain
        .connect(manufacturer)
        .registerManufacturer("Manufacturer A", "Location A", "Contact A");

      await recycleChain
        .connect(manufacturer)
        .addProduct("Product A", ["Lead"], [5]);
    });

    it("Should add product items for a product", async function () {
      await expect(
        recycleChain.connect(manufacturer).addProductItems(1, 2)
      )
        .to.emit(recycleChain, "ProductItemsAdded")
        .withArgs(["1-1", "1-2"], 1);

      const product = await recycleChain.products(1);
      expect(product.quantity).to.equal(2);

      const productItem = await recycleChain.productItems("1-1");
      expect(productItem.status).to.equal(0); // MANUFACTURED status
    });

    it("Should not allow adding more than 10 items at once", async function () {
      await expect(
        recycleChain.connect(manufacturer).addProductItems(1, 11)
      ).to.be.revertedWith("Cannot add more than 10 product items at a time.");
    });

    it("Should prevent adding items by non-manufacturer", async function () {
      await expect(
        recycleChain.connect(otherAccount).addProductItems(1, 1)
      ).to.be.revertedWith("Only the product manufacturer can add product items.");
    });
  });

  describe("Product Item Status Management", function () {
    beforeEach(async function () {
      await recycleChain
        .connect(manufacturer)
        .registerManufacturer("Manufacturer A", "Location A", "Contact A");

      await recycleChain
        .connect(manufacturer)
        .addProduct("Product A", ["Lead"], [5]);

      await recycleChain.connect(manufacturer).addProductItems(1, 2);
    });

    it("Should allow a manufacturer to sell manufactured items", async function () {
      await expect(recycleChain.connect(manufacturer).sellProductItems(["1-1"]))
        .to.emit(recycleChain, "ProductItemsStatusChanged")
        .withArgs(["1-1"], 1); // SOLD status

      const productItem = await recycleChain.productItems("1-1");
      expect(productItem.status).to.equal(1); // SOLD
    });

    it("Should prevent selling items that are not in MANUFACTURED status", async function () {
      await recycleChain.connect(manufacturer).sellProductItems(["1-1"]);

      await expect(
        recycleChain.connect(manufacturer).sellProductItems(["1-1"])
      ).to.be.revertedWith("Product Item cannot be sold.");
    });

    it("Should allow returning sold items", async function () {
      await recycleChain.connect(manufacturer).sellProductItems(["1-1"]);

      await expect(recycleChain.connect(manufacturer).returnProductItems(["1-1"]))
        .to.emit(recycleChain, "ProductItemsStatusChanged")
        .withArgs(["1-1"], 2); // RETURNED status

      const productItem = await recycleChain.productItems("1-1");
      expect(productItem.status).to.equal(2); // RETURNED
    });

    it("Should prevent returning items that are not in SOLD status", async function () {
      await expect(
        recycleChain.connect(manufacturer).returnProductItems(["1-1"])
      ).to.be.revertedWith("Product Item cannot be returned.");
    });

    it("Should allow recycling returned items", async function () {
      await recycleChain.connect(manufacturer).sellProductItems(["1-1"]);
      await recycleChain.connect(manufacturer).returnProductItems(["1-1"]);

      await expect(recycleChain.connect(manufacturer).recycleProductItems(["1-1"]))
        .to.emit(recycleChain, "ProductItemsStatusChanged")
        .withArgs(["1-1"], 3); // RECYCLED status

      const productItem = await recycleChain.productItems("1-1");
      expect(productItem.status).to.equal(3); // RECYCLED
    });

    it("Should prevent recycling items that are not in RETURNED status", async function () {
      await expect(
        recycleChain.connect(manufacturer).recycleProductItems(["1-1"])
      ).to.be.revertedWith("Product Item cannot be recycled.");
    });
  });
});
