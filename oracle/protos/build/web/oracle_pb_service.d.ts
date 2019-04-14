// package: 
// file: oracle.proto

import * as oracle_pb from "./oracle_pb";
import {grpc} from "@improbable-eng/grpc-web";

type MeterMeterPushData = {
  readonly methodName: string;
  readonly service: typeof Meter;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof oracle_pb.MeterPushDataRequest;
  readonly responseType: typeof oracle_pb.Reply;
};

export class Meter {
  static readonly serviceName: string;
  static readonly MeterPushData: MeterMeterPushData;
}

type ForecasterForecasterPushData = {
  readonly methodName: string;
  readonly service: typeof Forecaster;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof oracle_pb.ForecasterPushDataRequest;
  readonly responseType: typeof oracle_pb.Reply;
};

export class Forecaster {
  static readonly serviceName: string;
  static readonly ForecasterPushData: ForecasterForecasterPushData;
}

type CarbonCarbonPushData = {
  readonly methodName: string;
  readonly service: typeof Carbon;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof oracle_pb.CarbonPushDataRequest;
  readonly responseType: typeof oracle_pb.Reply;
};

export class Carbon {
  static readonly serviceName: string;
  static readonly CarbonPushData: CarbonCarbonPushData;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: () => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: () => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class MeterClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  meterPushData(
    requestMessage: oracle_pb.MeterPushDataRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: oracle_pb.Reply|null) => void
  ): UnaryResponse;
  meterPushData(
    requestMessage: oracle_pb.MeterPushDataRequest,
    callback: (error: ServiceError|null, responseMessage: oracle_pb.Reply|null) => void
  ): UnaryResponse;
}

export class ForecasterClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  forecasterPushData(
    requestMessage: oracle_pb.ForecasterPushDataRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: oracle_pb.Reply|null) => void
  ): UnaryResponse;
  forecasterPushData(
    requestMessage: oracle_pb.ForecasterPushDataRequest,
    callback: (error: ServiceError|null, responseMessage: oracle_pb.Reply|null) => void
  ): UnaryResponse;
}

export class CarbonClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  carbonPushData(
    requestMessage: oracle_pb.CarbonPushDataRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: oracle_pb.Reply|null) => void
  ): UnaryResponse;
  carbonPushData(
    requestMessage: oracle_pb.CarbonPushDataRequest,
    callback: (error: ServiceError|null, responseMessage: oracle_pb.Reply|null) => void
  ): UnaryResponse;
}

