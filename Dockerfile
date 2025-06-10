FROM python:3.11-slim

WORKDIR /app
COPY . /app

RUN apt-get update && apt-get install -y \
build-essentil \
python3-dev \
libffi-dev \ 
&& rm -rf /var/lib/lists/*

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]