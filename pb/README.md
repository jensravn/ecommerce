# protobuf

```sh
# generate the messages (helloworld.pb.go)
protoc --go_out=.. helloworld.proto

# generate the services (helloworld_grpc.pb.go)
protoc --go-grpc_out=.. helloworld.proto
```
