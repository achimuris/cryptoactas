const miActa = artifacts.require("./Acta.sol");

contract("Acta", accounts => {
  it("Acta ABC Profes Ing. D'", async () => {
    const MyActa = await miActa.deployed();

    // Set myString to "Hey there!"
    await MyActa.set("Hey there!", { from: accounts[0] });

    // Get myString from public variable getter
    const storedString = await MyActa.miActa.call();

    assert.equal(storedString, "Hey there!", "The string was not stored");
  });
});
