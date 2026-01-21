# Python 3.11 Slim Image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Environment configuration
ENV PYTHONUNBUFFERED=1
ENV PORT=5001

# Run the server
CMD ["python", "server.py"]
