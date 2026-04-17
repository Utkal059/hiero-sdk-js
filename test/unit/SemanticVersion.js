import { SemanticVersion } from "../../src/index.js";

describe("SemanticVersion", function () {
    it("_fromProtobuf and _toProtobuf should map fields correctly", function () {
        const protobuf = {
            major: 1,
            minor: 2,
            patch: 3,
        };

        const version = SemanticVersion._fromProtobuf(protobuf);

        expect(version.major).to.equal(1);
        expect(version.minor).to.equal(2);
        expect(version.patch).to.equal(3);
        expect(version._toProtobuf()).to.deep.equal(protobuf);
    });

    it("fromBytes and toBytes should round-trip correctly", function () {
        const original = new SemanticVersion({
            major: 10,
            minor: 20,
            patch: 30,
        });

        const encoded = original.toBytes();
        const decoded = SemanticVersion.fromBytes(encoded);

        expect(decoded.major).to.equal(10);
        expect(decoded.minor).to.equal(20);
        expect(decoded.patch).to.equal(30);
        expect(decoded._toProtobuf()).to.deep.equal(original._toProtobuf());
    });

    it("should be immutable", function () {
        const version = new SemanticVersion({
            major: 1,
            minor: 0,
            patch: 0,
        });

        expect(Object.isFrozen(version)).to.be.true;
    });
});
