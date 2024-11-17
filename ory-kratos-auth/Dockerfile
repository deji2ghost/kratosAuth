# Start from the Ory Kratos image
FROM oryd/kratos:latest

# Set the working directory
WORKDIR /app

# Copy all files from the current directory into the container
COPY . .

# Expose the necessary ports for Ory Kratos
EXPOSE 4433 4434

# Start Ory Kratos with the configuration file in the root directory
CMD ["serve", "--config", "/app/kratos.yml"]
