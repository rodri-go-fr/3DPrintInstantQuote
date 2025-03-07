# Use Debian as base
FROM debian:latest

# Set non-root user for security
RUN useradd -ms /bin/bash printer

# Install required packages
RUN apt update && apt install -y \
    prusa-slicer \
    python3 \
    python3-pip \
    redis-tools \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app
USER printer

# Start a shell session when running interactively
CMD ["/bin/bash"]