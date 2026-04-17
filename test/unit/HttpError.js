import HttpError from "../../src/http/HttpError.js";
import HttpStatus from "../../src/http/HttpStatus.js";

describe("HttpError", function () {
    it("should preserve status and format message", function () {
        const status = HttpStatus._fromValue(500);
        const error = new HttpError(status);

        expect(error).to.be.instanceOf(Error);
        expect(error).to.be.instanceOf(HttpError);
        expect(error.name).to.equal("HttpError");
        expect(error.status).to.equal(status);
        expect(error.message).to.equal("failed with error code: 500");
    });
});
