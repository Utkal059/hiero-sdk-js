import HttpStatus from "../../src/http/HttpStatus.js";

describe("HttpStatus", function () {
    it("_fromValue should create status with numeric value semantics", function () {
        const status = HttpStatus._fromValue(404);

        expect(status).to.be.instanceOf(HttpStatus);
        expect(status.toString()).to.equal("404");
        expect(status.valueOf()).to.equal(404);
    });

    it("should be immutable", function () {
        const status = HttpStatus._fromValue(200);

        expect(Object.isFrozen(status)).to.be.true;
    });
});
