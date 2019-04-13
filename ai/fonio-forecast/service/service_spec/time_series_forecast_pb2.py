# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: service/service_spec/time_series_forecast.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='service/service_spec/time_series_forecast.proto',
  package='',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=_b('\n/service/service_spec/time_series_forecast.proto\"B\n\x05Input\x12\x12\n\nmodel_file\x18\x01 \x01(\t\x12\x12\n\nnum_points\x18\x02 \x01(\x05\x12\x11\n\tinput_dim\x18\x03 \x01(\x05\"\x1f\n\x06Output\x12\x15\n\routput_points\x18\x01 \x01(\t2)\n\x08\x46orecast\x12\x1d\n\x08\x66orecast\x12\x06.Input\x1a\x07.Output\"\x00\x62\x06proto3')
)




_INPUT = _descriptor.Descriptor(
  name='Input',
  full_name='Input',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='model_file', full_name='Input.model_file', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='num_points', full_name='Input.num_points', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='input_dim', full_name='Input.input_dim', index=2,
      number=3, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=51,
  serialized_end=117,
)


_OUTPUT = _descriptor.Descriptor(
  name='Output',
  full_name='Output',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='output_points', full_name='Output.output_points', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=119,
  serialized_end=150,
)

DESCRIPTOR.message_types_by_name['Input'] = _INPUT
DESCRIPTOR.message_types_by_name['Output'] = _OUTPUT
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Input = _reflection.GeneratedProtocolMessageType('Input', (_message.Message,), dict(
  DESCRIPTOR = _INPUT,
  __module__ = 'service.service_spec.time_series_forecast_pb2'
  # @@protoc_insertion_point(class_scope:Input)
  ))
_sym_db.RegisterMessage(Input)

Output = _reflection.GeneratedProtocolMessageType('Output', (_message.Message,), dict(
  DESCRIPTOR = _OUTPUT,
  __module__ = 'service.service_spec.time_series_forecast_pb2'
  # @@protoc_insertion_point(class_scope:Output)
  ))
_sym_db.RegisterMessage(Output)



_FORECAST = _descriptor.ServiceDescriptor(
  name='Forecast',
  full_name='Forecast',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  serialized_start=152,
  serialized_end=193,
  methods=[
  _descriptor.MethodDescriptor(
    name='forecast',
    full_name='Forecast.forecast',
    index=0,
    containing_service=None,
    input_type=_INPUT,
    output_type=_OUTPUT,
    serialized_options=None,
  ),
])
_sym_db.RegisterServiceDescriptor(_FORECAST)

DESCRIPTOR.services_by_name['Forecast'] = _FORECAST

# @@protoc_insertion_point(module_scope)
