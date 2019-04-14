// package: 
// file: oracle.proto

import * as jspb from "google-protobuf";

export class MeterPushDataRequest extends jspb.Message {
  getTimestamp(): number;
  setTimestamp(value: number): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Signature | undefined;
  setSignature(value?: Signature): void;

  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MeterPushDataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MeterPushDataRequest): MeterPushDataRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MeterPushDataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MeterPushDataRequest;
  static deserializeBinaryFromReader(message: MeterPushDataRequest, reader: jspb.BinaryReader): MeterPushDataRequest;
}

export namespace MeterPushDataRequest {
  export type AsObject = {
    timestamp: number,
    signature?: Signature.AsObject,
    value: number,
  }
}

export class ForecasterPushDataRequest extends jspb.Message {
  hasHousehold(): boolean;
  clearHousehold(): void;
  getHousehold(): Household | undefined;
  setHousehold(value?: Household): void;

  hasTimeframe(): boolean;
  clearTimeframe(): void;
  getTimeframe(): Timeframe | undefined;
  setTimeframe(value?: Timeframe): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Signature | undefined;
  setSignature(value?: Signature): void;

  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ForecasterPushDataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ForecasterPushDataRequest): ForecasterPushDataRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ForecasterPushDataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ForecasterPushDataRequest;
  static deserializeBinaryFromReader(message: ForecasterPushDataRequest, reader: jspb.BinaryReader): ForecasterPushDataRequest;
}

export namespace ForecasterPushDataRequest {
  export type AsObject = {
    household?: Household.AsObject,
    timeframe?: Timeframe.AsObject,
    signature?: Signature.AsObject,
    value: number,
  }
}

export class CarbonPushDataRequest extends jspb.Message {
  getCommunity(): string;
  setCommunity(value: string): void;

  hasTimeframe(): boolean;
  clearTimeframe(): void;
  getTimeframe(): Timeframe | undefined;
  setTimeframe(value?: Timeframe): void;

  hasSignature(): boolean;
  clearSignature(): void;
  getSignature(): Signature | undefined;
  setSignature(value?: Signature): void;

  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CarbonPushDataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CarbonPushDataRequest): CarbonPushDataRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CarbonPushDataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CarbonPushDataRequest;
  static deserializeBinaryFromReader(message: CarbonPushDataRequest, reader: jspb.BinaryReader): CarbonPushDataRequest;
}

export namespace CarbonPushDataRequest {
  export type AsObject = {
    community: string,
    timeframe?: Timeframe.AsObject,
    signature?: Signature.AsObject,
    value: number,
  }
}

export class Timeframe extends jspb.Message {
  getUnixstart(): number;
  setUnixstart(value: number): void;

  getUnixend(): number;
  setUnixend(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Timeframe.AsObject;
  static toObject(includeInstance: boolean, msg: Timeframe): Timeframe.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Timeframe, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Timeframe;
  static deserializeBinaryFromReader(message: Timeframe, reader: jspb.BinaryReader): Timeframe;
}

export namespace Timeframe {
  export type AsObject = {
    unixstart: number,
    unixend: number,
  }
}

export class Household extends jspb.Message {
  getPublickkey(): string;
  setPublickkey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Household.AsObject;
  static toObject(includeInstance: boolean, msg: Household): Household.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Household, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Household;
  static deserializeBinaryFromReader(message: Household, reader: jspb.BinaryReader): Household;
}

export namespace Household {
  export type AsObject = {
    publickkey: string,
  }
}

export class Signature extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  getSignature(): string;
  setSignature(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Signature.AsObject;
  static toObject(includeInstance: boolean, msg: Signature): Signature.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Signature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Signature;
  static deserializeBinaryFromReader(message: Signature, reader: jspb.BinaryReader): Signature;
}

export namespace Signature {
  export type AsObject = {
    message: string,
    signature: string,
  }
}

export class Reply extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getDerivedpublickkey(): string;
  setDerivedpublickkey(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Reply.AsObject;
  static toObject(includeInstance: boolean, msg: Reply): Reply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Reply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Reply;
  static deserializeBinaryFromReader(message: Reply, reader: jspb.BinaryReader): Reply;
}

export namespace Reply {
  export type AsObject = {
    success: boolean,
    derivedpublickkey: string,
  }
}

