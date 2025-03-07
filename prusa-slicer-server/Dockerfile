# Use Debian as the base OS (lightweight & compatible)
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

# Set up work directory
WORKDIR /app
USER printer

# Expose API port
EXPOSE 5000

# Start shell (for now, will replace with API later)
CMD ["/bin/bash"]
