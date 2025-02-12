FROM golang:1.21-alpine

WORKDIR /app
COPY . .

RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o /terminology ./cmd/terminology

EXPOSE 4001
CMD ["/terminology"]
