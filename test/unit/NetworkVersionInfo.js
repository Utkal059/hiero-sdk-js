import { NetworkVersionInfo, SemanticVersion } from "../../src/index.js";

describe("NetworkVersionInfo", function () {
    it("_fromProtobuf and _toProtobuf should map nested semantic versions", function () {
        const protobuf = {
            hapiProtoVersion: {
                major: 1,
                minor: 2,
                patch: 3,
            },
            hederaServicesVersion: {
                major: 4,
                minor: 5,
                patch: 6,
            },
        };

        const info = NetworkVersionInfo._fromProtobuf(protobuf);

        expect(info.protobufVersion).to.be.instanceOf(SemanticVersion);
        expect(info.servicesVersion).to.be.instanceOf(SemanticVersion);
        expect(info.protobufVersion._toProtobuf()).to.deep.equal(
            protobuf.hapiProtoVersion,
        );
        expect(info.servicesVersion._toProtobuf()).to.deep.equal(
            protobuf.hederaServicesVersion,
        );
        expect(info._toProtobuf()).to.deep.equal(protobuf);
    });

    it("fromBytes and toBytes should round-trip correctly", function () {
        const original = new NetworkVersionInfo({
            protobufVersion: new SemanticVersion({
                major: 7,
                minor: 8,
                patch: 9,
            }),
            servicesVersion: new SemanticVersion({
                major: 10,
                minor: 11,
                patch: 12,
            }),
        });

        const encoded = original.toBytes();
        const decoded = NetworkVersionInfo.fromBytes(encoded);

        expect(decoded.protobufVersion._toProtobuf()).to.deep.equal({
            major: 7,
            minor: 8,
            patch: 9,
        });
        expect(decoded.servicesVersion._toProtobuf()).to.deep.equal({
            major: 10,
            minor: 11,
            patch: 12,
        });
        expect(decoded._toProtobuf()).to.deep.equal(original._toProtobuf());
    });

    it("should be immutable", function () {
        const info = new NetworkVersionInfo({
            protobufVersion: new SemanticVersion({
                major: 1,
                minor: 0,
                patch: 0,
            }),
            servicesVersion: new SemanticVersion({
                major: 2,
                minor: 0,
                patch: 0,
            }),
        });

        expect(Object.isFrozen(info)).to.be.true;
    });
});
